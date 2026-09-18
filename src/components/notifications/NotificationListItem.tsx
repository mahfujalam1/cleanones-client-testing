import moment from "moment";
import { Button, Card, Checkbox, Tooltip } from "antd";
import { TbBell, TbTrash } from "react-icons/tb";
import type { MouseEvent } from "react";
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

export function NotificationListItem({
  notification,
  isClickable,
  isSelected,
  deletingId,
  bulkDeleting,
  onClick,
  onToggleSelect,
  onDelete,
}: {
  notification: NotificationItem;
  isClickable: boolean;
  isSelected: boolean;
  deletingId: string | null;
  bulkDeleting: boolean;
  onClick: (() => void) | undefined;
  onToggleSelect: () => void;
  onDelete: (event: MouseEvent<HTMLElement>) => void;
}) {
  const read = isRead(notification);

  return (
    <Card
      onClick={onClick}
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
            onChange={onToggleSelect}
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
              onClick={onDelete}
              aria-label="Delete notification"
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}

export { isRead };
