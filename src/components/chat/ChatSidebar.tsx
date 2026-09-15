"use client";

import React from "react";
import { MdBusiness, MdEngineering, MdGroups, MdSearch } from "react-icons/md";
import type { ChatItem } from "@/redux/apis/chat";
import { DetailSkeleton, formatMessageTime } from "./chatUtils";

export type ChatTab = "all" | "group" | "client" | "worker";

interface ChatSidebarProps {
  activeTab: ChatTab;
  tabCounts: { all: number; group: number; client: number; worker: number };
  query: string;
  chats: ChatItem[];
  selectedId: string | null;
  loading: boolean;
  onTabChange: (tab: ChatTab) => void;
  onQueryChange: (q: string) => void;
  onSelectChat: (chat: ChatItem) => void;
  isChatOnline: (chat: ChatItem) => boolean;
}

export function ChatSidebar({
  activeTab,
  tabCounts,
  query,
  chats,
  selectedId,
  loading,
  onTabChange,
  onQueryChange,
  onSelectChat,
  isChatOnline,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-slate-200/90">
      <div className="p-2.5 border-b border-slate-100 bg-white">
        <div className="grid grid-cols-4 gap-1 rounded-lg border border-slate-200 bg-slate-50/80 p-1">
          {(
            [
              ["all", "All", tabCounts.all],
              ["group", "Groups", tabCounts.group],
              ["client", "Clients", tabCounts.client],
              ["worker", "Workers", tabCounts.worker],
            ] as const
          ).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={`flex items-center justify-center gap-1 rounded-md py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === id
                  ? "bg-white text-primary shadow-xs border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <span>{label}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1 rounded-full font-bold ${
                    activeTab === id ? "bg-sky-50 text-primary" : "text-slate-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-100 p-2.5">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search conversations..."
            className="h-8.5 w-full rounded-lg border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2 space-y-1">
        {loading ? (
          <DetailSkeleton blocks={6} />
        ) : chats.length > 0 ? (
          chats.map((chat) => {
            const isSelected = selectedId === chat._id;
            const online = isChatOnline(chat);
            const name = chat.display_name || chat.name || "Chat";
            const lastMsgText = chat.last_message?.text || "No messages yet";
            const time = formatMessageTime(chat.last_message_at || chat.createdAt || chat.created_at);

            return (
              <button
                key={chat._id}
                type="button"
                onClick={() => onSelectChat(chat)}
                className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "border-primary/30 bg-sky-50/70 shadow-xs"
                    : "border-transparent hover:border-slate-200 hover:bg-slate-50/70"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shadow-xs">
                    {chat.type === "group" ? (
                      <MdGroups className="text-lg text-white" />
                    ) : chat.type === "client" ? (
                      <MdBusiness className="text-lg text-white" />
                    ) : (
                      <MdEngineering className="text-lg text-white" />
                    )}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                        online ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                      title={online ? "Online" : "Offline"}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-bold text-slate-900">{name}</span>
                      {time && <span className="shrink-0 text-[10px] text-slate-400">{time}</span>}
                    </div>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                          chat.type === "group"
                            ? "bg-purple-100 text-purple-700"
                            : chat.type === "client"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {chat.type}
                      </span>
                      <p className="truncate text-[11px] text-slate-500">{lastMsgText}</p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="py-16 text-center text-xs text-slate-400">
            No conversations found in this tab.
          </div>
        )}
      </div>
    </aside>
  );
}
