import Link from "next/link";
import { Tag } from "antd";
import { TbBuilding, TbChevronRight, TbMapPin } from "react-icons/tb";
import type { ClientLocation } from "@/types/api";

export function LocationCard({
  location,
  locale,
  t,
  onSelect,
}: {
  location: ClientLocation;
  locale: string;
  t: any;
  onSelect: () => void;
}) {
  const address = location.address;
  const id = location._id;
  const roomsCount = location.total_room ?? 0;

  return (
    <Link
      href={`/${locale}/locations/${encodeURIComponent(id)}`}
      onClick={onSelect}
      className="group flex min-h-52 flex-col rounded-xl border border-slate-300/80 !bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#009EE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EE2]/20"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
          <TbMapPin className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xs font-bold text-slate-800 transition-colors group-hover:text-[#009EE2]">
            {location.name}
          </h2>
          <p className="mt-1 flex items-start gap-1 text-[10px] leading-4 text-slate-500">
            <TbBuilding className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-2">{address || t.locations.addressUnavailable}</span>
          </p>
        </div>
        <TbChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#009EE2]" />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Tag color={location.is_active === false ? "default" : "green"} className="m-0 text-[9px]">
          {location.is_active === false ? t.common.inactive : t.common.active}
        </Tag>
        <Tag className="m-0 text-[9px] capitalize">{t.locations.location}</Tag>
      </div>

      <div className="mt-auto grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 pt-3 text-center">
        <CardStat value={roomsCount} label={t.locations.rooms} />
        <CardStat value={location.is_active ? t.locations.online : t.locations.offline} label={t.locations.status} />
      </div>
    </Link>
  );
}

function CardStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="px-1">
      <p className="text-sm font-bold text-slate-800">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}
