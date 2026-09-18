import { Card, Skeleton } from "antd";

const panelStyles = { body: { padding: 20 } };

export function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      {[100, 210, 130].map((height) => (
        <Card key={height} className="border-slate-200" styles={panelStyles}>
          <Skeleton active paragraph={{ rows: Math.max(1, Math.round(height / 55)) }} />
        </Card>
      ))}
    </div>
  );
}
