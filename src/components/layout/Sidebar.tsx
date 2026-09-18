"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveTab, setMobileSidebarOpen, setLogoutModalOpen, toggleSidebarCollapsed } from "@/redux/slices/uiSlice";
import { getTranslation } from "@/utils/translations";
import { useGetClientConversationsQuery } from "@/redux/apis/chat";
import {
  TbLayoutDashboard,
  TbMapPin,
  TbBroadcast,
  TbCalendar,
  TbSparkles,
  TbMessage2,
  TbUser,
  TbLogout,
  TbSettings,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const collapsed = !isMobile && sidebarCollapsed;

  const locale = (params?.locale as string) || "en";
  const t = getTranslation(locale);

  const { data: conversationsRes } = useGetClientConversationsQuery({ page: 1, limit: 50 });
  const unreadBadge =
    conversationsRes?.result?.reduce((acc, c) => acc + (c.unread_count || 0), 0) ??
    conversationsRes?.meta?.unreadCount ??
    0;
  const menuItems = [
    { id: "dashboard", label: t.sidebar.dashboard, icon: TbLayoutDashboard, path: "/" },
    { id: "locations", label: t.sidebar.locations, icon: TbMapPin, path: "/locations" },
    { id: "rooms", label: t.sidebar.rooms, icon: TbBroadcast, path: "/rooms" },
    { id: "cleaning-plan", label: t.sidebar.cleaningPlan, icon: TbCalendar, path: "/cleaning-plan" },
    { id: "schedule", label: t.sidebar.schedule, icon: TbCalendar, path: "/schedule" },
    { id: "services", label: t.sidebar.services, icon: TbSparkles, path: "/services" },
    {
      id: "chat",
      label: t.sidebar.chat,
      icon: TbMessage2,
      path: "/chat",
      badge: unreadBadge,
    },
    { id: "profile", label: t.sidebar.profile, icon: TbUser, path: "/profile" },
    
  ];

  const handleNavigate = (id: string, path: string) => {
    dispatch(setActiveTab(id));
    dispatch(setMobileSidebarOpen(false));
    const prefix = `/${locale}`;
    router.push(`${prefix}${path === "/" ? "" : path}`);
  };

  const handleSignOut = () => {
    dispatch(setLogoutModalOpen(true));
  };

  return (
    <div className={`relative flex h-full min-h-0 w-full flex-col overflow-visible border-r border-border bg-white text-sidebar-foreground transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${collapsed ? 'lg:w-16' : 'lg:w-64'}`}>
      {isMobile && (
        <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
          <Link href={`/${locale}`} onClick={() => dispatch(setMobileSidebarOpen(false))}>
            <img
              src="/cleanones.png"
              alt="CleanOnes"
              className="h-auto w-24 cursor-pointer object-contain"
            />
          </Link>
        </div>
      )}

      {!isMobile && (
        <button
          type="button"
          onClick={() => dispatch(toggleSidebarCollapsed())}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-[14px] z-[60] hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:text-foreground lg:flex"
        >
          {collapsed ? <TbChevronRight /> : <TbChevronLeft />}
        </button>
      )}

      
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const hasBadge = typeof item.badge === "number" && item.badge > 0;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id, item.path)}
              className={`flex h-9 w-full cursor-pointer items-center justify-between rounded px-3 text-sm font-medium transition-colors ${isActive
                ? "bg-[#e5f6fc] text-primary"
                : "text-muted-foreground hover:bg-[#f2f9fc] hover:text-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                  {hasBadge && (
                    <span
                      className={`absolute -top-1.5 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-1 text-[8.5px] font-bold text-white shadow-sm ring-2 leading-none ${isActive ? "ring-[#e5f6fc]" : "ring-white"
                        }`}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && (
                <div className="flex items-center gap-2">
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-3 border-t border-border" />

      
      <div className="p-3 border-t border-sidebar-hover">
        <button
          onClick={handleSignOut}
          title={t.sidebar.signOut}
          className="flex h-9 w-full cursor-pointer items-center gap-3 rounded px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-[#f1f3f5] hover:text-[#252b37]"
        >
          <TbLogout className="w-4.5 h-4.5" />
          {!collapsed && <span>{t.sidebar.signOut}</span>}
        </button>
      </div>
    </div>
  );
}
