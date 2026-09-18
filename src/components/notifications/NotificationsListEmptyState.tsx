import { Card, Empty } from "antd";

export function NotificationsListEmptyState() {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span className="text-xs">No notifications</span>} />
    </Card>
  );
}
