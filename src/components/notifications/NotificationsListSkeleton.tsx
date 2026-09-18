import { Card, Skeleton } from "antd";

export function NotificationsListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <Card key={item} className="border-slate-200" styles={{ body: { padding: 14 } }}>
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </Card>
      ))}
    </div>
  );
}
