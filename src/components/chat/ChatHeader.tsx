"use client";

import React from "react";
import { MdArrowBack, MdBusiness, MdEngineering, MdGroups } from "react-icons/md";
import type { ChatItem } from "@/redux/apis/chat";

interface ChatHeaderProps {
  chat: ChatItem;
  isOnline: boolean;
  onBack?: () => void;
}

export function ChatHeader({ chat, isOnline, onBack }: ChatHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-3 sm:px-4 bg-white">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer lg:hidden"
          >
            <MdArrowBack className="text-xl" />
          </button>
        )}

        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold shadow-xs">
          {chat.type === "group" ? (
            <MdGroups className="text-xl text-white" />
          ) : chat.type === "client" ? (
            <MdBusiness className="text-xl text-white" />
          ) : (
            <MdEngineering className="text-xl text-white" />
          )}
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
              isOnline ? "bg-emerald-500" : "bg-slate-300"
            }`}
          />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold text-slate-900">
            {chat.display_name || chat.name || "Chat"}
          </h2>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
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
            <span>•</span>
            {isOnline ? (
              <span className="text-emerald-600 font-medium">Active now</span>
            ) : (
              <span>Offline</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
