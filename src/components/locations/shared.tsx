"use client";

import React, { type ReactNode } from "react";
import { Empty, Skeleton, Tag } from "antd";
import {
  TbChevronRight,
  TbCircleCheck,
  TbChecklist,
  TbClock,
  TbDoor,
  TbPhoto,
  TbStairs,
  TbUser,
} from "react-icons/tb";
import type {
  ClientLocationDetails,
  ClientLocationRoom,
  ClientLocationRoomDetails,
  ClientLocationRoomSummary,
  ClientLocationRoomTask,
  ClientLocationSummary,
} from "@/services/actions/client";



export function locationIdOf(location: any) {
  if (!location) return "";
  const loc = location.data || location;
  return loc._id || loc.location_id || loc.id || "";
}

export function locationNameOf(location: any) {
  if (!location) return "Unnamed location";
  const loc = location.data || location;
  return loc.location_name || loc.name || "Unnamed location";
}

export function roomIdOf(room: any) {
  return room?._id || room?.room_id || room?.id || "";
}

export function roomNameOf(room: any) {
  return room?.name || room?.room_name || "Unnamed room";
}

export function locationAddress(location: any) {
  if (!location) return "";
  const loc = location.data || location;
  return [loc.address, loc.city, loc.postal_code, loc.country]
    .filter((value): value is string => Boolean(value))
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(", ");
}

export function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}



