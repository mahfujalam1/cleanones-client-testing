import { TbClock, TbMapPin, TbClipboardList, TbDoor } from "react-icons/tb";

export function CleaningPlanCard({ plan, onDetails, t }: { plan: any; onDetails: () => void; t: any }) {
  const dateObj = new Date(plan.date_time || plan.createdAt);
  const formattedDate = `${dateObj.toISOString().split("T")[0]} - ${dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;

  const clientName = plan.client?.name || plan.client || "Veldhoven Groep";
  const locationName = plan.location?.name || plan.location || "Campus Eindhoven";
  const rooms = plan.rooms?.length > 0 ? plan.rooms : ["Toiletgroep", "Serverruimte"];
  const duration = plan.max_estimated_duration || 30;
  const tasksCount = plan.total_tasks ?? plan.total_task ?? 0;
  const photosCount = 0;

  return (
    <div className="flex flex-col bg-white rounded-md transition-shadow">
      <div className="p-4 flex-1" onClick={onDetails} style={{ cursor: "pointer" }}>

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

            </div>
          </div>
        </div>

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
