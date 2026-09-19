"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { getStatusBadge } from "@/components/dashboard/dashboardHelpers";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ActiveProgressCard } from "@/components/dashboard/ActiveProgressCard";
import { ShiftDeliveryPerformanceSection } from "@/components/dashboard/ShiftDeliveryPerformanceSection";
import { ServiceScopeSection } from "@/components/dashboard/ServiceScopeSection";
import { TodayShiftsSection } from "@/components/dashboard/TodayShiftsSection";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";

export default function DashboardPage() {
  const router = useRouter();
  const { locale = "en" } = useParams<{ locale: string }>();
  const t = getTranslation(locale);
  const [view, setView] = useState<"hours" | "rooms" | "tasks">("hours");
  const [statsRange, setStatsRange] = useState<"today" | "this_week" | "this_month">("this_week");


  const {
    data: activeProgressRes,
    isLoading: isActiveLoading,
  } = useGetClientActiveProgressQuery(undefined, {
    pollingInterval: 30000,
  });


  const { data: shiftStatsRes, isLoading: isStatsLoading } = useGetClientShiftStatsQuery({
    range: statsRange,
  });


  const { data: totalsRes, isLoading: isTotalsLoading } = useGetClientTotalsQuery();


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

  const statusConfig = getStatusBadge(todayStatus, t);
  const primaryShift = shifts?.[0];
  const primaryLocation = primaryShift?.location_name || "Designated Location";


  const checkedInWorkersCount = shifts.reduce((acc, shift) => {
    return acc + (shift.workers?.filter((w) => w.is_checked_in).length || 0);
  }, 0);

  const totalAssignedWorkersCount = shifts.reduce((acc, shift) => {
    return acc + (shift.workers?.length || 0);
  }, 0);

  return (
    <div className="space-y-4 text-xs text-slate-700">

      <DashboardHeader
        greetingName={greetingName}
        welcomeTitle={t.dashboard.welcomeTitle}
        currentDateStr={currentDateStr}
        chatLabel={t.dashboard.chatCleanOnes}
        onChat={() => go("/chat")}
      />


      <ActiveProgressCard
        t={t}
        view={view}
        setView={setView}
        summary={summary}
        todayStatus={todayStatus}
        progressPct={progressPct}
        statusConfig={statusConfig}
        primaryLocation={primaryLocation}
        primaryShift={primaryShift}
        checkedInWorkersCount={checkedInWorkersCount}
        totalAssignedWorkersCount={totalAssignedWorkersCount}
      />




      <ShiftDeliveryPerformanceSection
        t={t}
        locale={locale}
        shiftStats={shiftStats}
        statsRange={statsRange}
        setStatsRange={setStatsRange}
      />


      <ServiceScopeSection t={t} totals={totals} />

      {shifts.length > 0 && (
        <TodayShiftsSection shifts={shifts} todayStatus={todayStatus} />
      )}

      <DashboardQuickActions
        t={t}
        onExtraService={() => go("/services")}
        onSchedule={() => go("/schedule")}
        onChat={() => go("/chat")}
      />
    </div>
  );
}
