import { TbClock, TbMapPin, TbUsers } from "react-icons/tb";
import { formatShiftTime } from "@/components/dashboard/dashboardHelpers";

export function TodayStatusPanel({
  statusConfig,
  primaryLocation,
  primaryShift,
  checkedInWorkersCount,
  totalAssignedWorkersCount,
}: {
  statusConfig: { label: string; cls: string; dot: string; sub: string };
  primaryLocation: string;
  primaryShift: any;
  checkedInWorkersCount: number;
  totalAssignedWorkersCount: number;
}) {
  return (
    <div className="flex flex-col justify-between border-t border-slate-200 bg-gradient-to-br from-sky-50/50 to-slate-50/70 p-4 lg:border-l lg:border-t-0 sm:p-5">
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold ${statusConfig.cls}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
            {statusConfig.label}
          </span>
        </div>

        <div className="mt-3.5 space-y-1">
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <TbMapPin className="text-sky-500 text-sm shrink-0" />
            <span className="truncate">{primaryLocation}</span>
          </p>
          {primaryShift && (
            <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <TbClock className="text-slate-400 text-sm shrink-0" />
              <span>
                Start: {formatShiftTime(primaryShift.start_time)} ({primaryShift.estimated_hours}h estimated)
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <TbUsers className="text-slate-400 text-sm" />
          <span>
            {checkedInWorkersCount > 0 ? (
              <strong className="text-emerald-700">{checkedInWorkersCount} On-Site</strong>
            ) : totalAssignedWorkersCount > 0 ? (
              `${totalAssignedWorkersCount} Assigned Specialists`
            ) : (
              "CleanOnes Team"
            )}
          </span>
        </span>
        <span className="text-[10px] text-slate-400 font-semibold inline-flex items-center gap-0.5">
          Schedule
        </span>
      </div>
    </div>
  );
}
