import { Alert, Empty } from "antd";
import { SearchField, ListPagination } from "@/components/ui/ListControls";
import { RoomCard, RoomListSkeleton } from "@/components/locations/shared";
import { type ClientLocationRoom } from "@/services/actions/client";

export function LocationRoomsSection({
  t,
  p,
  roomSearch,
  onSearchChange,
  roomsError,
  roomsLoading,
  roomsList,
  debouncedSearch,
  onOpenRoom,
  roomPage,
  roomLimit,
  roomTotal,
  onPageChange,
}: {
  t: any;
  p: any;
  roomSearch: string;
  onSearchChange: (value: string) => void;
  roomsError: string;
  roomsLoading: boolean;
  roomsList: any[];
  debouncedSearch: string;
  onOpenRoom: (room: any) => void;
  roomPage: number;
  roomLimit: number;
  roomTotal: number;
  onPageChange: (page: number) => void;
}) {
  return (
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
          onChange={onSearchChange}
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
              onClick={() => onOpenRoom(room)}
            />
          ))}
        </div>
      )}

      {!roomsLoading && (
        <ListPagination page={roomPage} limit={roomLimit} total={roomTotal} onPageChange={onPageChange} label="rooms" />
      )}
    </section>
  );
}
