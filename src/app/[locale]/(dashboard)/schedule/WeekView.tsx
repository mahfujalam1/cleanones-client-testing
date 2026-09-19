"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MdNightlight, MdLocationOn } from "react-icons/md";
import {
  Shift,
  RosterCleaningPlan,
  isOvernightShift,
} from "./types";
import { getTranslation } from "@/utils/translations";
import { ShiftDetailsModal } from "./ShiftDetailsModal";

interface WeekViewProps {
  currentDate: Date;
  plans: RosterCleaningPlan[];
  shifts: Shift[];
  totalShifts: number;
  totalHours: number;
}

function startOfWeekSunday(date: Date): Date {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function initials(label: string) {
  return label
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function WeekView({
  currentDate,
  plans,
  shifts,
  totalShifts,
  totalHours,
}: WeekViewProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const r = getTranslation(locale).roster;
  const t = getTranslation(locale);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const weekDays = useMemo(() => {
    const start = startOfWeekSunday(currentDate);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const todayKey = toDateKey(new Date());
  const rangeLabel = `${weekDays[0].toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  })} – ${weekDays[6].toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  return (
    <div className="flex flex-col h-full bg-white text-sm">
      <div className="flex justify-between items-center bg-[#009EE2] text-white px-5 py-4 shrink-0">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-80 mb-0.5">
            {r?.weeklyRoster || "Weekly Roster"}
          </p>
          <h2 className="text-xl font-bold">{rangeLabel}</h2>
        </div>
        <div className="flex items-center gap-5 text-sm font-medium opacity-90">
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalShifts}</strong>
            <span className="text-xs ml-1">{r?.shifts}</span>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalHours.toFixed(1)}</strong>
            <span className="text-xs ml-1">{r?.scheduledHours || "scheduled hours"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-[1100px]">
          <div className="flex border-b border-slate-200 bg-white sticky top-0 z-20">
            <div className="w-52 shrink-0 border-r border-slate-200 p-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {r?.cleaningPlanCol || "Cleaning Plan"}
            </div>
            <div className="flex flex-1">
              {weekDays.map((d) => {
                const key = toDateKey(d);
                const isToday = key === todayKey;
                return (
                  <div
                    key={key}
                    className="flex-1 min-w-[120px] border-r border-slate-100 last:border-r-0 px-2 py-3 text-center"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {d.toLocaleDateString(locale, { weekday: "short" })}
                    </p>
                    <p
                      className={`mt-0.5 text-xs font-semibold inline-flex items-center gap-1 ${
                        isToday ? "text-[#009EE2]" : "text-slate-700"
                      }`}
                    >
                      {d.toLocaleDateString(locale, { day: "numeric", month: "short" })}
                      {isToday && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#009EE2]" />
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {plans.length === 0 ? (
            <div className="flex items-center justify-center text-sm text-slate-400 py-16">
              {r?.noPlansScheduled || r?.noTeamScheduled}
            </div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan.plan_id}
                className="flex border-b border-slate-100 min-h-[88px] hover:bg-sky-50/10"
              >
                <div className="w-52 shrink-0 border-r border-slate-200 px-3 py-3 flex items-start bg-white">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-sky-100 text-[#009EE2] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {initials(plan.plan_title)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">
                        {plan.plan_title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {plan.total_shifts_in_range}{" "}
                        {r?.shiftsThisWeek || "shifts this week"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1">
                  {weekDays.map((d) => {
                    const key = toDateKey(d);
                    const dayShifts = shifts.filter(
                      (s) => s.planId === plan.plan_id && s.date === key
                    );
                    return (
                      <div
                        key={key}
                        className="flex-1 min-w-[120px] border-r border-slate-100 last:border-r-0 p-1.5 space-y-1.5"
                      >
                        {dayShifts.length === 0 ? (
                          <p className="text-[11px] text-slate-300 px-1 py-2">
                            {r?.available || t.dashboard?.noServiceToday || "Available"}
                          </p>
                        ) : (
                          dayShifts.map((shift) => {
                            const isUnstaffed = Boolean(
                              shift.isVirtual || shift.status === "unstaffed" || !shift.startAt
                            );

                            if (isUnstaffed) {
                              return (
                                <button
                                  type="button"
                                  key={shift.id}
                                  onClick={() => setSelectedShift(shift)}
                                  className="w-full rounded-md border border-dashed border-amber-300 bg-amber-50/90 px-2 py-1.5 text-left hover:bg-amber-100/80 transition-colors"
                                  title="Not yet staffed — Schedule & specialists pending"
                                >
                                  <div className="flex items-center gap-1">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                    <p className="text-[11px] font-bold text-amber-900 truncate">
                                      {r?.projected || "Not yet staffed"}
                                    </p>
                                  </div>
                                  <p className="text-[10px] text-amber-700/80 mt-0.5">
                                    Time &amp; crew pending
                                  </p>
                                  <p className="mt-1 text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                                    <MdLocationOn className="text-amber-600 shrink-0" />
                                    {shift.location}
                                  </p>
                                </button>
                              );
                            }

                            const overnight = isOvernightShift(shift.startAt, shift.endAt);
                            return (
                              <button
                                type="button"
                                key={shift.id}
                                onClick={() => setSelectedShift(shift)}
                                className="w-full rounded-md border border-sky-200 bg-sky-50/80 px-2 py-1.5 text-left hover:bg-sky-100/80 transition-colors"
                              >
                                <p className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                  {shift.startTime}
                                  {overnight && (
                                    <MdNightlight className="text-[10px] text-slate-400" />
                                  )}
                                </p>
                                <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                                  {shift.endTime}
                                </p>
                                <p className="mt-1 text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                                  <MdLocationOn className="text-[#009EE2] shrink-0" />
                                  {shift.location}
                                </p>
                              </button>
                            );
                          })
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center border-t border-slate-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-500 shrink-0">
        <span className="ml-auto">
          {r?.weekScrollHint || "Scroll horizontally to compare the full working week."}
        </span>
      </div>

      <ShiftDetailsModal
        shift={selectedShift}
        locale={locale}
        r={r}
        onClose={() => setSelectedShift(null)}
      />
    </div>
  );
}
