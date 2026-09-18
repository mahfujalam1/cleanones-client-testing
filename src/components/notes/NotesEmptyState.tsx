import { Card, Empty } from "antd";

export function NotesEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <p className="text-xs font-semibold text-slate-700">{title}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              {description}
            </p>
          </div>
        }
      />
    </Card>
  );
}
