"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { TbCalendar } from "react-icons/tb";
import { useGetClientScheduleQuery } from "@/services/actions/client";
import { CleaningPlanHeader } from "@/components/cleaning-plan/CleaningPlanHeader";
import { CleaningPlanCard } from "@/components/cleaning-plan/CleaningPlanCard";
import { CleaningPlanEmptyState } from "@/components/cleaning-plan/CleaningPlanEmptyState";
import { CleaningPlanPagination } from "@/components/cleaning-plan/CleaningPlanPagination";
import { CleaningPlanSkeleton } from "@/components/cleaning-plan/CleaningPlanSkeleton";

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
      <CleaningPlanHeader title={t.titles.cleaningPlan || t.titles.schedule} subtitle={t.schedule.subtitle} />

      {loading ? (
        <CleaningPlanSkeleton />
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
                  <CleaningPlanEmptyState title={t.schedule.noVisitsFound} description={t.schedule.noVisitsMatching} />
                )}
              </div>
            </section>

            {totalCount > 0 && (
              <CleaningPlanPagination page={page} limit={limit} totalCount={totalCount} onPageChange={setPage} t={t} />
            )}
          </>
        )
      )}
    </div>
  );
}
