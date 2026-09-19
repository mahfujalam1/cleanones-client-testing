"use client";

import Link from "next/link";
import { Modal, Tag, Button, Progress } from "antd";
import {
  TbClock,
  TbMapPin,
  TbDoor,
  TbChecklist,
  TbCalendar,
  TbExternalLink,
  TbClipboardList,
} from "react-icons/tb";
import { Shift, hoursFromMinutes } from "./types";

interface ShiftDetailsModalProps {
  shift: Shift | null;
  locale: string;
  r: Record<string, string | undefined> | undefined;
  onClose: () => void;
}

export function ShiftDetailsModal({ shift, locale, r, onClose }: ShiftDetailsModalProps) {
  const showProgress = shift && !shift.isVirtual;

  return (
    <Modal
      open={Boolean(shift)}
      onCancel={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
            <TbClipboardList className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#009EE2]">
              {r?.shiftDetails}
            </p>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {shift?.planTitle || shift?.location || r?.cleaningShift || "Cleaning Shift"}
            </h3>
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-2 pt-2">
          {shift?.planId ? (
            <Link
              href={`/${locale}/cleaning-plan/${shift.planId}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#009EE2] bg-sky-50/50 px-3 py-1.5 text-xs font-semibold text-[#009EE2] hover:bg-sky-50 transition-colors"
            >
              <span>{r?.viewFullPlan}</span>
              <TbExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span />
          )}
          <Button onClick={onClose} className="text-xs">
            {r?.close}
          </Button>
        </div>
      }
      centered
      width={540}
      destroyOnHidden
    >
      {shift && (
        <div className="mt-3 space-y-3 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <TbCalendar className="text-[#009EE2] h-4 w-4" />
                {new Date(shift.date + "T12:00:00").toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <div className="flex items-center gap-1.5">
                {shift.isVirtual || shift.status === "unstaffed" ? (
                  <>
                    <Tag color="blue" className="m-0 text-[10px] font-semibold">
                      Scheduled Service
                    </Tag>
                    <Tag color="orange" className="m-0 text-[10px] font-semibold">
                      Worker Not Assigned
                    </Tag>
                  </>
                ) : (
                  <Tag
                    color={
                      shift.status === "completed"
                        ? "green"
                        : shift.status === "in_progress"
                          ? "processing"
                          : shift.status === "cancelled"
                            ? "error"
                            : "blue"
                    }
                    className="m-0 text-[10px] font-semibold capitalize"
                  >
                    {shift.status?.replace("_", " ") || "Upcoming"}
                  </Tag>
                )}
              </div>
            </div>

            {shift.isVirtual || shift.status === "unstaffed" || !shift.startAt ? (
              <div className="flex items-center gap-2 text-xs text-slate-700 border-t border-slate-200/60 pt-2">
                <TbClock className="text-amber-500 h-4 w-4 shrink-0" />
                <span className="font-semibold text-slate-800">
                  {shift.durationMinutes
                    ? `Planned Duration: ~${hoursFromMinutes(shift.durationMinutes)}h`
                    : "Scheduled Visit"}
                </span>
                <span className="text-[11px] text-amber-700">
                  • Worker not assigned yet (time will be finalized once assigned)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-600 border-t border-slate-200/60 pt-2">
                <TbClock className="text-slate-400 h-4 w-4 shrink-0" />
                <span className="font-bold text-slate-800">
                  {shift.startTime} – {shift.endTime}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({hoursFromMinutes(shift.durationMinutes || 0)}h {r?.duration || "duration"})
                </span>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-50 text-[#009EE2]">
              <TbMapPin className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {r?.location}
              </p>
              <h4 className="font-bold text-slate-800 truncate text-xs">{shift.location}</h4>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-2.5">
              <span className="mx-auto flex w-fit text-[#009EE2]">
                <TbDoor className="h-4 w-4" />
              </span>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {showProgress
                  ? `${shift.roomsCompleted ?? 0}/${shift.roomsCount ?? 0}`
                  : (shift.roomsCount ?? 0)}
              </p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                {r?.roomsScheduled}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-2.5">
              <span className="mx-auto flex w-fit text-[#009EE2]">
                <TbChecklist className="h-4 w-4" />
              </span>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {showProgress
                  ? `${shift.tasksCompleted ?? 0}/${shift.tasksCount ?? 0}`
                  : (shift.tasksCount ?? 0)}
              </p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                {r?.tasksScheduled}
              </p>
            </div>
          </div>

          {showProgress && (shift.tasksCount ?? 0) > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {r?.progress || "Progress"}
              </p>
              <Progress
                percent={Math.round(
                  ((shift.tasksCompleted ?? 0) / Math.max(shift.tasksCount ?? 1, 1)) * 100
                )}
                strokeColor="#009EE2"
                size="small"
              />
            </div>
          )}

          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {r?.assignedTeam} ({shift.assignedWorkers?.length || 0})
            </p>
            {(shift.assignedWorkers?.length ?? 0) === 0 ? (
              <div className="flex items-center gap-2 rounded-md bg-amber-50/60 border border-amber-200 px-3 py-2.5 text-xs text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <span>Worker not assigned yet. Specialists will be assigned by your coordinator prior to this shift.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                {shift.assignedWorkers!.map((w, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-slate-50 px-2.5 py-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-sky-100 text-[#009EE2] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {w.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-700">{w.name}</span>
                    </div>
                    <Tag className="m-0 text-[9px] capitalize">
                      {w.role || r?.specialist || "Specialist"}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
