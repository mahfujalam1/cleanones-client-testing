import { Button, Card } from "antd";
import { TbLock } from "react-icons/tb";

const panelStyles = { body: { padding: 20 } };

export function ProfileChangePasswordCard({
  title,
  description,
  onChangePassword,
}: {
  title: string;
  description: string;
  onChangePassword: () => void;
}) {
  return (
    <Card className="border-slate-200" styles={panelStyles}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-orange-200 bg-orange-50 text-orange-500">
          <TbLock className="text-base" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-800">{title}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {description}
          </p>
        </div>
        <Button onClick={onChangePassword} className="ml-auto text-xs font-semibold cursor-pointer">
          {title}
        </Button>
      </div>
    </Card>
  );
}
