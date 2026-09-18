"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { getAccessToken } from "@/redux/baseApi";
import { useGetMyProfileQuery } from "@/redux/apis/profile";
import { getTranslation } from "@/utils/translations";
import {
  useGetMyChatsQuery,
  useGetChatMembersQuery,
  useGetChatMessagesQuery,
  useDeleteChatMessageMutation,
  type ChatItem,
  type ChatMessage,
  type ChatAttachment,
} from "@/redux/apis/chat";
import {
  getChatSocket,
  joinChatGroup,
  leaveChatGroup,
  sendGroupMessage,
  deleteGroupMessage,
  sendTypingIndicator,
  sendStopTypingIndicator,
} from "@/lib/socket/chatSocket";
import { ChatMembersPanel } from "@/components/chat/ChatMembersPanel";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatMessageInput } from "@/components/chat/ChatMessageInput";
import { DeleteMessageModal } from "@/components/chat/DeleteMessageModal";
import { uploadConversationFiles, deleteUploadedFiles } from "@/services/actions/files";

function decodeUserIdFromToken(): string {
  const token = getAccessToken();
  if (!token) return "";
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return "";
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.id || decoded.userId || "";
  } catch {
    return "";
  }
}

export default function ChatPage() {
  const { locale = "en" } = useParams<{ locale: string }>();
  const t = getTranslation(locale);
  const user = useAppSelector((state) => state.auth.user);
  const { data: profileRes } = useGetMyProfileQuery();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [sending, setSending] = useState(false);
  const [onlineProfileIds, setOnlineProfileIds] = useState<Set<string>>(new Set());

  const [deletingMsg, setDeletingMsg] = useState<ChatMessage | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const selectedIdRef = useRef<string | null>(selectedId);
  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentUserId = useMemo(() => {
    const fromToken = decodeUserIdFromToken();
    if (fromToken) return fromToken;
    const profile: any = profileRes?.data;
    if (profile?.user?._id) return String(profile.user._id);
    if (typeof profile?.user === "string") return profile.user;
    if ((user as any)?.id) return String((user as any).id);
    return "";
  }, [profileRes, user]);

  const typingDisplayName = useMemo(() => {
    const profile: any = profileRes?.data;
    return (
      profile?.company_name ||
      profile?.name ||
      user?.company ||
      user?.name ||
      "Client"
    );
  }, [profileRes, user]);

  const {
    data: chatsData,
    isLoading: loadingChats,
    refetch: refetchChats,
  } = useGetMyChatsQuery(undefined, {
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  });

  const rawChats: ChatItem[] = useMemo(() => chatsData?.result ?? [], [chatsData]);

  useEffect(() => {
    if (!selectedId && rawChats.length > 0) {
      setSelectedId(rawChats[0]._id);
    }
  }, [rawChats, selectedId]);

  const selectedChat = useMemo(
    () => rawChats.find((c: ChatItem) => c._id === selectedId) || null,
    [rawChats, selectedId]
  );

  const { data: messagesData, isFetching: loadingMessages } = useGetChatMessagesQuery(
    { chatId: selectedId! },
    {
      skip: !selectedId,
      refetchOnMountOrArgChange: true,
    }
  );

  const initialMessages: ChatMessage[] = useMemo(
    () => messagesData?.result ?? [],
    [messagesData]
  );

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
      return;
    }
    if (!loadingMessages) {
      setMessages((prev) => (prev.length === 0 ? prev : []));
    }
  }, [initialMessages, loadingMessages, selectedId]);

  const { data: chatMembers } = useGetChatMembersQuery(selectedId!, { skip: !selectedId });

  const senderNames = useMemo(() => {
    const map = new Map<string, string>();
    const remember = (name: string, ...ids: Array<string | undefined>) => {
      for (const id of ids) if (id) map.set(id, name);
    };

    const client = chatMembers?.client ?? selectedChat?.client;
    if (client) {
      remember(
        client.user?.full_name || client.name || client.company_name || "Client",
        client._id,
        client.user?._id
      );
    }

    for (const worker of chatMembers?.workers ?? selectedChat?.workers ?? []) {
      if (!worker) continue;
      remember(worker.user?.full_name || worker.name || "Worker", worker._id, worker.user?._id);
    }
    return map;
  }, [chatMembers, selectedChat]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => (prev.some((m) => m._id === message._id) ? prev : [...prev, message]));
  }, []);

  useEffect(() => {
    let activeSocket: Socket | null = null;

    void getChatSocket().then((sock) => {
      if (!sock) return;
      activeSocket = sock;
      socketRef.current = sock;

      sock.on("onlineUser", (payload: { onlineUsers?: string[] } | string[]) => {
        const users = Array.isArray(payload) ? payload : payload?.onlineUsers || [];
        setOnlineProfileIds(new Set(users));
      });

      if (selectedIdRef.current) {
        joinChatGroup(sock, selectedIdRef.current);
      }

      sock.on("group:new-message", (newMsg: ChatMessage) => {
        const chatId =
          typeof newMsg.chat === "object" ? (newMsg.chat as { _id: string })._id : newMsg.chat;
        if (chatId === selectedIdRef.current) {
          appendMessage(newMsg);
        }
        void refetchChats();
      });

      sock.on("message:new", (newMsg: ChatMessage) => {
        const chatId =
          typeof newMsg.chat === "object" ? (newMsg.chat as { _id: string })._id : newMsg.chat;
        if (chatId === selectedIdRef.current) {
          appendMessage(newMsg);
        }
        void refetchChats();
      });

      sock.on("group:message-deleted", (payload: { _id: string; chat: string }) => {
        if (payload.chat === selectedIdRef.current) {
          setMessages((prev) =>
            prev.map((m) => (m._id === payload._id ? { ...m, is_deleted: true } : m))
          );
        }
      });

      sock.on("group:typing", (payload: { groupId: string; userId: string; name?: string }) => {
        if (payload.groupId === selectedIdRef.current && payload.userId !== currentUserId) {
          setTypingUser(payload.name || "Someone");
        }
      });

      sock.on("group:stop-typing", (payload: { groupId: string; userId: string }) => {
        if (payload.groupId === selectedIdRef.current) {
          setTypingUser("");
        }
      });

      sock.on("group:renamed", () => {
        void refetchChats();
      });

      sock.on("worker-chat:created", () => {
        void refetchChats();
      });
      sock.on("client-chat:created", () => {
        void refetchChats();
      });
    });

    return () => {
      if (activeSocket && selectedIdRef.current) {
        leaveChatGroup(activeSocket, selectedIdRef.current);
      }
      if (activeSocket) {
        activeSocket.off("onlineUser");
        activeSocket.off("group:new-message");
        activeSocket.off("message:new");
        activeSocket.off("group:message-deleted");
        activeSocket.off("group:typing");
        activeSocket.off("group:stop-typing");
        activeSocket.off("group:renamed");
        activeSocket.off("worker-chat:created");
        activeSocket.off("client-chat:created");
      }
    };
  }, [currentUserId, refetchChats, appendMessage]);

  const selectChat = (chat: ChatItem) => {
    if (selectedId === chat._id) return;
    if (socketRef.current && selectedId) {
      leaveChatGroup(socketRef.current, selectedId);
    }
    setSelectedId(chat._id);
    setTypingUser("");
    if (socketRef.current) {
      joinChatGroup(socketRef.current, chat._id);
      socketRef.current.emit("seen", { chatId: chat._id });
    }
  };

  const handleSelectChat = (chat: ChatItem) => {
    setMobileThreadOpen(true);
    selectChat(chat);
  };

  const handleMobileBack = () => {
    setMobileThreadOpen(false);
  };

  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rawChats;
    return rawChats.filter((chat: ChatItem) => {
      const displayName = (chat.display_name || chat.name || "").toLowerCase();
      const lastMsg = (chat.last_message?.text || "").toLowerCase();
      return displayName.includes(q) || lastMsg.includes(q);
    });
  }, [rawChats, query]);

  const handleInputChange = (text: string) => {
    setInputText(text);
    if (!socketRef.current || !selectedId) return;

    sendTypingIndicator(socketRef.current, selectedId, typingDisplayName);

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      if (socketRef.current && selectedId) {
        sendStopTypingIndicator(socketRef.current, selectedId);
      }
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || !selectedId || sending) return;

    setInputText("");
    setSending(true);

    if (socketRef.current) {
      sendStopTypingIndicator(socketRef.current, selectedId);
    }

    try {
      const response = await sendGroupMessage(socketRef.current, {
        groupId: selectedId,
        text: textToSend,
      });

      if (response.success && response.data) {
        appendMessage(response.data);
        void refetchChats();
      } else {
        console.warn("Error sending message:", response.message);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleAttachFile = async (file?: File) => {
    if (!file || !selectedId || sending) return;

    const isImg = file.type.startsWith("image/");
    const isPdf = file.type.includes("pdf");
    const formData = new FormData();
    if (isPdf) {
      formData.append("conversation_pdf", file);
    } else {
      formData.append("conversation_image", file);
    }

    setSending(true);
    try {
      const uploadRes = await uploadConversationFiles(formData);
      if (!uploadRes.success) {
        console.error("Failed to upload conversation file:", uploadRes.error);
        return;
      }

      const uploadedUrl = isPdf
        ? uploadRes.data.pdfs[0] || uploadRes.data.images[0]
        : uploadRes.data.images[0] || uploadRes.data.pdfs[0];

      if (!uploadedUrl) {
        console.error("No URL returned from file upload");
        return;
      }

      const attType: "image" | "pdf" | "file" = isImg ? "image" : isPdf ? "pdf" : "file";
      const attachment: ChatAttachment = { url: uploadedUrl, type: attType };

      const response = await sendGroupMessage(socketRef.current, {
        groupId: selectedId,
        text: `Sent an attachment: ${file.name}`,
        attachments: [attachment],
      });
      if (response.success && response.data) {
        appendMessage(response.data);
        void refetchChats();
      }
    } catch (err) {
      console.error("Error attaching file:", err);
    } finally {
      setSending(false);
    }
  };

  const [deleteChatMsgMutation] = useDeleteChatMessageMutation();

  const handleConfirmDelete = async () => {
    if (!deletingMsg) return;
    setActionLoading(true);
    try {
      if (socketRef.current && socketRef.current.connected) {
        await deleteGroupMessage(socketRef.current, deletingMsg._id);
      } else {
        await deleteChatMsgMutation(deletingMsg._id).unwrap();
      }
      setMessages((prev) =>
        prev.map((m) => (m._id === deletingMsg._id ? { ...m, is_deleted: true } : m))
      );

      if (deletingMsg.attachments && deletingMsg.attachments.length > 0) {
        const urls = deletingMsg.attachments.map((a) => a.url).filter(Boolean);
        if (urls.length > 0) {
          void deleteUploadedFiles(urls).catch(() => {});
        }
      }

      setDeletingMsg(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const isChatOnline = useCallback(
    (chat: ChatItem) => {
      if (chat.type === "worker") {
        return Boolean(chat.workers?.[0]?._id && onlineProfileIds.has(chat.workers[0]._id));
      }
      if (chat.type === "client") {
        return Boolean(chat.client?._id && onlineProfileIds.has(chat.client._id));
      }
      return (
        Boolean(chat.client?._id && onlineProfileIds.has(chat.client._id)) ||
        (chat.workers ?? []).some((w) => onlineProfileIds.has(w._id))
      );
    },
    [onlineProfileIds]
  );

  return (
    <div className="flex h-[calc(100dvh-6.5rem)] min-h-0 flex-col gap-3 sm:min-h-[580px]">
      <header className={mobileThreadOpen ? "hidden lg:block" : "block"}>
        <h1 className="text-lg font-bold text-slate-900">{t.chat.pageTitle}</h1>
        <p className="text-xs text-slate-500">{t.chat.subtitle}</p>
      </header>

      <div className="grid min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)_270px]">
        
        <div
          className={`min-h-0 h-full flex-col ${
            mobileThreadOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          <ChatSidebar
            query={query}
            chats={filteredChats}
            selectedId={selectedId}
            loading={loadingChats}
            onQueryChange={setQuery}
            onSelectChat={handleSelectChat}
            isChatOnline={isChatOnline}
          />
        </div>

        
        <section
          className={`min-h-0 h-full flex-col bg-white ${
            mobileThreadOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          {selectedChat ? (
            <>
              <ChatHeader
                chat={selectedChat}
                isOnline={isChatOnline(selectedChat)}
                onBack={handleMobileBack}
              />

              <ChatMessageList
                messages={messages}
                loading={loadingMessages}
                currentUserId={currentUserId}
                authUserId={(user as any)?.id}
                typingUser={typingUser}
                senderNames={senderNames}
                onRequestDeleteMessage={setDeletingMsg}
              />

              <ChatMessageInput
                placeholder={`Message ${selectedChat.display_name || selectedChat.name || ""}...`}
                inputText={inputText}
                sending={sending}
                onInputChange={handleInputChange}
                onSendMessage={handleSendMessage}
                onAttachFile={handleAttachFile}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-400 px-4 text-center">
              Select a conversation from the list to start messaging.
            </div>
          )}
        </section>

        {selectedChat && (
          <aside className="hidden min-h-0 overflow-y-auto border-l border-slate-200/90 bg-white xl:block">
            <ChatMembersPanel chat={selectedChat} onlineProfileIds={onlineProfileIds} />
          </aside>
        )}
      </div>

      {deletingMsg && (
        <DeleteMessageModal
          loading={actionLoading}
          onClose={() => setDeletingMsg(null)}
          onConfirm={() => void handleConfirmDelete()}
        />
      )}
    </div>
  );
}
