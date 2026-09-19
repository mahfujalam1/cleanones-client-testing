import { Progress, Segmented } from "antd";
import { formatHours } from "@/components/dashboard/dashboardHelpers";

export function ActiveProgressPanel({
  t,
  view,
  setView,
  summary,
  todayStatus,
  progressPct,
}: {
  t: any;
  view: "hours" | "rooms" | "tasks";
  setView: (view: "hours" | "rooms" | "tasks") => void;
  summary: any;
  todayStatus: string;
  progressPct: number;
}) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500">
              {t.dashboard.activeCleaning || "Today's Cleaning Progress"}
            </p>
            {todayStatus === "active" && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900">
            {view === "hours" && (
              <>
                {formatHours(summary.total_worked_hours)}{" "}
                <span className="text-slate-400 font-medium text-base">
                  / {formatHours(summary.total_estimated_hours)}
                </span>
              </>
            )}
            {view === "rooms" && (
              <>
                {summary.completed_rooms}{" "}
                <span className="text-slate-400 font-medium text-base">
                  / {summary.total_rooms} {t.dashboard.rooms}
                </span>
              </>
            )}
            {view === "tasks" && (
              <>
                {summary.completed_tasks}{" "}
                <span className="text-slate-400 font-medium text-base">
                  / {summary.total_tasks} Tasks
                </span>
              </>
            )}
          </h2>
        </div>
        <Segmented
          value={view}
          options={[
            { value: "hours", label: t.dashboard.hours },
            { value: "rooms", label: t.dashboard.rooms },
            { value: "tasks", label: "Tasks" },
          ]}
          onChange={(value) => setView(value as "hours" | "rooms" | "tasks")}
          size="small"
          className="border border-slate-200 text-xs"
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center text-[11px] font-medium mb-1.5">
          <span className="text-slate-600">Completion Status</span>
          <span className="text-emerald-700 font-semibold">{progressPct}%</span>
        </div>
        <Progress
          percent={progressPct}
          showInfo={false}
          strokeColor="#10b981"
          railColor="#f1f5f9"
          size="small"
          className="!m-0"
        />
      </div>

      <div className="mt-3 flex flex-wrap justify-between gap-3 text-[10px] text-slate-500 border-t border-slate-100 pt-2.5">
        <span>
          {view === "hours" && (
            <>
              <b className="text-slate-700">{formatHours(summary.total_worked_hours)}</b> {t.dashboard.completed}
            </>
          )}
          {view === "rooms" && (
            <>
              <b className="text-slate-700">{summary.completed_rooms}</b> {t.dashboard.rooms} {t.dashboard.completed}
            </>
          )}
          {view === "tasks" && (
            <>
              <b className="text-slate-700">{summary.completed_tasks}</b> tasks completed
            </>
          )}
        </span>
        <span className="text-right">
          {view === "hours" && (
            <>
              <b className="text-slate-700">
                {formatHours(Math.max(0, summary.total_estimated_hours - summary.total_worked_hours))}
              </b>{" "}
              {t.dashboard.remaining}
            </>
          )}
          {view === "rooms" && (
            <>
              <b className="text-slate-700">{Math.max(0, summary.total_rooms - summary.completed_rooms)}</b>{" "}
              {t.dashboard.rooms} {t.dashboard.pending}
            </>
          )}
          {view === "tasks" && (
            <>
              <b className="text-slate-700">{Math.max(0, summary.total_tasks - summary.completed_tasks)}</b> tasks remaining
            </>
          )}
        </span>
      </div>
    </div>
  );
}
