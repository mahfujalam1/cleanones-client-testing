import type { ReactNode } from "react";
import { Button } from "antd";
import { TbArrowUpRight, TbCalendar, TbMessageCircle, TbPlus } from "react-icons/tb";

export function DashboardQuickActions({
  t,
  onExtraService,
  onSchedule,
  onChat,
}: {
  t: any;
  onExtraService: () => void;
  onSchedule: () => void;
  onChat: () => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 pt-1">
      <Action onClick={onExtraService} icon={<TbPlus />} title={t.dashboard.extraServiceReq} />
      <Action onClick={onSchedule} icon={<TbCalendar />} title={t.dashboard.viewSchedule} />
      <Action onClick={onChat} icon={<TbMessageCircle />} title={t.dashboard.contactSupport} />
    </div>
  );
}

const Action = ({ onClick, icon, title }: { onClick: () => void; icon: ReactNode; title: string }) => (
  <Button
    block
    onClick={onClick}
    className="group relative !flex !h-auto !items-center !justify-start !gap-4 overflow-hidden rounded-xl !border-slate-200/60 bg-white !p-4 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:!border-sky-300 hover:shadow-md cursor-pointer"
  >
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 text-lg text-white shadow-xs ring-2 ring-white transition-transform duration-300 group-hover:scale-110">
      {icon}
    </span>
    <b className="text-[13px] font-semibold text-slate-700 transition-colors group-hover:text-sky-700">{title}</b>
    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-sky-50 group-hover:text-sky-500">
      <TbArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </div>
  </Button>
);
