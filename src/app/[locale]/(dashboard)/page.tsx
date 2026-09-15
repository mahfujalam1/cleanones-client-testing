"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Progress, Segmented, Tag } from "antd";
import {
  TbArrowUpRight,
  TbCalendar,
  TbClock,
  TbMessageCircle,
  TbPlus,
  TbUsers,
  TbClipboardList,
  TbMapPin,
  TbDoor,
  TbCheck,
  TbChecklist,
  TbSparkles,
  TbBuilding,
  TbUserCheck,
  TbHourglass,
} from "react-icons/tb";
import {
  useGetClientActiveProgressQuery,
  useGetClientShiftStatsQuery,
  useGetClientTotalsQuery,
  type ActiveProgressData,
  type ShiftStatsData,
  type ClientTotalsData,
} from "@/services/actions/client";
import { useGetMyProfileQuery } from "@/redux/apis/profile";
import { useAppSelector } from "@/redux/hooks";
import { getTranslation } from "@/utils/translations";

function formatHours(hours: number = 0): string {
  if (!hours || isNaN(hours) || hours <= 0) return "0h";
  const whole = Math.floor(hours);
  const mins = Math.round((hours - whole) * 60);
  if (whole > 0 && mins > 0) return `${whole}h ${mins}m`;
  if (whole > 0) return `${whole}h`;
  return `${mins}m`;
}

