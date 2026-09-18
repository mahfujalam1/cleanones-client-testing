import { TbDoor, TbClock, TbCheck, TbCamera } from "react-icons/tb";
import { CleaningPlanTaskItem } from "./CleaningPlanTaskItem";

export function CleaningPlanRoomCard({ room, t }: { room: any; t: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-white border border-slate-200 text-[#009EE2] flex items-center justify-center shadow-sm">
            <TbDoor className="h-4 w-4" />
          </div>
          <div>
            <b className="block text-sm text-slate-800">{room.name}</b>
            <p className="text-[10px] text-slate-500 capitalize">
              {room.room_type || 'Room'} • {room.floor != null && room.floor !== "" ? `Floor ${room.floor}` : 'Floor —'}
              {room.cleaning_type ? ` • ${room.cleaning_type}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-2 py-1">
            <TbClock className="text-slate-400 h-3 w-3" /> {room.total_duration || 0}m
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#009EE2] bg-sky-50 border border-sky-100 rounded px-2 py-1">
            <TbCheck className="h-3 w-3" /> {room.total_task ?? room.tasks?.length ?? 0} {t.cleaningPlan.tasks}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-2 py-1">
            <TbCamera className="text-slate-400 h-3 w-3" /> {room.tasks?.reduce((acc: number, t: any) => acc + (t.photo_requirements?.length || 0), 0) || 0} {t.cleaningPlan.photos}
          </span>
        </div>
      </div>

      {room.tasks && room.tasks.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t.cleaningPlan.tasks}</p>
          <div className="space-y-2">
            {room.tasks.map((task: any) => (
              <CleaningPlanTaskItem key={task._id} task={task} t={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
