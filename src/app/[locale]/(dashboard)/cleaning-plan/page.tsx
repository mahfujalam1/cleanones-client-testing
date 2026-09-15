"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Pagination } from "antd";
import { TbCalendar, TbClock, TbMapPin, TbClipboardList, TbDoor } from "react-icons/tb";
import { useGetClientScheduleQuery } from "@/services/actions/client";

export default function SchedulePage() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params?.locale || "en";
  const t = getTranslation(locale);

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading: loading, error: queryError } = useGetClientScheduleQuery({
    statusVal: "all",
    timeFrame: "all",
    page,
    limit,
  });

  const openDetails = (visit: any) => {
    router.push(`/${locale}/cleaning-plan/${visit._id}`);
  };

  const visits = data?.data?.result ?? data?.result ?? [];
  const totalCount = data?.data?.meta?.total ?? data?.meta?.total ?? 0;

  return (
    <div className="space-y-4 text-xs text-slate-700">
      <header>
        <h1 className="text-base font-bold text-slate-900">{t.titles.cleaningPlan || t.titles.schedule}</h1>
        <p className="mt-1 text-xs text-slate-500">{t.schedule.subtitle}</p>
      </header>

      {loading ? (
        <Skeleton />
      ) : (
        data && (
          <>
            <section className="overflow-hidden rounded ">
              <div className="flex flex-col gap-3 bg-white p-4 lg:flex-row lg:items-center lg:justify-between rounded-md">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <TbCalendar className="text-base text-sky-500" />
                  {t.schedule.cleaningVisits}
                  <span className="font-normal text-slate-400">({totalCount})</span>
                </div>
              </div>

              <div className=" py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visits.map((visit: any) => (
                    <CleaningPlanCard key={visit._id} plan={visit} t={t} onDetails={() => openDetails(visit)} />
                  ))}
                </div>

                {!visits.length && (
                  <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-slate-200">
                    <span className="rounded-full border border-sky-100 bg-sky-50 p-4 text-2xl text-sky-400">
                      <TbCalendar />
                    </span>
                    <h2 className="mt-4 text-sm font-bold text-slate-900">{t.schedule.noVisitsFound}</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {t.schedule.noVisitsMatching}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {totalCount > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                <span>
                  {t.cleaningPlan.showing} {(page - 1) * limit + 1}–{Math.min(page * limit, totalCount)} {t.cleaningPlan.of} {totalCount}
                </span>
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={totalCount}
                  showSizeChanger={false}
                  size="small"
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}

function CleaningPlanCard({ plan, onDetails, t }: { plan: any; onDetails: () => void; t: any }) {
  const dateObj = new Date(plan.date_time || plan.createdAt);
  const formattedDate = `${dateObj.toISOString().split("T")[0]} - ${dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;

  // Dummy data mapping for missing payload fields based on screenshot
  const clientName = plan.client?.name || plan.client || "Veldhoven Groep";
  const locationName = plan.location?.name || plan.location || "Campus Eindhoven";
  const rooms = plan.rooms?.length > 0 ? plan.rooms : ["Toiletgroep", "Serverruimte"];
  const duration = plan.max_estimated_duration || 30;
  const tasksCount = plan.total_tasks ?? plan.total_task ?? 0;
  const photosCount = 0; // Payload doesn't provide this by default

  return (
    <div className="flex flex-col bg-white rounded-md transition-shadow">
      <div className="p-4 flex-1" onClick={onDetails} style={{ cursor: "pointer" }}>

        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-3" >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100  text-slate-400 ">
              <TbClipboardList className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-slate-800 leading-tight ">{plan.title}</h3>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider">
                  {plan.status || "Active"}
                </span>
              </div>
              {/* <p className="text-xs text-slate-500 mt-0.5">{clientName}</p> */}
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 mt-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <TbMapPin className="text-[#009EE2] h-4 w-4 shrink-0" />
            <span className="truncate font-medium">{locationName}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbClock className="text-slate-400 h-4 w-4 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-start gap-2">
            <TbDoor className="text-slate-400 h-4 w-4 shrink-0 mt-0.5" />
            <p className="text-sm ">{rooms?.length} {t.cleaningPlan.rooms}</p>
          </div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 p-3 text-center">
        <div>
          <b className="block text-sm text-slate-800">{duration}m</b>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">{t.cleaningPlan.duration}</span>
        </div>
        <div>
          <b className="block text-sm text-slate-800">{photosCount}</b>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">{t.cleaningPlan.photos}</span>
        </div>
        <div>
          <b className="block text-sm text-slate-800">{tasksCount}</b>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">{t.cleaningPlan.tasks}</span>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="grid gap-3 sm:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-20 rounded border border-slate-200 bg-slate-100" />
      ))}
    </div>
    <div className="h-96 rounded border border-slate-200 bg-slate-100" />
  </div>
);
