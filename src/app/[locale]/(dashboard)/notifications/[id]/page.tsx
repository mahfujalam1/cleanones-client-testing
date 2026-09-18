"use client";

import { useEffect, useState } from "react";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { Alert } from "antd";
import {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} from "@/redux/apis/notification";
import type { NotificationItem } from "@/types/api";
import { getTranslation } from "@/utils/translations";
import { NotificationDetailsActions } from "@/components/notifications/NotificationDetailsActions";
import { NotificationDetailsSkeleton } from "@/components/notifications/NotificationDetailsSkeleton";
import { NotificationDetailsCard } from "@/components/notifications/NotificationDetailsCard";
import { NotificationNotFoundCard } from "@/components/notifications/NotificationNotFoundCard";

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
      <NotificationDetailsActions
        t={t}
        showDelete={Boolean(notification)}
        deleting={deleting}
        onBack={() => router.push(`/${locale}/notifications`)}
        onDelete={() => void handleDelete()}
      />

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}

      {isLoading ? (
        <NotificationDetailsSkeleton />
      ) : notification ? (
        <NotificationDetailsCard t={t} notification={notification} />
      ) : (
        <NotificationNotFoundCard t={t} onBack={() => router.push(`/${locale}/notifications`)} />
      )}
    </div>
  );
}
