"use client";

import { useState, type MouseEvent } from "react";
import { message } from "antd";
import moment from "moment";
import { useRouter, useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Alert, App, Button, Card, Checkbox, Empty, Skeleton, Tooltip } from "antd";
import { TbBell, TbChevronLeft, TbChevronRight, TbTrash } from "react-icons/tb";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useSeeNotificationsMutation,
} from "@/redux/apis/notification";
import { getNotificationRoute } from "@/services/actions/client";
import type { NotificationItem } from "@/types/api";

function formatNotificationDate(dateStr?: string): string {
  if (!dateStr) return "";
  const m = moment(dateStr);
  if (!m.isValid()) return dateStr;
  return m.format("Do MMM YYYY, h:mm a").replace(/\bSep\b/, "Sept");
}


function isRead(n: NotificationItem): boolean {
  return Boolean(n.isRead ?? n.is_read);
}


function createdAt(n: NotificationItem): string | undefined {
  return n.createdAt ?? n.created_at;
}

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
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Notifications</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Review your activity updates.
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={allSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => handleSelectAll(e.target.checked)}
              disabled={bulkDeleting || loading}
            >
              <span className="text-xs font-medium text-slate-700">Select All</span>
            </Checkbox>
            {selectedIds.length > 0 && (
              <Button
                danger
                size="small"
                type="primary"
                icon={<TbTrash />}
                loading={bulkDeleting}
                onClick={handleBulkDelete}
                className="text-xs font-semibold"
              >
                Delete Selected ({selectedIds.length})
              </Button>
            )}
          </div>
        )}
      </div>

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}
      {success && <Alert type="success" showIcon message={success} closable onClose={() => setSuccess("")} />}

      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="border-slate-200" styles={{ body: { padding: 14 } }}>
              <Skeleton active avatar paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-3">
          {items.map((notification) => {
            const targetRoute = getNotificationRoute(notification.route_type, locale);
            const isClickable = Boolean(targetRoute);
            const isSelected = selectedIds.includes(notification._id);
            const read = isRead(notification);

            return (
              <Card
                key={notification._id}
                onClick={isClickable ? () => void handleNotificationClick(notification) : undefined}
                className={`transition-colors ${
                  isClickable
                    ? "cursor-pointer hover:border-slate-300 hover:shadow-sm"
                    : "cursor-default"
                } ${
                  isSelected
                    ? "border-sky-400 bg-sky-50/70"
                    : read
                    ? "border-slate-200"
                    : "border-sky-200 bg-sky-50/40"
                }`}
                styles={{ body: { padding: 14 } }}
              >
                <div className="flex items-start gap-3">
                  
                  <div className="pointer-events-auto flex items-center pt-2">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleToggleSelect(notification._id)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={bulkDeleting || deletingId === notification._id}
                      aria-label={`Select ${notification.title}`}
                    />
                  </div>

                  
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-sky-100 bg-sky-50 text-sky-500">
                    <TbBell className="text-base" />
                  </span>

                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-xs font-bold text-slate-800">{notification.title}</p>
                      {!read && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-label="Unread" />
                      )}
                      {notification.type && (
                        <span className="ml-auto shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-400">
                          {notification.type}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{notification.message}</p>
                    <time className="mt-1 block text-[10px] text-slate-400">
                      {formatNotificationDate(createdAt(notification))}
                    </time>
                  </div>

                  
                  <div className="pointer-events-auto">
                    <Tooltip title="Delete notification">
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<TbTrash />}
                        loading={deletingId === notification._id}
                        disabled={deletingId !== null}
                        onClick={(event) => void remove(event, notification._id)}
                        aria-label="Delete notification"
                      />
                    </Tooltip>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span className="text-xs">No notifications</span>} />
        </Card>
      )}

      
      <div className="flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="text-[10px] text-slate-400">
          {meta ? `Page ${page} of ${totalPages} · ${meta.total} total` : ""}
        </span>
        <div className="flex gap-2">
          <Button
            icon={<TbChevronLeft />}
            disabled={page === 1 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="text-xs"
          >
            Previous
          </Button>
          <Button
            icon={<TbChevronRight />}
            iconPosition="end"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
            className="text-xs"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
