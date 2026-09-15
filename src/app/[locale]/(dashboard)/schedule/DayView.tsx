"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MdNightlight } from "react-icons/md";
import {
  Shift,
  RosterCleaningPlan,
  localMinutesOfDay,
  isOvernightShift,
} from "./types";
import { getTranslation } from "@/utils/translations";
import { ShiftDetailsModal } from "./ShiftDetailsModal";

interface DayViewProps {
  currentDate: Date;
  plans: RosterCleaningPlan[];
  shifts: Shift[];
  totalShifts: number;
  totalHours: number;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES_IN_DAY = 24 * 60;

function initials(label: string) {
  return label
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DayView({
  currentDate,
  plans,
  shifts,
  totalShifts,
  totalHours,
}: DayViewProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const r = getTranslation(locale).roster;
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const isToday = currentDate.toDateString() === new Date().toDateString();
  const now = new Date();
  const nowPercent = ((now.getHours() * 60 + now.getMinutes()) / MINUTES_IN_DAY) * 100;

  const dateKey = (() => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  })();

  return (
    <div className="flex flex-col h-full bg-white text-sm">
      <div className="flex justify-between items-center bg-[#009EE2] text-white px-5 py-4 shrink-0">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-80 mb-0.5">
            {r?.dailyRoster}
          </p>
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleDateString(locale, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
        <div className="flex items-center gap-5 text-sm font-medium opacity-90">
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalShifts}</strong>
            <span className="text-xs ml-1">{r?.shifts}</span>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div className="text-right">
            <strong className="text-2xl font-bold">{totalHours.toFixed(1)}h</strong>
            <span className="text-xs ml-1">{r?.durationLabel || "duration"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex flex-col">
        <div className="min-w-[1400px] flex flex-col min-h-full flex-1">
          <div className="flex border-b border-slate-200 bg-white sticky top-0 z-20 shrink-0">
            <div className="w-52 shrink-0 border-r border-slate-200 p-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white">
              {r?.cleaningPlanCol || "Cleaning Plan"}
            </div>
            <div className="flex flex-1">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="flex-1 px-1 py-3 text-[10px] font-medium text-slate-400 border-r border-slate-100 last:border-r-0 select-none"
                  style={{ minWidth: "52px" }}
                >
                  {new Date(2000, 0, 1, h).toLocaleTimeString(locale, {
                    hour: "numeric",
                    hour12: true,
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex-1 relative flex flex-col min-h-[350px]"
            style={{
              backgroundImage: "linear-gradient(to bottom, transparent 55px, #f1f5f9 56px)",
              backgroundSize: "100% 56px",
            }}
          >
            <div className="absolute inset-0 flex pointer-events-none z-0">
              <div className="w-52 shrink-0 border-r border-slate-200" />
              <div className="flex flex-1 relative">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="flex-1 border-r border-slate-100 last:border-r-0"
                    style={{ minWidth: "52px" }}
                  />
                ))}
                {isToday && (
                  <div
                    className="absolute top-0 bottom-0 w-px bg-red-500 z-10 pointer-events-none"
                    style={{ left: `${nowPercent}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 -ml-[3.5px] -mt-1" />
                  </div>
                )}
              </div>
            </div>

            {plans.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-400 py-16 relative z-10">
                {r?.noPlansScheduled || r?.noTeamScheduled}
              </div>
            ) : (
              <div className="relative z-10 flex flex-col">
                {plans.map((plan) => {
                  const planShifts = shifts.filter(
                    (s) => s.planId === plan.plan_id && s.date === dateKey
                  );
                  return (
                    <div
                      key={plan.plan_id}
                      className="flex h-14 border-b border-slate-100 group hover:bg-sky-50/20 transition-colors"
                    >
                      <div className="w-52 shrink-0 border-r border-slate-200 px-3 flex items-center bg-white/90 group-hover:bg-sky-50/60 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-8 w-8 rounded-full bg-sky-100 text-[#009EE2] flex items-center justify-center text-[10px] font-bold shrink-0">
                            {initials(plan.plan_title)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-700 truncate">
                              {plan.plan_title}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {plan.total_shifts_in_range}{" "}
                              {plan.total_shifts_in_range === 1
                                ? r?.shiftToday || "shift today"
                                : r?.shiftsToday || "shifts today"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 relative h-full">
                        {planShifts.map((shift) => {
                          const startMin = localMinutesOfDay(shift.startAt);
                          const overnight = isOvernightShift(shift.startAt, shift.endAt);
                          const endMin = overnight
                            ? MINUTES_IN_DAY
                            : localMinutesOfDay(shift.endAt);
                          const startFrac = (startMin / MINUTES_IN_DAY) * 100;
                          const widthFrac = Math.max(
                            ((endMin - startMin) / MINUTES_IN_DAY) * 100,
                            1.5
                          );

                          return (
                            <button
                              type="button"
                              key={shift.id}
                              onClick={() => setSelectedShift(shift)}
                              className="absolute top-2 bottom-2 rounded-md flex items-center gap-1.5 px-2.5 overflow-hidden cursor-pointer shadow-sm hover:brightness-95 hover:ring-2 hover:ring-white/80 active:scale-[0.99] transition-all z-10 text-left border-none focus-visible:outline-none"
                              style={{
                                left: `${startFrac}%`,
                                width: `${widthFrac}%`,
                                backgroundColor: "#009EE2",
                              }}
                              title={`${shift.startTime} → ${shift.endTime}`}
                            >
                              <span className="text-[11px] font-bold text-white truncate pointer-events-none select-none">
                                {shift.startTime}
                              </span>
                              <span className="text-[11px] text-white/80 pointer-events-none select-none">
                                →
                              </span>
                              <span className="text-[11px] font-bold text-white truncate pointer-events-none select-none inline-flex items-center gap-0.5">
                                {shift.endTime}
                                {overnight && (
                                  <MdNightlight className="text-[10px] opacity-90" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-slate-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#009EE2]" />
          {r?.scheduledShift}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-px bg-red-500" />
          {r?.currentTime}
        </div>
        <span className="ml-auto">{r?.scrollHint}</span>
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
