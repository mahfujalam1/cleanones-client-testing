import { Card, Skeleton } from "antd";

export function NotificationDetailsSkeleton() {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 24 } }}>
      <Skeleton active avatar paragraph={{ rows: 4 }} />
    </Card>
  );
}
