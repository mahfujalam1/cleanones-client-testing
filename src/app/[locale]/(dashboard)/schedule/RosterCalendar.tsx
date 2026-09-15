"use client";

import React, { useMemo, useState } from "react";
import {
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
  MdCheckCircle,
} from "react-icons/md";
import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import {
  ClientRosterData,
  RosterView,
  mapRosterToShifts,
  sumPlanHours,
} from "./types";
import { getTranslation } from "@/utils/translations";
import { useParams } from "next/navigation";
import { useGetClientRosterQuery } from "@/services/actions/client";

function toLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfWeekSunday(date: Date): Date {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function RosterCalendar() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = getTranslation(locale);
  const r = t.roster;

  const [view, setView] = useState<RosterView>("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [page, setPage] = useState(1);

  const dateQueryStr = toLocalDateKey(currentDate);
  const queryArgs = useMemo(() => {
    if (view === "month") {
      return {
        view: "month" as const,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        page,
        limit: 10,
      };
    }
    return {
      view,
      date: dateQueryStr,
      page,
      limit: 10,
    };
  }, [view, dateQueryStr, currentDate, page]);

  const { data: rosterRes, isFetching, isError } = useGetClientRosterQuery(queryArgs);
  const rosterData = (rosterRes?.data ?? null) as ClientRosterData | null;

  const plans = useMemo(
    () => (Array.isArray(rosterData?.cleaning_plans) ? rosterData!.cleaning_plans : []),
    [rosterData]
  );
  const shifts = useMemo(() => mapRosterToShifts(plans), [plans]);
  const totalShifts = rosterData?.meta?.total_shifts ?? shifts.length;
  const totalHours = useMemo(() => sumPlanHours(plans), [plans]);
  const totalPlans = rosterData?.meta?.total ?? plans.length;
  const totalPage = rosterData?.meta?.totalPage ?? 1;

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
    setPage(1);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
    setPage(1);
  };

  const dateLabel = useMemo(() => {
    if (view === "day") {
      return currentDate.toLocaleDateString(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    if (view === "week") {
      const start = startOfWeekSunday(currentDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
      })} - ${end.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }
    return currentDate.toLocaleDateString(locale, { month: "long", year: "numeric" });
  }, [view, currentDate, locale]);

  const viewButtons: { id: RosterView; label: string }[] = [
    { id: "day", label: r?.dayView || "Day View" },
    { id: "week", label: r?.weekView || "Week View" },
    { id: "month", label: r?.monthView || "Month View" },
  ];

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-sky-200 bg-sky-50 text-[#009EE2]">
            <MdCalendarToday className="text-base" />
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {r?.shiftRoster || r?.title || "Shift Roster"}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-emerald-500 text-sm" />
              {t.dashboard?.allShiftsOnSchedule}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            {t.dashboard?.onTime || "On time"}
          </span>

          <div className="flex items-center gap-1.5">
            <div className="flex overflow-hidden rounded border border-slate-300 bg-white">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center border-r border-slate-300 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                <MdChevronLeft className="text-lg" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                <MdChevronRight className="text-lg" />
              </button>
            </div>

            <span className="min-w-[11rem] text-sm font-semibold text-slate-800 px-1">
              {dateLabel}
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-[#009EE2] transition-colors hover:bg-sky-50"
              >
                <MdCalendarToday className="text-base" />
              </button>
              <div className="absolute right-0 top-0 opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                <DatePicker
                  value={dayjs(currentDate)}
                  open={pickerOpen}
                  onOpenChange={setPickerOpen}
                  picker={view === "month" ? "month" : "date"}
                  onChange={(date) => {
                    if (date) setCurrentDate(date.toDate());
                    setPickerOpen(false);
                    setPage(1);
                  }}
                  allowClear={false}
                  inputReadOnly
                  getPopupContainer={(trigger) =>
                    trigger.parentElement?.parentElement ?? document.body
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex overflow-hidden rounded border border-slate-300 bg-white">
            {viewButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  setView(btn.id);
                  setPage(1);
                }}
                className={`h-8 px-3 text-xs font-semibold transition-colors border-r border-slate-300 last:border-r-0 ${
                  view === btn.id
                    ? "bg-[#009EE2] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 shadow-sm">
            <strong className="font-semibold text-slate-700">{totalShifts}</strong>{" "}
            {t.shiftMonitoring?.shiftsCount || "shifts"}
          </span>
          <span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 shadow-sm">
            <strong className="font-semibold text-slate-700">{totalHours.toFixed(1)}h</strong>{" "}
            {r?.duration || "Duration"}
          </span>
          <span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 shadow-sm">
            <strong className="font-semibold text-slate-700">{totalPlans}</strong>{" "}
            {r?.plans || "plans"}
          </span>
        </div>
      </div>

      <div className="min-h-[600px] flex-1 overflow-hidden rounded border border-slate-200 bg-white relative">
        {isFetching && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/50">
            <Spin />
          </div>
        )}
        {isError ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            {r?.loadError || "Could not load roster. Please try again."}
          </div>
        ) : view === "week" ? (
          <WeekView
            currentDate={currentDate}
            plans={plans}
            shifts={shifts}
            totalShifts={totalShifts}
            totalHours={totalHours}
          />
        ) : view === "month" ? (
          <MonthView
            currentDate={currentDate}
            plans={plans}
            shifts={shifts}
            totalShifts={totalShifts}
            totalPlans={plans.length}
          />
        ) : (
          <DayView
            currentDate={currentDate}
            plans={plans}
            shifts={shifts}
            totalShifts={totalShifts}
            totalHours={totalHours}
          />
        )}
      </div>

      {totalPage > 1 && (
        <div className="flex items-center justify-end gap-2 text-xs text-slate-600">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded border border-slate-300 bg-white px-2.5 py-1 disabled:opacity-40"
          >
            {r?.prev || "Previous"}
          </button>
          <span>
            {page} / {totalPage}
          </span>
          <button
            type="button"
            disabled={page >= totalPage}
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            className="rounded border border-slate-300 bg-white px-2.5 py-1 disabled:opacity-40"
          >
            {r?.next || "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
