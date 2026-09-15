"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Shift,
  RosterCleaningPlan,
  hoursFromMinutes,
} from "./types";
import { getTranslation } from "@/utils/translations";
import { ShiftDetailsModal } from "./ShiftDetailsModal";

interface MonthViewProps {
  currentDate: Date;
  plans: RosterCleaningPlan[];
  shifts: Shift[];
  totalShifts: number;
  totalPlans: number;
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

export function MonthView({
  currentDate,
  plans,
  shifts,
  totalShifts,
  totalPlans,
}: MonthViewProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const r = getTranslation(locale).roster;
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => new Date(year, month, i + 1, 12));
  }, [currentDate]);

  const todayKey = toDateKey(new Date());
  const monthLabel = currentDate.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-full bg-white text-sm">
      <div className="flex justify-between items-center bg-[#009EE2] text-white px-5 py-4 shrink-0">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-80 mb-0.5">
            {r?.monthlyRoster || "Monthly Roster"} | {monthLabel}
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm font-medium opacity-90">
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalShifts}</strong>
            <span className="text-xs ml-1">{r?.shifts}</span>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalPlans}</strong>
            <span className="text-xs ml-1">{r?.plans || "plans"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <div className="flex border-b border-slate-200 bg-white sticky top-0 z-20">
            <div className="w-52 shrink-0 border-r border-slate-200 p-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 sticky left-0 bg-white z-30">
              {r?.cleaningPlanCol || "Cleaning Plan"}
            </div>
            <div className="flex">
              {days.map((d) => {
                const key = toDateKey(d);
                const isToday = key === todayKey;
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                return (
                  <div
                    key={key}
                    className={`w-[76px] shrink-0 border-r border-slate-100 px-1 py-2.5 text-center ${
                      isWeekend ? "bg-slate-50/80" : "bg-white"
                    }`}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {d.toLocaleDateString(locale, { weekday: "short" })}
                    </p>
                    <p
                      className={`mt-0.5 text-xs font-semibold inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        isToday
                          ? "bg-[#009EE2] text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {d.getDate()}
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
                className="flex border-b border-slate-100 min-h-[72px] hover:bg-sky-50/10"
              >
                <div className="w-52 shrink-0 border-r border-slate-200 px-3 py-3 flex items-start bg-white sticky left-0 z-10">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-sky-100 text-[#009EE2] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {initials(plan.plan_title)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">
                        {plan.plan_title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {plan.total_shifts_in_range} {r?.shifts}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {days.map((d) => {
                    const key = toDateKey(d);
                    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                    const dayShifts = shifts.filter(
                      (s) => s.planId === plan.plan_id && s.date === key
                    );
                    return (
                      <div
                        key={key}
                        className={`w-[76px] shrink-0 border-r border-slate-100 p-1 ${
                          isWeekend ? "bg-slate-50/50" : ""
                        }`}
                      >
                        {dayShifts.map((shift) => (
                          <button
                            type="button"
                            key={shift.id}
                            onClick={() => setSelectedShift(shift)}
                            className="w-full rounded border border-sky-200 bg-sky-50 px-1 py-1 text-left hover:bg-sky-100 transition-colors mb-1"
                          >
                            <p className="text-[10px] font-bold text-slate-800 leading-tight truncate">
                              {shift.startTime}
                            </p>
                            <p className="text-[9px] text-slate-500">
                              {hoursFromMinutes(shift.durationMinutes || 0)}h
                            </p>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-500 shrink-0">
        <span>{r?.monthFooter || "Horizontal monthly staffing overview"}</span>
        <span>{r?.weekendHint || "Weekends are lightly highlighted."}</span>
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
