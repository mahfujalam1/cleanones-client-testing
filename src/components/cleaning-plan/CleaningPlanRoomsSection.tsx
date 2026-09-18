import { TbDoor } from "react-icons/tb";
import { CleaningPlanRoomCard } from "./CleaningPlanRoomCard";

export function CleaningPlanRoomsSection({ rooms, roomsCount, t }: { rooms: any[]; roomsCount: number; t: any }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold text-slate-600 flex items-center gap-2 uppercase tracking-widest mb-3">
        <TbDoor className="h-4 w-4 text-[#009EE2]" /> {t.cleaningPlan.roomsAndTasks} ({roomsCount})
      </h3>
      <div className="space-y-4">
        {rooms.map((room: any) => (
          <CleaningPlanRoomCard key={room._id} room={room} t={t} />
        ))}
      </div>
    </div>
  );
}
