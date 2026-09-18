import { TbUsers } from "react-icons/tb";
import type { AssignedWorker } from "@/components/rooms/liveStatusTypes";

export function ShiftWorkersList({ workers, t }: { workers: AssignedWorker[]; t: any }) {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
        <TbUsers className="text-sm text-[#009EE2]" />
        <span className="text-xs font-bold text-slate-700">{t.liveStatus.assignedWorkers}</span>
        <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
          {workers.length}
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {workers.map((w) => (
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
  );
}
