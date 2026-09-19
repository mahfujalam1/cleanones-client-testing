"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { TbClipboardList } from "react-icons/tb";
import { useGetClientCleaningPlansQuery } from "@/services/actions/client";
import { CleaningPlanHeader } from "@/components/cleaning-plan/CleaningPlanHeader";
import { CleaningPlanCard } from "@/components/cleaning-plan/CleaningPlanCard";
import { CleaningPlanEmptyState } from "@/components/cleaning-plan/CleaningPlanEmptyState";
import { CleaningPlanPagination } from "@/components/cleaning-plan/CleaningPlanPagination";
import { CleaningPlanSkeleton } from "@/components/cleaning-plan/CleaningPlanSkeleton";

export default function CleaningPlanPage() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params?.locale || "en";
  const t = getTranslation(locale);

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading: loading } = useGetClientCleaningPlansQuery({
    page,
    limit,
  });

  const openDetails = (plan: any) => {
    router.push(`/${locale}/cleaning-plan/${plan._id}`);
  };

  const plans = data?.data?.result ?? data?.result ?? (Array.isArray(data?.data) ? data.data : []);
  const totalCount = data?.data?.meta?.total ?? data?.meta?.total ?? plans.length;

  return (
    <div className="space-y-4 text-xs text-slate-700">
      <CleaningPlanHeader
        title={t.titles.cleaningPlan}
        subtitle="Manage and view recurring cleaning plan blueprints and task checklists"
      />

      {loading ? (
        <CleaningPlanSkeleton />
      ) : (
        data && (
          <>
            <section className="overflow-hidden rounded ">
              <div className="flex flex-col gap-3 bg-white p-4 lg:flex-row lg:items-center lg:justify-between rounded-md">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <TbClipboardList className="text-base text-sky-500" />
                  {t.sidebar?.cleaningPlan || t.titles?.cleaningPlan || "Cleaning Plans"}
                  <span className="font-normal text-slate-400">({totalCount})</span>
                </div>
              </div>

              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {plans.map((plan: any) => (
                    <CleaningPlanCard key={plan._id} plan={plan} t={t} onDetails={() => openDetails(plan)} />
                  ))}
                </div>

                {!plans.length && (
                  <CleaningPlanEmptyState
                    title="No Cleaning Plans Found"
                    description="No cleaning plan blueprints found for your account."
                  />
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
