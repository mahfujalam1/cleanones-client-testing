"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Alert } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedLocation } from "@/redux/slices/location";
import { useGetMyLocationsQuery } from "@/redux/apis/location";
import type { ClientLocation } from "@/types/api";
import { ListPagination } from "@/components/ui/ListControls";
import { LocationGridSkeleton } from "@/components/locations/shared";
import { LocationsHeader } from "@/components/locations/LocationsHeader";
import { LocationsSearchBar } from "@/components/locations/LocationsSearchBar";
import { LocationsEmptyState } from "@/components/locations/LocationsEmptyState";
import { LocationCard } from "@/components/locations/LocationCard";

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
      <LocationsHeader title={t.titles.locations} total={total} subtitle={t.locations.subtitle} />

      <LocationsSearchBar value={search} onChange={setSearch} placeholder={t.locations.searchPlaceholder} />

      {queryError && (
        <Alert type="error" showIcon message="Unable to load locations right now." />
      )}

      {loading ? (
        <LocationGridSkeleton />
      ) : locations.length === 0 ? (
        <LocationsEmptyState message={debouncedSearch ? t.locations.noLocationsMatch : t.locations.noLocations} />
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
