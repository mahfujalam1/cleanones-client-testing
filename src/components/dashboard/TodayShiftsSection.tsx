import { Tag } from "antd";
import { TbBuilding, TbClock } from "react-icons/tb";
import { formatHours, formatShiftTime } from "@/components/dashboard/dashboardHelpers";

export function TodayShiftsSection({ shifts, todayStatus }: { shifts: any[]; todayStatus: string }) {

  return (
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
        {shifts.map((shift) => (
          <ShiftCard key={shift.shift_id} shift={shift} />
        ))}
      </div>
    </section>
  );
}

function ShiftCard({ shift }: { shift: any }) {
  const shiftBadge =
    shift.status === "in_progress"
      ? { text: "In Progress", color: "processing" as const }
      : shift.status === "completed"
        ? { text: "Completed", color: "success" as const }
        : shift.status === "cancelled"
          ? { text: "Cancelled", color: "default" as const }
          : { text: "Upcoming", color: "warning" as const };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <b className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <TbBuilding className="text-sky-500 shrink-0" />
            {shift.location_name}
          </b>
          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <TbClock className="text-xs" /> Starts {formatShiftTime(shift.start_time)} ·{" "}
            {Math.ceil(shift.estimated_hours || 0)}h estimated
          </p>
        </div>
        <Tag color={shiftBadge.color} className="!m-0 !text-[10px] !px-2 !py-0.5">
          {shiftBadge.text}
        </Tag>
      </div>


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


      {shift.workers && shift.workers.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
            Specialists On Duty ({shift.workers.length})
          </p>
          <div className="space-y-1">
            {shift.workers.map((worker: any) => (
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
                  {(worker?.check_in_at && !worker?.check_out_at) ? (
                    <span className="font-semibold text-emerald-600">
                      {formatHours(worker.worked_hours)} logged
                    </span>
                  ) : worker?.check_out_at ? (
                    <span className="font-semibold text-emerald-600">
                      {worker?.worked_hours} completed
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
}
