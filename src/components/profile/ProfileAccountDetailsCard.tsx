import { Card } from "antd";
import { SectionTitle, Fact } from "@/components/profile/shared";

const panelStyles = { body: { padding: 20 } };

export function ProfileAccountDetailsCard({
  title,
  memberSinceLabel,
  memberSince,
  contractTypeLabel,
  contractType,
}: {
  title: string;
  memberSinceLabel: string;
  memberSince: string;
  contractTypeLabel: string;
  contractType: string;
}) {
  return (
    <Card className="border-slate-200" styles={panelStyles}>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Fact label={memberSinceLabel} value={memberSince} />
        <Fact label={contractTypeLabel} value={contractType} />
      </div>
    </Card>
  );
}
