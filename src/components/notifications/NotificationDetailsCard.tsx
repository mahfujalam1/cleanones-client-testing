import moment from "moment";
import { Card, Tag } from "antd";
import { TbBell } from "react-icons/tb";
import type { NotificationItem } from "@/types/api";

function formatNotificationDate(dateStr?: string): string {
  if (!dateStr) return "";
  const m = moment(dateStr);
  if (!m.isValid()) return dateStr;
  return m.format("Do MMM YYYY, h:mm a").replace(/\bSep\b/, "Sept");
}

export function NotificationDetailsCard({ t, notification }: { t: any; notification: NotificationItem }) {
  return (
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
  );
}
