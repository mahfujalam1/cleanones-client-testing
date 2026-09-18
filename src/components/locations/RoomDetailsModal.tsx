import { Empty, Modal, Tag } from "antd";
import { TbStairs, TbChecklist, TbUser } from "react-icons/tb";
import { RoomDetailsSkeleton, formatLabel, roomNameOf } from "@/components/locations/shared";

export function RoomDetailsModal({
  t,
  selectedRoomItem,
  onClose,
  roomDetailsLoading,
  tasksRes,
}: {
  t: any;
  selectedRoomItem: any | null;
  onClose: () => void;
  roomDetailsLoading: boolean;
  tasksRes: any;
}) {
  return (
    <Modal
      open={Boolean(selectedRoomItem)}
      onCancel={onClose}
      title={
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#009EE2]">{t.rooms.roomDetails}</p>
          <h2 className="mt-0.5 text-sm font-semibold text-slate-900">{selectedRoomItem ? roomNameOf(selectedRoomItem) : t.rooms.roomDetails}</h2>
        </div>
      }
      footer={null}
      centered
      width={560}
      destroyOnHidden
    >
      <div className="mt-3 max-h-[70vh] overflow-y-auto pr-1 text-xs">
        {selectedRoomItem && (
          <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="m-0 text-[10px] font-medium capitalize">
                  {formatLabel(selectedRoomItem.room_type || t.rooms.room)}
                </Tag>
                <Tag color="blue" className="m-0 text-[10px] capitalize">
                  {formatLabel(selectedRoomItem.cleaning_type || t.rooms.standard)}
                </Tag>
                <Tag color={selectedRoomItem.is_active === false ? "default" : "green"} className="m-0 text-[10px]">
                  {selectedRoomItem.is_active === false ? t.common.inactive : t.common.active}
                </Tag>
              </div>
              {selectedRoomItem.last_updated_by?.name && (
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <TbUser className="h-3.5 w-3.5 text-slate-400" />
                  {selectedRoomItem.last_updated_by.name}
                </span>
              )}
            </div>
            <div className="mt-2.5 flex items-center gap-4 border-t border-slate-200/60 pt-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <TbStairs className="text-slate-400" />
                <span>{t.rooms.floor} {selectedRoomItem.floor ?? "—"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TbChecklist className="text-slate-400" />
                <span>
                  {(selectedRoomItem.total_task ?? selectedRoomItem.tasks_count ?? tasksRes?.data?.result?.length ?? 0)} {t.rooms.tasks}
                </span>
              </div>
            </div>
          </div>
        )}

        {roomDetailsLoading ? (
          <RoomDetailsSkeleton />
        ) : tasksRes?.data?.result ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-700">{t.rooms.recurringTasks}</p>
            {tasksRes.data.result.length === 0 ? (
              <Empty description={t.rooms.noRecurringTasks} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
                {tasksRes.data.result.map((task: any) => (
                  <div key={task._id} className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{task.name}</span>
                      <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700 capitalize">
                        {(t.rooms as any)[(task.frequency_type || "").toLowerCase()] || task.frequency_type} · {task.duration_minutes} {t.rooms.min}
                      </span>
                    </div>
                    {task.photo_requirements && task.photo_requirements.length > 0 && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        {t.rooms.requiredPhotos} {task.photo_requirements.map((p: any) => p.title).join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
