import { Button, Card, Empty } from "antd";

export function NotificationNotFoundCard({ t, onBack }: { t: any; onBack: () => void }) {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className="text-xs">{t.notificationsPage.notFound}</span>}
      >
        <Button
          type="primary"
          size="small"
          onClick={onBack}
          className="text-xs"
        >
          {t.notificationsPage.backToNotifications}
        </Button>
      </Empty>
    </Card>
  );
}
