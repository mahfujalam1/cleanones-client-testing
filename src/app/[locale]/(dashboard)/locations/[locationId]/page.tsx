"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation, getPlaceholderTranslation } from "@/utils/translations";
import {
  type ClientLocationDetails,
  type ClientLocationRoom,
} from "@/services/actions/client";
import { roomIdOf } from "@/components/locations/shared";
import { LocationDetailHeader } from "@/components/locations/LocationDetailHeader";
import { LocationRoomsSection } from "@/components/locations/LocationRoomsSection";
import { RoomDetailsModal } from "@/components/locations/RoomDetailsModal";
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
      <LocationDetailHeader
        t={t}
        locale={locale}
        details={details}
        detailsLoading={detailsLoading}
        detailsError={detailsError}
        roomTotal={roomTotal}
      />

      <LocationRoomsSection
        t={t}
        p={p}
        roomSearch={roomSearch}
        onSearchChange={(value) => {
          setRoomSearch(value);
          setRoomPage(1);
        }}
        roomsError={roomsError}
        roomsLoading={roomsLoading}
        roomsList={roomsList}
        debouncedSearch={debouncedSearch}
        onOpenRoom={openRoom}
        roomPage={roomPage}
        roomLimit={roomLimit}
        roomTotal={roomTotal}
        onPageChange={(next) => { setRoomPage(next); }}
      />

      <RoomDetailsModal
        t={t}
        selectedRoomItem={selectedRoomItem}
        onClose={closeRoom}
        roomDetailsLoading={roomDetailsLoading}
        tasksRes={tasksRes}
      />
    </div>
  );
}