function formatShiftTime(isoString?: string | null): string {
  if (!isoString) return "—";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDateRange(fromStr?: string, toStr?: string, locale = "en"): string {
  if (!fromStr || !toStr) return "";
  const from = new Date(fromStr);
  const to = new Date(toStr);
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return "";
  const f = from.toLocaleDateString(locale, { month: "short", day: "numeric" });
  const t = to.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });
  return `${f} – ${t}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const { locale = "en" } = useParams<{ locale: string }>();
  const t = getTranslation(locale);
  const [view, setView] = useState<"hours" | "rooms" | "tasks">("hours");
  const [statsRange, setStatsRange] = useState<"today" | "this_week" | "this_month">("this_week");

  // 1. Live Active Progress (Today Only)
  const {
    data: activeProgressRes,
    isLoading: isActiveLoading,
  } = useGetClientActiveProgressQuery(undefined, {
    pollingInterval: 30000,
  });

  // 2. Historical Shift Stats
  const { data: shiftStatsRes, isLoading: isStatsLoading } = useGetClientShiftStatsQuery({
    range: statsRange,
  });

  // 3. Static All-Time Inventory Totals
  const { data: totalsRes, isLoading: isTotalsLoading } = useGetClientTotalsQuery();

  // Profile / Greeting info
  const { data: profileRes } = useGetMyProfileQuery();
  const currentUser = useAppSelector((state) => state.auth.user);

  const go = (path: string) => router.push(`/${locale}${path}`);

  if ((isActiveLoading && !activeProgressRes) && (isStatsLoading && !shiftStatsRes) && (isTotalsLoading && !totalsRes)) {
    return <DashboardSkeleton />;
  }

  const activeData: ActiveProgressData = activeProgressRes?.data || {
    date: new Date().toISOString().split("T")[0],
    status: "no_service",
    summary: {
      total_estimated_hours: 0,
      total_worked_hours: 0,
      total_rooms: 0,
      completed_rooms: 0,
      total_tasks: 0,
      completed_tasks: 0,
      progress_percentage: 0,
    },
    shifts: [],
  };

  const shiftStats: ShiftStatsData = shiftStatsRes?.data || {
    range: statsRange,
    date_from: "",
    date_to: "",
    total_shifts: 0,
    total_completed_shifts: 0,
    total_pending_shifts: 0,
    total_cancelled_shifts: 0,
    completion_rate: 0,
  };

  const totals: ClientTotalsData = totalsRes?.data || {
    total_cleaning_plans: 0,
    total_locations: 0,
    total_rooms: 0,
    total_tasks: 0,
  };

  const greetingName = currentUser?.name || profileRes?.data?.name || "Client";
  const currentDateStr = new Date().toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { summary, shifts, status: todayStatus } = activeData;
  const progressPct = Math.min(100, Math.max(0, summary.progress_percentage || 0));

  // Determine status display for today
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: "Cleaning In Progress",
          cls: "bg-emerald-100 text-emerald-800 border-emerald-300",
          dot: "bg-emerald-500 animate-pulse",
          sub: "Specialists are currently servicing your site.",
        };
      case "scheduled":
        return {
          label: "Scheduled Today",
          cls: "bg-sky-100 text-sky-800 border-sky-300",
          dot: "bg-sky-500",
          sub: "Cleaning shifts are queued for service today.",
        };
      case "completed":
        return {
          label: "Service Completed",
          cls: "bg-indigo-100 text-indigo-800 border-indigo-300",
          dot: "bg-indigo-500",
          sub: "All designated service shifts for today have finished.",
        };
      case "no_service":
      default:
        return {
          label: t.dashboard.noServiceToday || "No Service Today",
          cls: "bg-slate-100 text-slate-700 border-slate-300",
          dot: "bg-slate-400",
          sub: "No cleaning shifts scheduled for today.",
        };
    }
  };

  const statusConfig = getStatusBadge(todayStatus);
  const primaryShift = shifts?.[0];
  const primaryLocation = primaryShift?.location_name || "Designated Location";

  // Count active on-site workers right now
  const checkedInWorkersCount = shifts.reduce((acc, shift) => {
    return acc + (shift.workers?.filter((w) => w.is_checked_in).length || 0);
  }, 0);

  const totalAssignedWorkersCount = shifts.reduce((acc, shift) => {
    return acc + (shift.workers?.length || 0);
  }, 0);

  return (
    <div className="space-y-4 text-xs text-slate-700">
      {/* 1. Header with greeting and primary action */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-base font-semibold text-slate-900">
            {t.dashboard.welcomeTitle}, {greetingName}
          </h1>
          <p className="mt-1 text-xs text-slate-500">{currentDateStr}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="default"
            size="middle"
            icon={<TbMessageCircle />}
            onClick={() => go("/chat")}
            className="text-xs font-medium"
          >
            {t.dashboard.chatCleanOnes}
          </Button>
        </div>
      </header>

      {/* 2. Today's Live Active Progress Overview */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="grid lg:grid-cols-[1.35fr_.65fr]">
          {/* Left Progress Column */}
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
                        / {formatHours(summary.total_estimated_hours)} {t.dashboard.hours}
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

          {/* Right Status Panel */}
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
        </div>
      </section>



      {/* 4. Shift Execution & History Stats (GET /client/shift-stats) */}
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
          {/* Completion Rate Card */}
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

          {/* Total Shifts */}
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

          {/* Completed Shifts */}
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

          {/* Pending Shifts */}
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

      {/* 5. Service Scope & Inventory Overview (GET /client/totals) */}
      <section className="space-y-2.5">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {t.dashboard.scopeOverview || "Service Scope & Inventory"}
          </h3>
          <p className="text-[11px] text-slate-400">
            {t.dashboard.scopeOverviewDesc || "Total facilities, rooms, and tasks configured under your service plan"}
          </p>
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          <MetricCard
            icon={<TbClipboardList />}
            label={t.dashboard.cleaningPlans || "Cleaning Plans"}
            value={totals.total_cleaning_plans || 0}
            pillText={(t.dashboard.plansCount || "{count} Plans").replace(
              "{count}",
              String(totals.total_cleaning_plans || 0)
            )}
            pillColor="indigo"
            footerText={t.dashboard.cleaningPlansSub || "Active service plans"}
          />
          <MetricCard
            icon={<TbMapPin />}
            label={t.dashboard.managedLocations || "Locations"}
            value={totals.total_locations || 0}
            pillText={(t.dashboard.sitesCount || "{count} Sites").replace(
              "{count}",
              String(totals.total_locations || 0)
            )}
            pillColor="sky"
            footerText={t.dashboard.managedLocationsSub || "Active facility sites"}
          />
          <MetricCard
            icon={<TbDoor />}
            label={t.dashboard.totalRoomsScope || "Total Rooms"}
            value={totals.total_rooms || 0}
            pillText={t.dashboard.scopePill || "Scope"}
            pillColor="violet"
            footerText={t.dashboard.totalRoomsScopeSub || "Designated rooms"}
          />
          <MetricCard
            icon={<TbChecklist />}
            label={t.dashboard.totalTasksScope || "Total Tasks"}
            value={totals.total_tasks || 0}
            pillText={t.dashboard.checklistPill || "Checklist"}
            pillColor="slate"
            footerText={t.dashboard.totalTasksScopeSub || "Scheduled checklist tasks"}
          />
        </div>
      </section>
      {/* 3. Today's Shifts & On-Site Specialists Detail (When shifts exist) */}
      {shifts.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Today&apos;s Shifts &amp; Specialists ({shifts.length})
            </h3>
            <span className="text-[11px] text-slate-400">
              {todayStatus === "active" ? "Updates live every 30s" : "Scheduled for today"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {shifts.map((shift) => {
              const shiftBadge =
                shift.status === "in_progress"
                  ? { text: "In Progress", color: "processing" as const }
                  : shift.status === "completed"
                    ? { text: "Completed", color: "success" as const }
                    : shift.status === "cancelled"
                      ? { text: "Cancelled", color: "default" as const }
                      : { text: "Upcoming", color: "warning" as const };

              return (
                <div
                  key={shift.shift_id}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <b className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <TbBuilding className="text-sky-500 shrink-0" />
                        {shift.location_name}
                      </b>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <TbClock className="text-xs" /> Starts {formatShiftTime(shift.start_time)} ·{" "}
                        {shift.estimated_hours}h estimated
                      </p>
                    </div>
                    <Tag color={shiftBadge.color} className="!m-0 !text-[10px] !px-2 !py-0.5">
                      {shiftBadge.text}
                    </Tag>
                  </div>

                  {/* Rooms & Tasks progress for shift */}
                  <div className="grid grid-cols-2 gap-2 my-2.5 text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <div>
                      <span className="text-slate-400 block">Rooms Serviced</span>
                      <b className="text-slate-800 text-xs">
                        {shift.rooms.completed} / {shift.rooms.total}
                      </b>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Tasks Completed</span>
                      <b className="text-slate-800 text-xs">
                        {shift.tasks.completed} / {shift.tasks.total}
                      </b>
                    </div>
                  </div>

                  {/* Workers List */}
                  {shift.workers && shift.workers.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        Specialists On Duty ({shift.workers.length})
                      </p>
                      <div className="space-y-1">
                        {shift.workers.map((worker) => (
                          <div
                            key={worker.worker_id}
                            className="flex items-center justify-between text-xs rounded-md bg-white border border-slate-100 px-2.5 py-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full shrink-0 ${worker.is_checked_in ? "bg-emerald-500 ring-2 ring-emerald-100" : "bg-slate-300"
                                  }`}
                                title={worker.is_checked_in ? "Checked In" : "Not checked in"}
                              />
                              <span className="font-medium text-slate-700">{worker.name}</span>
                              <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] text-slate-500 font-normal">
                                {worker.role}
                              </span>
                            </div>
                            <div className="text-right text-[10px]">
                              {worker.is_checked_in ? (
                                <span className="font-semibold text-emerald-600">
                                  {formatHours(worker.worked_hours)} logged
                                </span>
                              ) : (
                                <span className="text-slate-400">Awaiting Check-in</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      {/* 6. Quick Action Links */}
      <div className="grid gap-3 sm:grid-cols-3 pt-1">
        <Action onClick={() => go("/services")} icon={<TbPlus />} title={t.dashboard.extraServiceReq} />
        <Action onClick={() => go("/schedule")} icon={<TbCalendar />} title={t.dashboard.viewSchedule} />
        <Action onClick={() => go("/chat")} icon={<TbMessageCircle />} title={t.dashboard.contactSupport} />
      </div>
    </div>
  );
}

