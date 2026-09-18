import { Card } from "antd";
import { TbBuilding, TbMail, TbPhone, TbUser } from "react-icons/tb";
import { SectionTitle, Info } from "@/components/profile/shared";

const panelStyles = { body: { padding: 20 } };

export function ProfileContactInfoCard({
  title,
  companyLabel,
  companyName,
  contactPersonLabel,
  contactPerson,
  emailLabel,
  email,
  phoneLabel,
  phone,
}: {
  title: string;
  companyLabel: string;
  companyName: string;
  contactPersonLabel: string;
  contactPerson: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
}) {
  return (
    <Card className="border-slate-200" styles={panelStyles}>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        <Info icon={<TbBuilding />} label={companyLabel} value={companyName} />
        <Info icon={<TbUser />} label={contactPersonLabel} value={contactPerson} />
        <Info icon={<TbMail />} label={emailLabel} value={email} />
        <Info icon={<TbPhone />} label={phoneLabel} value={phone} />
      </div>
    </Card>
  );
}
