"use client";

import { useState, type MouseEvent } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Alert, App } from "antd";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useSeeNotificationsMutation,
} from "@/redux/apis/notification";
import { getNotificationRoute } from "@/services/actions/client";
import type { NotificationItem } from "@/types/api";
import { NotificationsListHeader } from "@/components/notifications/NotificationsListHeader";
import { NotificationsListSkeleton } from "@/components/notifications/NotificationsListSkeleton";
import { NotificationListItem, isRead } from "@/components/notifications/NotificationListItem";
import { NotificationsListEmptyState } from "@/components/notifications/NotificationsListEmptyState";
import { NotificationsListPagination } from "@/components/notifications/NotificationsListPagination";

export default function NotificationsPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const t = getTranslation(locale);
  const { message: antMessage } = App.useApp();

  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const { data: notificationsRes, isLoading: loading, refetch } = useGetNotificationsQuery({ page, limit: 10 });
  const [deleteNotificationMutation] = useDeleteNotificationMutation();
  const [seeNotificationsMutation] = useSeeNotificationsMutation();


  const meta = notificationsRes?.data?.meta;
  const items: NotificationItem[] = notificationsRes?.data?.result ?? [];
  const totalPages = meta?.totalPage ?? 1;
  const unreadCount = meta?.unreadCount ?? 0;

  const allSelected = items.length > 0 && items.every((i) => selectedIds.includes(i._id));
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? items.map((i) => i._id) : []);
  };

  const handleToggleSelect = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    const targetRoute = getNotificationRoute(notification.route_type, locale);
    if (!targetRoute) return;
    if (!isRead(notification)) {
      void seeNotificationsMutation();
    }
    router.push(targetRoute);
  };

  const remove = async (event: MouseEvent<HTMLElement>, notificationId: string) => {
    event.stopPropagation();
    setDeletingId(notificationId);
    setError("");
    setSuccess("");
    try {
      await deleteNotificationMutation(notificationId).unwrap();
      message.success(t.actionFeedback.deleted);
      antMessage.success("Notification deleted successfully");
      setSuccess("Notification deleted successfully");
      setSelectedIds((prev) => prev.filter((id) => id !== notificationId));
      void refetch();
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      const msg =
        errObj?.data?.message ?? errObj?.message ?? "Failed to delete notification";
      setError(msg);
      antMessage.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setBulkDeleting(true);
    setError("");
    setSuccess("");
    try {
      await Promise.all(selectedIds.map((id) => deleteNotificationMutation(id).unwrap()));
      message.success(t.actionFeedback.deleted);
      const count = selectedIds.length;
      antMessage.success(`${count} notification${count > 1 ? "s" : ""} deleted`);
      setSuccess(`${count} notification${count > 1 ? "s" : ""} deleted`);
      setSelectedIds([]);
      void refetch();
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      const msg =
        errObj?.data?.message ?? errObj?.message ?? "Failed to delete selected notifications";
      setError(msg);
      antMessage.error(msg);
    } finally {
      setBulkDeleting(false);
    }
  };

  return (
    <div className="space-y-4 text-sm">
      <NotificationsListHeader
        unreadCount={unreadCount}
        hasItems={items.length > 0}
        allSelected={allSelected}
        isIndeterminate={isIndeterminate}
        selectedCount={selectedIds.length}
        bulkDeleting={bulkDeleting}
        loading={loading}
        onSelectAll={handleSelectAll}
        onBulkDelete={() => void handleBulkDelete()}
      />

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}
      {success && <Alert type="success" showIcon message={success} closable onClose={() => setSuccess("")} />}


      {loading ? (
        <NotificationsListSkeleton />
      ) : items.length > 0 ? (
        <div className="space-y-3">
          {items.map((notification) => {
            const targetRoute = getNotificationRoute(notification.route_type, locale);
            const isClickable = Boolean(targetRoute);
            const isSelected = selectedIds.includes(notification._id);

            return (
              <NotificationListItem
                key={notification._id}
                notification={notification}
                isClickable={isClickable}
                isSelected={isSelected}
                deletingId={deletingId}
                bulkDeleting={bulkDeleting}
                onClick={isClickable ? () => void handleNotificationClick(notification) : undefined}
                onToggleSelect={() => handleToggleSelect(notification._id)}
                onDelete={(event) => void remove(event, notification._id)}
              />
            );
          })}
        </div>
      ) : (
        <NotificationsListEmptyState />
      )}


      <NotificationsListPagination
        page={page}
        totalPages={totalPages}
        totalLabel={meta ? `Page ${page} of ${totalPages} · ${meta.total} total` : ""}
        loading={loading}
        onPrevious={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
