import { baseApi } from "../baseApi";
import type { ApiResponse } from "@/types/api";

export type ChatType = "group" | "direct" | "worker" | "client";

export type ChatAttachment = {
  url: string;
  type: "image" | "video" | "pdf" | "file";
};

export type ChatSender = {
  _id: string;
  full_name: string;
  profile_photo?: string | null;
  email?: string;
};

export type ChatMessage = {
  _id: string;
  chat: string | { _id: string };
  sender: string | ChatSender;
  sender_role: "client" | "worker" | "manager";
  text?: string;
  attachments?: ChatAttachment[];
  seen?: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
};

export type ChatItem = {
  _id: string;
  type: ChatType;
  cleaning_plan?: string | null;
  name?: string | null;
  display_name?: string | null;
  client?: {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
    company_name?: string;
    primary_contact_name?: string;
    user?: {
      _id?: string;
      full_name?: string;
      profile_photo?: string | null;
    };
  } | null;
  workers?: Array<{
    _id: string;
    name?: string;
    worker_type?: string;
    email?: string;
    phone?: string;
    user?: {
      _id?: string;
      full_name?: string;
      profile_photo?: string | null;
    };
  }>;
  participant_key?: string | null;
  last_message?: {
    _id?: string;
    text?: string;
    sender?: {
      full_name?: string;
      profile_photo?: string | null;
      email?: string;
    };
    createdAt?: string;
  } | null;
  last_message_at?: string | null;
  is_active?: boolean;
  unread_count?: number;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
};

export type ChatMembersResponse = {
  client?: ChatItem["client"];
  workers?: ChatItem["workers"];
  managers?: "all" | string;
  display_name?: string | null;
};

export type MyChatsResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    unreadCount?: number;
  };
  result: ChatItem[];
};

export type ChatMessagesResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  result: ChatMessage[];
};

function unwrapData<T>(response: ApiResponse<T> | T): T {
  if (response && typeof response === "object" && "data" in response && "success" in response) {
    return (response as ApiResponse<T>).data;
  }
  return response as T;
}

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyChats: builder.query<MyChatsResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        const query = new URLSearchParams({
          page: String(params?.page ?? 1),
          limit: String(params?.limit ?? 50),
        });
        return `/chat/my-chats?${query.toString()}`;
      },
      transformResponse: (response: ApiResponse<MyChatsResponse> | MyChatsResponse) =>
        unwrapData(response),
      providesTags: (result) => [
        { type: "Chat" as const, id: "LIST" },
        ...(result?.result ?? []).map((c) => ({ type: "Chat" as const, id: c._id })),
      ],
    }),

    getChatMembers: builder.query<ChatMembersResponse, string>({
      query: (id) => `/chat/${encodeURIComponent(id)}/members`,
      transformResponse: (response: ApiResponse<ChatMembersResponse> | ChatMembersResponse) =>
        unwrapData(response),
      providesTags: (_result, _error, id) => [{ type: "Chat" as const, id: `members-${id}` }],
    }),

    getChatMessages: builder.query<
      ChatMessagesResponse,
      { chatId: string; page?: number; limit?: number }
    >({
      query: ({ chatId, page = 1, limit = 50 }) =>
        `/chat-message/${encodeURIComponent(chatId)}?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<ChatMessagesResponse> | ChatMessagesResponse) =>
        unwrapData(response),
      providesTags: (_result, _error, { chatId }) => [
        { type: "Chat" as const, id: `messages-${chatId}` },
      ],
    }),

    deleteChatMessage: builder.mutation<ChatMessage, string>({
      query: (id) => ({
        url: `/chat-message/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<ChatMessage> | ChatMessage) => unwrapData(response),
      invalidatesTags: [{ type: "Chat" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMyChatsQuery,
  useGetChatMembersQuery,
  useGetChatMessagesQuery,
  useDeleteChatMessageMutation,
} = chatApi;


export const useGetClientConversationsQuery = useGetMyChatsQuery;
export const useGetClientConversationParticipantsQuery = useGetChatMembersQuery;
export const useGetClientMessagesQuery = useGetChatMessagesQuery;
export const useDeleteClientMessageMutation = useDeleteChatMessageMutation;
