import React from "react";
import { TbCalendar, TbCheck, TbClock, TbMapPin } from "react-icons/tb";
import type { LiveShift } from "@/components/rooms/liveStatusTypes";

export function ShiftMetricsGrid({ shift, t }: { shift: LiveShift; t: any }) {
  const startDate = new Date(shift.date_time);
  const endDate = new Date(startDate.getTime() + shift.duration_minutes * 60 * 1000);

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={<TbMapPin />}
        label={t.liveStatus.location}
        value={shift.location?.name || "—"}
        sub={`${shift.completed_room} / ${shift.total_room} ${t.liveStatus.roomsDone}`}
      />
      <MetricCard
        icon={<TbClock />}
        label={t.liveStatus.shiftTime}
        value={`${fmtTime(startDate)} – ${fmtTime(endDate)}`}
        sub={`${shift.duration_minutes} min total`}
      />
      <MetricCard
        icon={<TbCheck />}
        label={t.liveStatus.tasks}
        value={`${shift.total_task} total`}
        sub={`${shift.completed_room} ${t.liveStatus.roomsDone}`}
      />
      <MetricCard
        icon={<TbCalendar />}
        label={t.liveStatus.date}
        value={startDate.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
        sub={new Date(shift.date).toLocaleDateString([], { weekday: "long" })}
      />
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="flex gap-3 rounded border border-slate-200 bg-white p-4">
      <span className="h-fit rounded border border-sky-100 bg-sky-50 p-2.5 text-base text-sky-500">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wide text-slate-400">{label}</p>
        <b className="block truncate text-xs text-slate-800">{value}</b>
        <p className="truncate text-[10px] text-slate-500">{sub}</p>
      </div>
    </div>
  );
}
