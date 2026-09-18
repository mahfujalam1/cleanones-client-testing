import { Avatar, Button, Card, Tag } from "antd";
import { TbPencil } from "react-icons/tb";
import type { ClientProfile as ApiClientProfile } from "@/types/api";

const panelStyles = { body: { padding: 20 } };

export function ProfileHeaderCard({
  profile,
  companyName,
  contractType,
  editLabel,
  onEdit,
}: {
  profile: ApiClientProfile;
  companyName: string;
  contractType: string;
  editLabel: string;
  onEdit: () => void;
}) {
  return (
    <Card className="border-slate-200" styles={panelStyles}>
      <div className="flex items-center gap-3">
        <ProfileAvatar data={profile} />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold text-slate-900">{companyName}</h2>
          <Tag color="blue" className="m-0 text-[10px]">
            {contractType}
          </Tag>
        </div>
        <Button
          icon={<TbPencil />}
          onClick={onEdit}
          className="ml-auto text-xs font-semibold cursor-pointer"
        >
          {editLabel}
        </Button>
      </div>
    </Card>
  );
}

function ProfileAvatar({ data }: { data: ApiClientProfile }) {
  const name = data.name || data.company_name || "Client";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar size={54} src={data.profile_image || undefined} className="shrink-0 bg-sky-500 text-xs font-bold">
      {initials}
    </Avatar>
  );
}
