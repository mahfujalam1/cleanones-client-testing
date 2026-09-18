import { Button } from "antd";
import { TbMessageCircle } from "react-icons/tb";

export function DashboardHeader({
  greetingName,
  welcomeTitle,
  currentDateStr,
  chatLabel,
  onChat,
}: {
  greetingName: string;
  welcomeTitle: string;
  currentDateStr: string;
  chatLabel: string;
  onChat: () => void;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-base font-semibold text-slate-900">
          {welcomeTitle}, {greetingName}
        </h1>
        <p className="mt-1 text-xs text-slate-500">{currentDateStr}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="default"
          size="middle"
          icon={<TbMessageCircle />}
          onClick={onChat}
          className="text-xs font-medium"
        >
          {chatLabel}
        </Button>
      </div>
    </header>
  );
}
