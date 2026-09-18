import { Progress } from "antd";
import type { LiveShift } from "@/components/rooms/liveStatusTypes";

export function ShiftStatusBar({ shift, t }: { shift: LiveShift; t: any }) {
  const statusColor =
    shift.status === "completed"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : shift.status === "in_progress"
      ? "text-sky-700 bg-sky-50 border-sky-200"
      : "text-orange-700 bg-orange-50 border-orange-200";

  return (
    <div className={`rounded border p-4 ${shift.status === "in_progress" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
            {shift.status.replace(/_/g, " ")}
          </span>
          <p className="mt-1 text-xs text-slate-700">
            {shift.location?.name}
          </p>
        </div>
        <div className="text-right">
          <b className="text-xs text-slate-800">{shift.overall_progress_percent}% {t.liveStatus.complete}</b>
          <p className="text-[10px] text-slate-500">
            {shift.completed_room}/{shift.total_room} {t.liveStatus.roomsDone}
          </p>
        </div>
      </div>
      <Progress
        percent={shift.overall_progress_percent}
        showInfo={false}
        strokeColor="#009EE2"
        trailColor="#e2e8f0"
        size="small"
        className="mt-2"
      />
    </div>
  );
}
