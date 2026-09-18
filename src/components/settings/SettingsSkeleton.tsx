import { Card, Skeleton } from "antd";

const panelStyles = { body: { padding: 20 } };

export function SettingsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {[1, 2].map((item) => (
        <Card key={item} className="border-slate-200" styles={panelStyles}>
          <Skeleton active paragraph={{ rows: 5 }} />
        </Card>
      ))}
    </div>
  );
}
