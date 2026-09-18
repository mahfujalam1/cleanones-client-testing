"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Alert, Empty, Tag } from "antd";
import { TbBuilding, TbChevronRight, TbMapPin } from "react-icons/tb";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedLocation } from "@/redux/slices/location";
import { useGetMyLocationsQuery } from "@/redux/apis/location";
import type { ClientLocation } from "@/types/api";
import { SearchField, ListPagination } from "@/components/ui/ListControls";
import {
  LocationGridSkeleton,
} from "@/components/locations/shared";

const locationLimit = 12;

export default function LocationsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const t = getTranslation(locale);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: locationsRes, isFetching: loading, error: queryError } = useGetMyLocationsQuery({
    searchTerm: debouncedSearch || undefined,
    page,
    limit: locationLimit,
  });

  const locations: ClientLocation[] = Array.isArray(locationsRes?.data?.result)
    ? locationsRes.data.result
    : [];
  const total = locationsRes?.data?.meta?.total ?? 0;

  return (
    <div className="space-y-4 text-xs text-slate-700">
      
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
            <TbMapPin className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-bold leading-tight text-slate-900">{t.titles.locations}</h1>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{total}</span>
            </div>
            <p className="truncate text-[11px] text-slate-500">{t.locations.subtitle}</p>
          </div>
        </div>
      </header>

      
      <div className="rounded-xl border border-slate-200 bg-white p-2.5">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder={t.locations.searchPlaceholder}
          className="w-full sm:max-w-80"
        />
      </div>

      {queryError && (
        <Alert type="error" showIcon message="Unable to load locations right now." />
      )}

      {loading ? (
        <LocationGridSkeleton />
      ) : locations.length === 0 ? (
        <section className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-xs text-slate-500">
                {debouncedSearch ? t.locations.noLocationsMatch : t.locations.noLocations}
              </span>
            }
          />
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {locations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
              locale={locale}
              t={t}
              onSelect={() => dispatch(setSelectedLocation(location._id))}
            />
          ))}
        </div>
      )}

      {!loading && (
        <ListPagination page={page} limit={locationLimit} total={total} onPageChange={setPage} label="locations" />
      )}
    </div>
  );
}

function LocationCard({
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
