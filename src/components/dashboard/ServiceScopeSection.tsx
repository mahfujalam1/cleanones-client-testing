import { TbChecklist, TbClipboardList, TbDoor, TbMapPin } from "react-icons/tb";
import { MetricCard } from "@/components/dashboard/MetricCard";

export function ServiceScopeSection({ t, totals }: { t: any; totals: any }) {
  return (
    <section className="space-y-2.5">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {t.dashboard.scopeOverview || "Service Scope & Inventory"}
        </h3>
        <p className="text-[11px] text-slate-400">
          {t.dashboard.scopeOverviewDesc || "Total facilities, rooms, and tasks configured under your service plan"}
        </p>
      </div>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <MetricCard
          icon={<TbClipboardList />}
          label={t.dashboard.cleaningPlans || "Cleaning Plans"}
          value={totals.total_cleaning_plans || 0}
          pillText={(t.dashboard.plansCount || "{count} Plans").replace(
            "{count}",
            String(totals.total_cleaning_plans || 0)
          )}
          pillColor="indigo"
          footerText={t.dashboard.cleaningPlansSub || "Active service plans"}
        />
        <MetricCard
          icon={<TbMapPin />}
          label={t.dashboard.managedLocations || "Locations"}
          value={totals.total_locations || 0}
          pillText={(t.dashboard.sitesCount || "{count} Sites").replace(
            "{count}",
            String(totals.total_locations || 0)
          )}
          pillColor="sky"
          footerText={t.dashboard.managedLocationsSub || "Active facility sites"}
        />
        <MetricCard
          icon={<TbDoor />}
          label={t.dashboard.totalRoomsScope || "Total Rooms"}
          value={totals.total_rooms || 0}
          pillText={t.dashboard.scopePill || "Scope"}
          pillColor="violet"
          footerText={t.dashboard.totalRoomsScopeSub || "Designated rooms"}
        />
        <MetricCard
          icon={<TbChecklist />}
          label={t.dashboard.totalTasksScope || "Total Tasks"}
          value={totals.total_tasks || 0}
          pillText={t.dashboard.checklistPill || "Checklist"}
          pillColor="slate"
          footerText={t.dashboard.totalTasksScopeSub || "Scheduled checklist tasks"}
        />
      </div>
    </section>
  );
}