type MetricPillColor = "indigo" | "sky" | "violet" | "slate" | "emerald" | "teal" | "blue";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  pillText?: string;
  pillColor?: MetricPillColor;
  footerText: string;
  progressPercent?: number;
  progressBarColor?: string;
  onClick?: () => void;
}

const colorStyles: Record<
  MetricPillColor,
  { pill: string; iconBg: string; dot: string; hoverBorder: string }
> = {
  indigo: {
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
    iconBg: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    dot: "bg-indigo-500",
    hoverBorder: "hover:border-indigo-300",
  },
  sky: {
    pill: "bg-sky-50 text-sky-700 border-sky-200/70",
    iconBg: "bg-sky-50 text-sky-600 ring-sky-100",
    dot: "bg-sky-500",
    hoverBorder: "hover:border-sky-300",
  },
  violet: {
    pill: "bg-violet-50 text-violet-700 border-violet-200/70",
    iconBg: "bg-violet-50 text-violet-600 ring-violet-100",
    dot: "bg-violet-500",
    hoverBorder: "hover:border-violet-300",
  },
  slate: {
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    iconBg: "bg-slate-100 text-slate-600 ring-slate-200/80",
    dot: "bg-slate-500",
    hoverBorder: "hover:border-slate-300",
  },
  emerald: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    dot: "bg-emerald-500",
    hoverBorder: "hover:border-emerald-300",
  },
  teal: {
    pill: "bg-teal-50 text-teal-700 border-teal-200/70",
    iconBg: "bg-teal-50 text-teal-600 ring-teal-100",
    dot: "bg-teal-500",
    hoverBorder: "hover:border-teal-300",
  },
  blue: {
    pill: "bg-blue-50 text-blue-700 border-blue-200/70",
    iconBg: "bg-blue-50 text-blue-600 ring-blue-100",
    dot: "bg-blue-500",
    hoverBorder: "hover:border-blue-300",
  },
};

const MetricCard = ({
  icon,
  label,
  value,
  subValue,
  pillText,
  pillColor = "sky",
  footerText,
  progressPercent,
  progressBarColor = "#10b981",
  onClick,
}: MetricCardProps) => {
  const theme = colorStyles[pillColor] || colorStyles.sky;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 ${onClick ? `cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${theme.hoverBorder}` : "cursor-default"
        }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {pillText ? (
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${theme.pill}`}
            >
              {pillText}
            </span>
          ) : (
            <span />
          )}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base shadow-inner ring-1 transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}
          >
            {icon}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-slate-600">
            {label}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
              {value}
            </span>
            {subValue && (
              <span className="text-xs font-semibold text-slate-400">
                {subValue}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-100 pt-2.5">
        {typeof progressPercent === "number" && (
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(100, Math.max(0, progressPercent))}%`,
                backgroundColor: progressBarColor,
              }}
            />
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`} />
            <span className="truncate">{footerText}</span>
          </div>
          {onClick && (
            <TbArrowUpRight className="shrink-0 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-slate-600 group-hover:translate-x-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};

const Action = ({ onClick, icon, title }: { onClick: () => void; icon: React.ReactNode; title: string }) => (
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

const DashboardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 w-48 rounded bg-slate-200" />
    <div className="h-44 rounded-xl border border-slate-200 bg-slate-100" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
  </div>
);
