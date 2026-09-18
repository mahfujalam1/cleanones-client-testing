import { Button } from "antd";
import { TbRefresh } from "react-icons/tb";
import type { LiveShift } from "@/components/rooms/liveStatusTypes";
import { ShiftStatusBar } from "@/components/rooms/ShiftStatusBar";
import { ShiftMetricsGrid } from "@/components/rooms/ShiftMetricsGrid";
import { ShiftWorkersList } from "@/components/rooms/ShiftWorkersList";
import { ShiftRoomsList } from "@/components/rooms/ShiftRoomsList";

export function ShiftDetail({ shift, t, onRefetch }: { shift: LiveShift; t: any; onRefetch: () => void }) {
  return (
    <div className="space-y-4">


      <ShiftStatusBar shift={shift} t={t} />


      <ShiftMetricsGrid shift={shift} t={t} />


      {shift.assigned_workers?.length > 0 && (
        <ShiftWorkersList workers={shift.assigned_workers} t={t} />
      )}


      {shift.rooms?.length > 0 && (
        <ShiftRoomsList rooms={shift.rooms} completedRoom={shift.completed_room} totalRoom={shift.total_room} t={t} />
      )}

      <div className="flex justify-end">
        <Button icon={<TbRefresh />} onClick={onRefetch} size="small" className="text-xs text-slate-600">
          {t.liveStatus.refresh}
        </Button>
      </div>
    </div>
  );
}
