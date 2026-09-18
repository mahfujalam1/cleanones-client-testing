import { ActiveProgressPanel } from "@/components/dashboard/ActiveProgressPanel";
import { TodayStatusPanel } from "@/components/dashboard/TodayStatusPanel";

export function ActiveProgressCard({
  t,
  view,
  setView,
  summary,
  todayStatus,
  progressPct,
  statusConfig,
  primaryLocation,
  primaryShift,
  checkedInWorkersCount,
  totalAssignedWorkersCount,
}: {
  t: any;
  view: "hours" | "rooms" | "tasks";
  setView: (view: "hours" | "rooms" | "tasks") => void;
  summary: any;
  todayStatus: string;
  progressPct: number;
  statusConfig: { label: string; cls: string; dot: string; sub: string };
  primaryLocation: string;
  primaryShift: any;
  checkedInWorkersCount: number;
  totalAssignedWorkersCount: number;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className="grid lg:grid-cols-[1.35fr_.65fr]">
        <ActiveProgressPanel t={t} view={view} setView={setView} summary={summary} todayStatus={todayStatus} progressPct={progressPct} />

        <TodayStatusPanel
          statusConfig={statusConfig}
          primaryLocation={primaryLocation}
          primaryShift={primaryShift}
          checkedInWorkersCount={checkedInWorkersCount}
          totalAssignedWorkersCount={totalAssignedWorkersCount}
        />
      </div>
    </section>
  );
}