export function RoomCard({ room, onClick }: { room: ClientLocationRoom; onClick: () => void }) {
  const roomName = roomNameOf(room);
  const totalTasks = room.total_task ?? room.tasks_count ?? 0;
  const floorText = room.floor != null && room.floor !== "" ? `Floor ${room.floor}` : "Floor —";
  const roomType = room.room_type || "room";
  const cleaningType = room.cleaning_type || "standard";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-lg border border-slate-300/80 bg-white p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-[#009EE2] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EE2]/20"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
          <TbDoor className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-800 transition-colors group-hover:text-[#009EE2]">
                {roomName}
              </h4>
              <p className="mt-0.5 text-[10px] capitalize text-slate-400">
                {formatLabel(roomType)}
              </p>
            </div>
            <Tag className="m-0 shrink-0 text-[9px] capitalize">
              {formatLabel(cleaningType)}
            </Tag>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-100 pt-2.5 text-[10px] text-slate-500">
            <RoomMeta icon={<TbStairs />} text={floorText} />
            <RoomMeta icon={<TbChecklist />} text={`${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`} />
            {room.duration ? (
              <RoomMeta icon={<TbClock />} text={`${room.duration} min`} />
            ) : room.is_active !== undefined ? (
              <RoomMeta
                icon={<span className={`inline-block h-1.5 w-1.5 rounded-full ${room.is_active !== false ? "bg-emerald-500" : "bg-slate-400"}`} />}
                text={room.is_active !== false ? "Active" : "Inactive"}
              />
            ) : null}
            {room.photos_count ? (
              <RoomMeta icon={<TbPhoto />} text={`${room.photos_count} photos`} />
            ) : room.last_updated_by?.name ? (
              <RoomMeta icon={<TbUser className="h-3 w-3" />} text={room.last_updated_by.name} />
            ) : null}
          </div>
        </div>
        <TbChevronRight className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-[#009EE2]" />
      </div>
    </button>
  );
}

export function RoomDetailsContent({ details }: { details: ClientLocationRoomDetails }) {
  const tasks = Array.isArray(details.tasks) ? details.tasks : [];
  const photos = tasks.flatMap((task) =>
    (Array.isArray(task.photo) ? task.photo : []).map((photo) => ({ ...photo, taskName: task.name })),
  );

  return (
    <div className="space-y-3">
      <section className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <RoomDetailStat icon={<TbStairs />} label="Floor" value={String(details.floor ?? "—")} />
          <RoomDetailStat icon={<TbClock />} label="Duration" value={`${details.duration ?? 0} min`} />
          <RoomDetailStat icon={<TbChecklist />} label="Tasks" value={String(details.task_number ?? tasks.length)} />
          <RoomDetailStat icon={<TbPhoto />} label="Photos" value={String(details.photo_number ?? photos.length)} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
          <Tag className="m-0 text-[9px] capitalize">{formatLabel(details.room_type || "room")}</Tag>
          <Tag color="blue" className="m-0 text-[9px] capitalize">
            {formatLabel(details.cleaning_type || "standard")}
          </Tag>
          <Tag className="m-0 text-[9px]">{details.monthly_cleaning_frequency ?? 0} visits / month</Tag>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-3 py-2.5">
          <h3 className="text-xs font-bold text-slate-800">Task checklist</h3>
          <p className="mt-0.5 text-[10px] text-slate-400">Configured cleaning tasks for this room.</p>
        </div>
        {tasks.length ? (
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-xs text-slate-500">No tasks configured.</span>}
            className="py-5"
          />
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-3 py-2.5">
          <h3 className="text-xs font-bold text-slate-800">Required photos</h3>
          <p className="mt-0.5 text-[10px] text-slate-400">Photo evidence requested by the task setup.</p>
        </div>
        {photos.length ? (
          <div className="space-y-2 p-3">
            {photos.map((photo) => (
              <div
                key={`${photo.taskName}-${photo.id}`}
                className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5"
              >
                <TbPhoto className="mt-0.5 shrink-0 text-[#009EE2]" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700">{photo.name}</p>
                  <p className="truncate text-[10px] text-slate-400">{photo.taskName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-xs text-slate-500">No photos required.</span>}
            className="py-5"
          />
        )}
      </section>
    </div>
  );
}

function TaskRow({ task }: { task: ClientLocationRoomTask }) {
  const taskPhotos = Array.isArray(task.photo) ? task.photo : [];

  return (
    <div className="flex items-start gap-2.5 px-3 py-3">
      <TbCircleCheck className="mt-0.5 shrink-0 text-[#009EE2]" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-700">{task.name}</p>
          <Tag className="m-0 text-[9px] capitalize">{formatLabel(task.frequency_type || "every visit")}</Tag>
        </div>
        {task.is_photo_req && (
          <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
            <TbPhoto className="text-[#009EE2]" />
            {task.total_photos_required ?? taskPhotos.length} photo(s) required
          </p>
        )}
      </div>
    </div>
  );
}

export function DetailStat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="px-2">
      <p className="text-sm font-bold text-slate-800">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}

export function DetailText({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
      <span className="mt-0.5 text-[#009EE2]">{icon}</span>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-600">{value}</p>
      </div>
    </div>
  );
}

function RoomMeta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-slate-400">{icon}</span>
      {text}
    </span>
  );
}

function RoomDetailStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2 text-center">
      <span className="mx-auto flex w-fit text-sm text-[#009EE2]">{icon}</span>
      <p className="mt-1 text-xs font-bold text-slate-700">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}



export function LocationGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="min-h-52 rounded-xl border border-slate-200 bg-white p-4">
          <Skeleton active avatar={{ shape: "square", size: 36 }} paragraph={{ rows: 4 }} title={{ width: "58%" }} />
        </div>
      ))}
    </div>
  );
}

export function LocationDetailsSkeleton() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <Skeleton active avatar={{ shape: "square", size: 36 }} paragraph={{ rows: 4 }} />
    </section>
  );
}

export function RoomListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
          <Skeleton active avatar={{ shape: "square", size: 32 }} paragraph={{ rows: 2 }} title={{ width: "52%" }} />
        </div>
      ))}
    </div>
  );
}

export function RoomDetailsSkeleton() {
  return (
    <div className="space-y-3">
      {[110, 180, 140].map((height) => (
        <div key={height} className="rounded-lg border border-slate-200 bg-white p-3" style={{ minHeight: height }}>
          <Skeleton active paragraph={{ rows: Math.max(1, Math.round(height / 55)) }} />
        </div>
      ))}
    </div>
  );
}
