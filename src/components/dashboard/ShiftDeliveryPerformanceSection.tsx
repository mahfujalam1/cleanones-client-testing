import { Segmented } from "antd";
import { TbCalendar, TbCheck, TbHourglass, TbSparkles } from "react-icons/tb";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { formatDateRange } from "@/components/dashboard/dashboardHelpers";

export function ShiftDeliveryPerformanceSection({
  t,
  locale,
  shiftStats,
  statsRange,
  setStatsRange,
}: {
  t: any;
  locale: string;
  shiftStats: any;
  statsRange: "today" | "this_week" | "this_month";
  setStatsRange: (range: "today" | "this_week" | "this_month") => void;
}) {
  return (
    <section className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {t.dashboard.shiftDeliveryPerformance || "Shift Delivery Performance"}
          </h3>
          <p className="text-[11px] text-slate-400">
            {shiftStats.date_from && shiftStats.date_to ? (
              formatDateRange(shiftStats.date_from, shiftStats.date_to, locale)
            ) : (
              t.dashboard.shiftDeliveryDesc ||
              "Overview of scheduled, completed, and pending service shifts"
            )}
          </p>
        </div>
        <Segmented
          value={statsRange}
          options={[
            { value: "today", label: t.schedule.today },
            { value: "this_week", label: t.schedule.thisWeek },
            { value: "this_month", label: t.schedule.thisMonth },
          ]}
          onChange={(val) => setStatsRange(val as "today" | "this_week" | "this_month")}
          size="small"
          className="border border-slate-200 text-xs"
        />
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">

        <MetricCard
          icon={<TbSparkles />}
          label={t.dashboard.completionRate || "Completion Rate"}
          value={`${shiftStats.completion_rate || 0}%`}
          pillText={
            shiftStats.completion_rate >= 80
              ? t.dashboard.optimal || "Optimal"
              : t.dashboard.paced || "Paced"
          }
          pillColor="emerald"
          progressPercent={shiftStats.completion_rate || 0}
          progressBarColor="#10b981"
          footerText={(
            t.dashboard.activeShiftsDone ||
            "{completed} of {active} active shifts done"
          )
            .replace("{completed}", String(shiftStats.total_completed_shifts))
            .replace(
              "{active}",
              String(
                Math.max(
                  0,
                  shiftStats.total_shifts - shiftStats.total_cancelled_shifts
                )
              )
            )}
        />


        <MetricCard
          icon={<TbCalendar />}
          label={t.dashboard.totalShiftsCard || "Total Shifts"}
          value={shiftStats.total_shifts || 0}
          pillText={
            statsRange === "today"
              ? t.schedule.today
              : statsRange === "this_week"
                ? t.schedule.thisWeek
                : t.schedule.thisMonth
          }
          pillColor="indigo"
          footerText={
            t.dashboard.scheduledShiftsInWindow || "Scheduled shifts in window"
          }
        />


        <MetricCard
          icon={<TbCheck />}
          label={t.dashboard.completedShiftsCard || "Completed Shifts"}
          value={shiftStats.total_completed_shifts || 0}
          pillText={t.dashboard.donePill || "Done"}
          pillColor="teal"
          footerText={
            t.dashboard.successfullyDelivered || "Successfully delivered"
          }
        />


        <MetricCard
          icon={<TbHourglass />}
          label={t.dashboard.pendingShiftsCard || "Pending Shifts"}
          value={shiftStats.total_pending_shifts || 0}
          pillText={t.dashboard.inQueue || "In Queue"}
          pillColor="sky"
          footerText={
            t.dashboard.upcomingInProgress || "Upcoming & in progress"
          }
        />
      </div>
    </section>
  );
}
