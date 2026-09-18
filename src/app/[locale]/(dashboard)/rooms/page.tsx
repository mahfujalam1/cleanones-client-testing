"use client";

import React, { useState } from "react";
import { Button, Progress } from "antd";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import {
  TbBroadcastOff,
  TbCalendar,
  TbCheck,
  TbClock,
  TbDoor,
  TbMapPin,
  TbRefresh,
  TbUser,
  TbUsers,
} from "react-icons/tb";
import { useGetClientMyLiveStatusQuery } from "@/redux/api/clientApi";


interface ShiftRoom {
  room: string;
  name: string;
  room_type: string;
  total_task: number;
  completed_task: number;
  progress_percent: number;
}
interface AssignedWorker {
  worker: string;
  name: string;
  role: string;
  check_in_at: string;
  check_out_at: string;
}
interface ShiftLocation {
  location: string;
  name: string;
  coordinates?: { type: string; coordinates: number[] };
}
interface LiveShift {
  _id: string;
  cleaning_plan: string;
  date: string;
  date_time: string;
  location: ShiftLocation;
  duration_minutes: number;
  assigned_workers: AssignedWorker[];
  status: string;
  total_room: number;
  completed_room: number;
  total_task: number;
  overall_progress_percent: number;
  rooms: ShiftRoom[];
}


export default function LiveStatusPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const { data: res, isLoading, refetch } = useGetClientMyLiveStatusQuery();

  
  const shifts: LiveShift[] = res?.data ?? [];
  const empty = !isLoading && shifts.length === 0;

  
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeShift = shifts.find((s) => s._id === activeId) ?? shifts[0] ?? null;

  if (isLoading && !res) {
    return (
      <PageShell t={t}>
        <Skeleton />
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell t={t}>
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded border border-slate-200 bg-white px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-2xl text-sky-500">
            <TbBroadcastOff />
          </span>
          <h2 className="mt-4 text-sm font-bold text-slate-800">{t.rooms.noLiveSession}</h2>
          <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">{t.rooms.noLiveSessionDesc}</p>
          <Button icon={<TbRefresh />} onClick={() => void refetch()} className="mt-4 text-xs font-semibold text-sky-600">
            {t.rooms.checkAgain}
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell t={t}>
      <div className="space-y-4">

        
        {shifts.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {shifts.map((s) => (
              <button
                key={s._id}
                onClick={() => setActiveId(s._id)}
                className={`rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  (activeId ?? shifts[0]._id) === s._id
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s.location?.name || "Shift"}
              </button>
            ))}
          </div>
        )}

        {activeShift && <ShiftDetail shift={activeShift} t={t} onRefetch={() => void refetch()} />}
      </div>
    </PageShell>
  );
}


function ShiftDetail({ shift, t, onRefetch }: { shift: LiveShift; t: any; onRefetch: () => void }) {
  const startDate = new Date(shift.date_time);
  const endDate = new Date(startDate.getTime() + shift.duration_minutes * 60 * 1000);

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const statusColor =
    shift.status === "completed"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : shift.status === "in_progress"
      ? "text-sky-700 bg-sky-50 border-sky-200"
      : "text-orange-700 bg-orange-50 border-orange-200";

  return (
    <div className="space-y-4">

      
      <div className={`rounded border p-4 ${shift.status === "in_progress" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
              {shift.status.replace(/_/g, " ")}
            </span>
            <p className="mt-1 text-xs text-slate-700">
              {shift.location?.name}
            </p>
          </div>
          <div className="text-right">
            <b className="text-xs text-slate-800">{shift.overall_progress_percent}% {t.liveStatus.complete}</b>
            <p className="text-[10px] text-slate-500">
              {shift.completed_room}/{shift.total_room} {t.liveStatus.roomsDone}
            </p>
          </div>
        </div>
        <Progress
          percent={shift.overall_progress_percent}
          showInfo={false}
          strokeColor="#009EE2"
          trailColor="#e2e8f0"
          size="small"
          className="mt-2"
        />
      </div>

      
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

      
      {shift.assigned_workers?.length > 0 && (
        <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
            <TbUsers className="text-sm text-[#009EE2]" />
            <span className="text-xs font-bold text-slate-700">{t.liveStatus.assignedWorkers}</span>
            <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
              {shift.assigned_workers.length}
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {shift.assigned_workers.map((w) => (
              <div key={w.worker} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#009EE2] text-sm font-bold">
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">{w.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{w.role.replace(/_/g, " ")}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p>{t.liveStatus.inTime}: {w.check_in_at ? new Date(w.check_in_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</p>
                  <p>{t.liveStatus.outTime}: {w.check_out_at ? new Date(w.check_out_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
      {shift.rooms?.length > 0 && (
        <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
            <TbDoor className="text-sm text-[#009EE2]" />
            <span className="text-xs font-bold text-slate-700">{t.cleaningPlan.rooms}</span>
            <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
              {shift.completed_room}/{shift.total_room}
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {shift.rooms.map((room) => (
              <div key={room.room} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500 text-xs">
                      <TbDoor />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">{room.name}</p>
                      <p className="text-[10px] text-slate-500">{room.room_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500">{room.completed_task}/{room.total_task} {t.liveStatus.tasks}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                        room.progress_percent === 100
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : room.progress_percent > 0
                          ? "bg-sky-50 text-sky-700 border-sky-200"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {room.progress_percent === 100 ? t.liveStatus.done : room.progress_percent > 0 ? t.liveStatus.inProgress : t.liveStatus.pending}
                    </span>
                  </div>
                </div>
                <Progress
                  percent={room.progress_percent}
                  showInfo={false}
                  strokeColor={room.progress_percent === 100 ? "#10b981" : "#009EE2"}
                  trailColor="#f1f5f9"
                  size="small"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button icon={<TbRefresh />} onClick={onRefetch} size="small" className="text-xs text-slate-600">
          {t.liveStatus.refresh}
        </Button>
      </div>
    </div>
  );
}


function PageShell({ children, t }: { children: React.ReactNode; t: any }) {
  return (
    <div className="space-y-4 text-xs text-slate-700">
      <div>
        <h1 className="text-base font-bold text-slate-900">{t.titles.rooms}</h1>
        <p className="mt-1 text-xs text-slate-500">{t.rooms.liveSubtitle}</p>
      </div>
      {children}
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

const Skeleton = () => (
  <div className="animate-pulse space-y-3">
    {[55, 70, 90, 280].map((height) => (
      <div key={height} className="rounded border border-slate-200 bg-slate-100" style={{ height }} />
    ))}
  </div>
);
