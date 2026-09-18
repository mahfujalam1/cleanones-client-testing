import Link from "next/link";
import { Alert, Tag } from "antd";
import { TbArrowLeft, TbBuilding, TbMapPin } from "react-icons/tb";
import {
  DetailText,
  LocationDetailsSkeleton,
  formatLabel,
  locationAddress,
  locationNameOf,
} from "@/components/locations/shared";

export function LocationDetailHeader({
  t,
  locale,
  details,
  detailsLoading,
  detailsError,
  roomTotal,
}: {
  t: any;
  locale: string;
  details: any;
  detailsLoading: boolean;
  detailsError: string;
  roomTotal: number;
}) {
  return (
    <>
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
    </>
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
