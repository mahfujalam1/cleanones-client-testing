"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation, getPlaceholderTranslation } from "@/utils/translations";
import { Alert, Empty, Modal, Tag } from "antd";
import { TbArrowLeft, TbBuilding, TbMapPin, TbNotes, TbStairs, TbChecklist, TbUser } from "react-icons/tb";
import {
  type ClientLocationDetails,
  type ClientLocationRoom,
} from "@/services/actions/client";
import { SearchField, ListPagination } from "@/components/ui/ListControls";
import {
  DetailText,
  LocationDetailsSkeleton,
  RoomCard,
  RoomDetailsSkeleton,
  RoomListSkeleton,
  formatLabel,
  locationAddress,
  locationNameOf,
  roomIdOf,
  roomNameOf,
} from "@/components/locations/shared";
import { useGetSingleLocationQuery } from "@/redux/apis/location";
import { useGetMyRoomsQuery } from "@/redux/apis/room";
import { useGetMyTasksQuery } from "@/redux/apis/task";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedRoom as setReduxSelectedRoom } from "@/redux/slices/location";

const roomLimit = 9;

export default function LocationDetailPage() {
  const params = useParams<{ locale: string; locationId: string }>();
  const locale = params?.locale || "en";
  const locationId = decodeURIComponent(params?.locationId || "");
  const t = getTranslation(locale);
  const p = getPlaceholderTranslation(locale);
  const dispatch = useAppDispatch();

  const [roomPage, setRoomPage] = useState(1);
  const [roomSearch, setRoomSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(roomSearch.trim());
      setRoomPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [roomSearch]);

  const {
    data: locationRes,
    isFetching: locationQueryLoading,
    error: locationQueryError,
  } = useGetSingleLocationQuery(locationId, { skip: !locationId });

  const {
    data: roomsRes,
    isFetching: roomsLoading,
    error: roomsErrorObj,
  } = useGetMyRoomsQuery(
    {
      locationId,
      page: roomPage,
      limit: roomLimit,
      searchTerm: debouncedSearch || undefined,
    },
    { skip: !locationId }
  );

  const roomsList = Array.isArray(roomsRes?.data?.result) ? roomsRes.data.result : [];
  const roomTotal = roomsRes?.data?.meta?.total ?? 0;
  const roomsError = roomsErrorObj ? "Unable to load rooms" : "";

  const locationFromRooms = roomsList[0]?.location as any;
  const rawDetails = (locationRes?.data as any) ?? null;
  const details = rawDetails || locationFromRooms || null;
  const detailsLoading = locationQueryLoading && !details;
  const detailsError = locationQueryError && !details ? "Unable to load location details" : "";

  const [selectedRoomItem, setSelectedRoomItem] = useState<any | null>(null);

  const {
    data: tasksRes,
    isFetching: roomDetailsLoading,
  } = useGetMyTasksQuery(
    { roomId: selectedRoomItem?._id || selectedRoomItem?.id || "" },
    { skip: !(selectedRoomItem?._id || selectedRoomItem?.id) }
  );

  const openRoom = (room: any) => {
    const roomId = room._id || roomIdOf(room);
    if (!roomId) return;
    setSelectedRoomItem(room);
    dispatch(setReduxSelectedRoom(roomId));
  };

  const closeRoom = () => {
    setSelectedRoomItem(null);
    dispatch(setReduxSelectedRoom(null));
  };

  return (
    <div className="space-y-4 text-xs text-slate-700">
      
      <section className="rounded-xl border border-slate-300/80 bg-white p-4">
        <div className="flex min-w-0 items-start gap-2.5">
          <Link
            href={`/${locale}/locations`}
            aria-label={t.titles.locations}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 !bg-white text-slate-500 transition-colors hover:border-[#009EE2] hover:text-[#009EE2]"
          >
            <TbArrowLeft className="h-4 w-4" />
          </Link>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
            <TbMapPin className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold leading-tight text-slate-900">
              {details ? locationNameOf(details) : t.titles.locations}
            </h1>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {details ? locationAddress(details) || t.locations.addressUnavailable : t.locations.loadingLocation}
            </p>
            {details && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Tag color={details.is_active === false ? "default" : "green"} className="m-0 text-[9px]">
                  {details.is_active === false ? t.common.inactive : t.common.active}
                </Tag>
                <Tag className="m-0 text-[9px] capitalize">{formatLabel(details.type || t.locations.location)}</Tag>
              </div>
            )}
          </div>

          
          {details && (
            <div className="hidden shrink-0 gap-2 sm:flex">
              <StatTile value={(details as any).total_room ?? roomTotal} label={t.locations.rooms} />
            </div>
          )}
        </div>

        {details && (
          <div className="mt-3 flex gap-2 sm:hidden">
            <StatTile value={(details as any).total_room ?? roomTotal} label="Rooms" />
          </div>
        )}

        {detailsLoading && (
          <div className="mt-3">
            <LocationDetailsSkeleton />
          </div>
        )}

        {details && details.description && (
          <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
            <DetailText icon={<TbBuilding />} label={t.locations.description} value={details.description} />
          </div>
        )}
      </section>

      {detailsError && <Alert type="error" showIcon message={detailsError} />}

      
      <section className="space-y-3 rounded-xl border border-slate-300/80 bg-white p-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800">
              {t.locations.rooms} {!roomsLoading && <span className="font-semibold text-slate-400">({roomTotal})</span>}
            </h2>
            <p className="mt-0.5 text-[10px] text-slate-400">{t.rooms.selectRoom}</p>
          </div>
          <SearchField
            value={roomSearch}
            onChange={(value) => {
              setRoomSearch(value);
              setRoomPage(1);
            }}
            placeholder={p.searchRooms}
            className="w-full sm:max-w-64"
          />
        </div>

        {roomsError && <Alert type="error" showIcon message={roomsError} />}

        {roomsLoading ? (
          <RoomListSkeleton count={6} />
        ) : roomsList.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-4">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-xs text-slate-500">
                  {debouncedSearch ? t.rooms.noRoomsMatch : t.rooms.noRooms}
                </span>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {roomsList.map((room) => (
              <RoomCard
                key={room._id}
                room={room as unknown as ClientLocationRoom}
                onClick={() => openRoom(room)}
              />
            ))}
          </div>
        )}

        {!roomsLoading && (
          <ListPagination page={roomPage} limit={roomLimit} total={roomTotal} onPageChange={(next) => { setRoomPage(next); }} label="rooms" />
        )}
      </section>

      <Modal
        open={Boolean(selectedRoomItem)}
        onCancel={closeRoom}
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
                  {tasksRes.data.result.map((task) => (
                    <div key={task._id} className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{task.name}</span>
                        <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700 capitalize">
                          {(t.rooms as any)[(task.frequency_type || "").toLowerCase()] || task.frequency_type} · {task.duration_minutes} {t.rooms.min}
                        </span>
                      </div>
                      {task.photo_requirements && task.photo_requirements.length > 0 && (
                        <p className="mt-1 text-[11px] text-slate-500">
                          {t.rooms.requiredPhotos} {task.photo_requirements.map((p) => p.title).join(", ")}
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
    </div>
  );
}

function StatTile({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="min-w-20 flex-1 rounded-lg bg-slate-50 px-3 py-2 text-center sm:flex-none">
      <p className="text-sm font-bold leading-tight text-slate-800">{value}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}
