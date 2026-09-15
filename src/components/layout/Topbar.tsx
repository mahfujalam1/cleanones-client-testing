"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileSidebar, setLogoutModalOpen } from "@/redux/slices/uiSlice";
import { TbMenu2, TbBell, TbWorld, TbLogout, TbChevronDown, TbUser } from "react-icons/tb";
import { Button, Dropdown, Empty, Tooltip } from "antd";
import { useRouter, useParams, usePathname } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useGetMyProfileQuery } from "@/redux/apis/profile";
import {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
} from "@/redux/apis/notification";
import { getNotificationRoute } from "@/services/actions/client";
import type { NotificationItem } from "@/types/api";
import { updateProfile as updateReduxProfile } from "@/redux/slices/auth";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from "@/utils/locales";

export function Topbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const user = useAppSelector((state) => state.auth.user);

  const locale = (params?.locale as string) || "en";
  const t = getTranslation(locale);

  // Map activeTab id to translated page titles
  const tabTitles: Record<string, string> = {
    dashboard: t.titles.dashboard,
    locations: t.titles.locations,
    rooms: t.titles.rooms,
    "cleaning-plan": t.titles.cleaningPlan,
    schedule: t.titles.schedule,
    notes: t.titles.notes,
    services: t.titles.services,
    feedback: t.titles.feedback,
    chat: t.titles.chat,
    profile: t.titles.profile,
    settings: t.titles.settings,
    notifications: t.titles.notifications,
  };

  const pathSegment = pathname ? pathname.split("/").filter(Boolean)[1] : "";
  const pageTitle = tabTitles[activeTab] || tabTitles[pathSegment] || "Portal";

  const handleLanguageChange = (newLocale: string) => {
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0 && isSupportedLocale(segments[0])) {
        segments[0] = newLocale;
      } else {
        segments.unshift(newLocale);
      }
      router.push("/" + segments.join("/"));
    } else {
      router.push("/" + (newLocale || DEFAULT_LOCALE));
    }
  };

  const languageItems = SUPPORTED_LOCALES.map((code) => {
    const labels: Record<string, string> = {
      en: "English",
      nl: "Nederlands",
      pl: "Polski",
      uk: "Українська",
      pt: "Português",
      ar: "العربية",
      fr: "Français",
      es: "Español",
    };
    return {
      key: code,
      label: labels[code] || code.toUpperCase(),
      onClick: () => handleLanguageChange(code),
    };
  });

  const { data: profileRes } = useGetMyProfileQuery();

  const [seeNotificationsMutation] = useSeeNotificationsMutation();

  React.useEffect(() => {
    const profile = profileRes?.data;
    if (profile) {
      dispatch(
        updateReduxProfile({
          name: profile.name,
          company: profile.company_name,
          email: profile.email,
          phone: profile.phone,
          clientNo: profile._id,
          memberSince: profile.licence_expiration_date ? new Date(profile.licence_expiration_date).getFullYear().toString() : "",
          contractType: profile.contract_status,
          status: profile.user?.isActive ? "Active" : "Inactive",
          profilePhoto: profile.profile_image,
        }),
      );

      try {
        const local = localStorage.getItem("cleanones-client-user");
        const session = sessionStorage.getItem("cleanones-client-user");
        const saved = local || session;
        if (saved) {
          const parsed = JSON.parse(saved);
          const updated = JSON.stringify({
            ...parsed,
            name: profile.name,
            company: profile.company_name,
            profilePhoto: profile.profile_image,
            contractType: profile.contract_status,
          });
          if (local) {
            localStorage.setItem("cleanones-client-user", updated);
          } else {
            sessionStorage.setItem("cleanones-client-user", updated);
          }
        }
      } catch {
        // ignore storage errors
      }
    }
  }, [profileRes, dispatch]);

  const { data: notificationsRes } = useGetNotificationsQuery({ limit: 5 });
  const rawList = notificationsRes?.data;
  const recentNotifications: NotificationItem[] = Array.isArray(rawList)
    ? rawList
    : rawList && typeof rawList === "object" && "result" in rawList && Array.isArray((rawList as { result: NotificationItem[] }).result)
      ? (rawList as { result: NotificationItem[] }).result
      : [];
  const unreadCount = recentNotifications.filter((n) => !n.is_read).length;

  const handleNotificationClick = async (notification: NotificationItem) => {
    const targetRoute = getNotificationRoute(notification.route_type, locale);
    if (!targetRoute) return;

    if (!notification.is_read) {
      void seeNotificationsMutation();
    }
    router.push(targetRoute);
  };

  const notificationItems = [
    ...(recentNotifications.length > 0
      ? recentNotifications.map((notification) => {
        const targetRoute = getNotificationRoute(notification.route_type, locale);
        const isClickable = Boolean(targetRoute);

        return {
          key: notification._id,
          disabled: !isClickable,
          className: isClickable
            ? ""
            : "!cursor-default hover:!bg-transparent active:!bg-transparent focus:!bg-transparent !bg-transparent pointer-events-none",
          onClick: isClickable ? () => void handleNotificationClick(notification) : undefined,
          label: (
            <div className={`py-1 min-w-55 max-w-65 ${isClickable ? "cursor-pointer" : "cursor-default select-none pointer-events-none"}`}>
              <div className="flex items-center gap-1.5">
                <p className="truncate font-bold text-slate-800 text-xs leading-tight">{notification.title}</p>
                {!notification.is_read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-label="Unread" />}
              </div>
              <p className="text-[10px] text-slate-400 font-normal mt-1 line-clamp-2">{notification.message}</p>
            </div>
          ),
        };
      })
      : [
        {
          key: "empty",
          label: (
            <div className="min-w-55 py-2">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span className="text-xs">{t.topbar.noNotifications}</span>} />
            </div>
          ),
          disabled: true,
        },
      ]),
    { type: "divider" as const },
    {
      key: "view-all",
      label: <span className="text-primary font-semibold text-xs">{t.topbar.viewAllNotifications}</span>,
      onClick: () => router.push(`/${locale}/notifications`),
    },
  ];

  return (
    <header className="flex h-14 shrink-0 select-none items-center justify-between gap-2 border-b border-border bg-white px-3 sm:px-4 lg:px-6">
      {/* Left side: Hamburger (mobile) & Section Title */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <Button
          type="default"
          size="small"
          aria-label="Open navigation"
          onClick={() => dispatch(toggleMobileSidebar())}
          icon={<TbMenu2 className="h-5 w-5" />}
          className="!h-8 !w-8 !min-w-0 !rounded !border-border !p-0 !text-slate-600 lg:!hidden"
        >
        </Button>
        <Link href={`/${locale}`} className="hidden shrink-0 sm:block">
          <img src="/cleanones.png" className="h-auto w-16 cursor-pointer object-contain" alt="CleanOnes" />
        </Link>
        <span className="hidden h-6 w-px bg-border sm:block" />
        <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
          {pageTitle}
        </h2>
      </div>

      {/* Right side: Language selection, Notifications, & User profile dropdown */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3.5">
        {/* Language Selector Dropdown */}
        <Dropdown menu={{ items: languageItems }} trigger={["click"]} placement="bottomRight">
          <Button
            type="default"
            size="small"
            icon={<TbWorld className="h-3.5 w-3.5 text-slate-500" />}
            className="!h-8 !rounded !border-border !px-2 !text-[11px] !font-semibold !text-slate-600 !pr-4"
          >
            {(locale || "en").toUpperCase()}
          </Button>
        </Dropdown>

        {/* Notifications Icon with Dropdown */}
        <Dropdown menu={{ items: notificationItems }} trigger={["click"]} placement="bottomRight">
          <Button
            type="default"
            size="small"
            aria-label="Notifications"
            icon={<TbBell className="h-4 w-4" />}
            className="relative !h-8 !w-8 !min-w-0 !rounded !border-border !p-0 !text-slate-500"
          >
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />}
          </Button>
        </Dropdown>

        {/* User profile & Logout button */}
        {(user || profileRes) && (
          <Dropdown
            menu={{
              items: [
                {
                  key: "profile",
                  icon: <TbUser className="h-4 w-4 text-slate-500" />,
                  label: <span>{t.topbar.profile}</span>,
                  onClick: () => router.push(`/${locale}/profile`),
                },
                { type: "divider" },
                {
                  key: "logout",
                  icon: <TbLogout className="h-4 w-4 text-red-500" />,
                  label: <span className="text-red-500 font-medium">{t.sidebar.signOut}</span>,
                  onClick: () => dispatch(setLogoutModalOpen(true)),
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="flex items-center gap-2 rounded px-2 py-1 text-left transition-colors hover:bg-slate-50 cursor-pointer ml-1">
              <img
                src={profileRes?.data?.profile_image || user?.profilePhoto || "/avatar-placeholder.svg"}
                alt={profileRes?.data?.name || user?.name || "manager1"}
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
              <div className="hidden sm:flex flex-col items-start leading-none gap-1">
                <span className="text-sm font-bold text-slate-700 leading-none">
                  {profileRes?.data?.name || user?.name || "manager1"}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide leading-none">
                  {user?.role || "CLIENT"}
                </span>
              </div>
              <TbChevronDown className="hidden sm:block h-4 w-4 text-slate-400" />
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
