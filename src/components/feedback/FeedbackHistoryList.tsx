import { Card } from "antd";
import { FeedbackHistoryItem, type FeedbackRecord } from "@/components/feedback/FeedbackHistoryItem";

export function FeedbackHistoryList({ title, records }: { title: string; records: FeedbackRecord[] }) {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 0 } }}>
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-slate-200">
        {records.map((record) => (
          <FeedbackHistoryItem key={record.id} record={record} />
        ))}
      </div>
    </Card>
  );
}
