import { Progress } from "antd";
import { TbDoor } from "react-icons/tb";
import type { ShiftRoom } from "@/components/rooms/liveStatusTypes";

export function ShiftRoomsList({
  rooms,
  completedRoom,
  totalRoom,
  t,
}: {
  rooms: ShiftRoom[];
  completedRoom: number;
  totalRoom: number;
  t: any;
}) {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
        <TbDoor className="text-sm text-[#009EE2]" />
        <span className="text-xs font-bold text-slate-700">{t.cleaningPlan.rooms}</span>
        <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
          {completedRoom}/{totalRoom}
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {rooms.map((room) => (
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
  );
}
