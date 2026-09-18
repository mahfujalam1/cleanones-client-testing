"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useGetClientMyLiveStatusQuery } from "@/redux/apis/clientOverview";
import type { LiveShift } from "@/components/rooms/liveStatusTypes";
import { LiveStatusPageShell } from "@/components/rooms/LiveStatusPageShell";
import { LiveStatusSkeleton } from "@/components/rooms/LiveStatusSkeleton";
import { LiveStatusEmptyState } from "@/components/rooms/LiveStatusEmptyState";
import { ShiftSwitcher } from "@/components/rooms/ShiftSwitcher";
import { ShiftDetail } from "@/components/rooms/ShiftDetail";

export default function LiveStatusPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const { data: res, isLoading, refetch } = useGetClientMyLiveStatusQuery();


  const shifts: LiveShift[] = res?.data ?? [];
  const empty = !isLoading && shifts.length === 0;


  const [activeId, setActiveId] = useState<string | null>(null);
  const activeShift = shifts.find((s) => s._id === activeId) ?? shifts[0] ?? null;

  if (isLoading && !res) {
    return (
      <LiveStatusPageShell t={t}>
        <LiveStatusSkeleton />
      </LiveStatusPageShell>
    );
  }

  if (empty) {
    return (
      <LiveStatusPageShell t={t}>
        <LiveStatusEmptyState t={t} onRefetch={() => void refetch()} />
      </LiveStatusPageShell>
    );
  }

  return (
    <LiveStatusPageShell t={t}>
      <div className="space-y-4">


        {shifts.length > 1 && (
          <ShiftSwitcher shifts={shifts} activeId={activeId} onSelect={setActiveId} />
        )}

        {activeShift && <ShiftDetail shift={activeShift} t={t} onRefetch={() => void refetch()} />}
      </div>
    </LiveStatusPageShell>
  );
}
