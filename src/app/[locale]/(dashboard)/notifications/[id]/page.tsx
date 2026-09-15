"use client";

import { useEffect, useState } from "react";
import { message } from "antd";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button, Card, Empty, Skeleton, Tag, Tooltip } from "antd";
import { TbBell, TbChevronLeft, TbTrash } from "react-icons/tb";
import {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} from "@/redux/apis/notification";
import type { NotificationItem } from "@/types/api";
import { getTranslation } from "@/utils/translations";

function formatNotificationDate(dateStr?: string): string {
  if (!dateStr) return "";
  const m = moment(dateStr);
  if (!m.isValid()) return dateStr;
  return m.format("Do MMM YYYY, h:mm a").replace(/\bSep\b/, "Sept");
}

export default function NotificationDetailsPage() {
  const params = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const locale = params?.locale || "en";
  const id = params?.id as string;
  const t = getTranslation(locale);

  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { data: notificationsData, isLoading } = useGetNotificationsQuery();
  const [seeNotifications] = useSeeNotificationsMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notification: NotificationItem | undefined =
    notificationsData?.data?.result?.find((item: any) => item._id === id);

  // Automatically mark notifications as read/seen when viewing details
  useEffect(() => {
    if (id) {
      void seeNotifications();
    }
  }, [id, seeNotifications]);

  const handleDelete = async () => {
    if (!id || deleting) return;
    setDeleting(true);
    setError("");
    try {
      const res = await deleteNotification(id).unwrap();
      if (res.success) {
        message.success(t.actionFeedback.deleted);
        router.push(`/${locale}/notifications`);
      } else {
        setError(res.message || "Failed to delete notification");
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string } };
      setError(errObj?.data?.message || "Failed to delete notification");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-2">
        <Button
          icon={<TbChevronLeft />}
          onClick={() => router.push(`/${locale}/notifications`)}
          className="text-xs"
        >
          {t.notificationsPage.backTo}
        </Button>
        {notification && (
          <Tooltip title="Delete notification">
            <Button
              danger
              icon={<TbTrash />}
              loading={deleting}
              onClick={() => void handleDelete()}
              className="text-xs"
            >
              {t.notificationsPage.delete}
            </Button>
          </Tooltip>
        )}
      </div>

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}

      {isLoading ? (
        <Card className="border-slate-200" styles={{ body: { padding: 24 } }}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      ) : notification ? (
        <Card className="border-slate-200" styles={{ body: { padding: 20 } }}>
          <div className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-500">
              <TbBell className="text-xl" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base font-bold text-slate-900">{notification.title}</h1>
                {notification.notification_type && (
                  <Tag color="blue" className="m-0 text-[10px] uppercase">
                    {notification.notification_type}
                  </Tag>
                )}
                <Tag color="green" className="m-0 text-[10px]">
                  {t.notificationsPage.read}
                </Tag>
              </div>

              <time className="mt-1 block text-xs text-slate-400">
                {formatNotificationDate(notification.created_at)}
              </time>

              <div className="mt-4 rounded border border-slate-100 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-700">
                <p className="whitespace-pre-wrap">{notification.message}</p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-xs">{t.notificationsPage.notFound}</span>}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => router.push(`/${locale}/notifications`)}
              className="text-xs"
            >
              {t.notificationsPage.backToNotifications}
            </Button>
          </Empty>
        </Card>
      )}
    </div>
  );
}
