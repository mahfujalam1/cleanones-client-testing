import { Rate } from "antd";

export interface FeedbackRecord {
  id: string;
  date: string;
  time: string;
  location: string;
  rating: number;
  label: string;
  comment: string;
}

interface FeedbackHistoryItemProps {
  record: FeedbackRecord;
}

export function FeedbackHistoryItem({ record }: FeedbackHistoryItemProps) {
  return (
    <article className="space-y-2 p-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Rate disabled value={record.rating} className="text-xs" />
          <span className="font-bold text-slate-800">{record.label}</span>
        </div>
        <time className="text-[10px] font-semibold text-slate-400">
          {record.date} · {record.time}
        </time>
      </div>

      <p className="text-[11px] font-medium text-slate-500">{record.location}</p>
      <p className="rounded border border-slate-200 bg-slate-50/60 p-2.5 text-xs leading-5 text-slate-600">
        “{record.comment}”
      </p>
    </article>
  );
}
