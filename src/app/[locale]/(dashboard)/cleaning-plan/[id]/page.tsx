"use client";

import { useParams, useRouter } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useGetClientCleaningPlanDetailsQuery } from "@/redux/apis/clientCleaningPlans";
import { CleaningPlanDetailsSkeleton } from "@/components/cleaning-plan/CleaningPlanDetailsSkeleton";
import { CleaningPlanDetailsHeader } from "@/components/cleaning-plan/CleaningPlanDetailsHeader";
import { CleaningPlanDetailsStats } from "@/components/cleaning-plan/CleaningPlanDetailsStats";
import { CleaningPlanLocationCard } from "@/components/cleaning-plan/CleaningPlanLocationCard";
import { CleaningPlanRoomsSection } from "@/components/cleaning-plan/CleaningPlanRoomsSection";
import { CleaningPlanAdditionalTasksSection } from "@/components/cleaning-plan/CleaningPlanAdditionalTasksSection";

export default function CleaningPlanDetailsPage() {
  const params = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const t = getTranslation(params?.locale);

  const { data: detailsRes, isLoading } = useGetClientCleaningPlanDetailsQuery(params?.id || "", { skip: !params?.id });
  const details = detailsRes?.data;



  const createdDate = details?.createdAt ? new Date(details.createdAt).toLocaleDateString() : "";

  const duration = details?.total_duration ?? details?.max_estimated_duration ?? 0;
  const roomsCount = details?.total_rooms ?? details?.rooms?.length ?? 0;
  const tasksCount = details?.total_tasks ?? 0;
  const photosCount = details?.rooms?.reduce((acc: number, room: any) => {
    return acc + (room.tasks?.reduce((tAcc: number, task: any) => tAcc + (task.photo_requirements?.length || 0), 0) || 0);
  }, 0) || 0;

  const locationName = details?.location?.name || "Unknown Location";
  const locationAddress = details?.location?.address || "";
  const rooms = details?.rooms || [];
  const additionalTasks = details?.additional_tasks || [];

  if (isLoading) {
    return <CleaningPlanDetailsSkeleton />;
  }

  if (!details) {
    return (
      <div className="p-8 text-center text-slate-500">
        {t.cleaningPlan.planNotFound}
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-slate-50/30 rounded-xl overflow-hidden border border-slate-200">
      <CleaningPlanDetailsHeader
        details={details}
        formattedDate={createdDate}
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-4">
        <CleaningPlanDetailsStats duration={duration} roomsCount={roomsCount} tasksCount={tasksCount} photosCount={photosCount} t={t} />

        <div className="space-y-4">
          <CleaningPlanLocationCard label={t.cleaningPlan.location} name={locationName} address={locationAddress} />

          <CleaningPlanRoomsSection rooms={rooms} roomsCount={roomsCount} t={t} />

          {additionalTasks && additionalTasks.length > 0 && (
            <CleaningPlanAdditionalTasksSection additionalTasks={additionalTasks} locale={params?.locale || "en"} />
          )}
        </div>
      </div>
    </div>
  );
}
