import { TbRefresh, TbClock, TbCamera } from "react-icons/tb";

export function CleaningPlanTaskItem({ task, t }: { task: any; t: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <b className="block text-sm text-slate-800 mb-3">{task.name}</b>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1 text-[10px] text-[#009EE2] bg-sky-50 border border-sky-100 rounded px-2 py-1 font-medium capitalize">
          <TbRefresh className="h-3.5 w-3.5" /> {task.frequency_type}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-200 rounded px-2 py-1 font-medium">
          <TbClock className="h-3.5 w-3.5" /> {task.duration_minutes}m
        </span>
        {task.is_photo_required && (
          <span className="inline-flex items-center gap-1 text-[10px] text-orange-500 bg-orange-50 border border-orange-100 rounded px-2 py-1 font-medium">
            <TbCamera className="h-3.5 w-3.5" /> {task.photo_requirements?.length || 0} {t.cleaningPlan.photos}
          </span>
        )}
      </div>

      {task.frequency_type === 'weekly' && task.days_of_week?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {task.days_of_week.map((day: string) => (
            <span key={day} className="px-2 py-1 rounded border border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-medium capitalize min-w-[32px] text-center">
              {day}
            </span>
          ))}
        </div>
      )}

      {task.frequency_type === 'monthly' && task.days_of_month?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {task.days_of_month.map((day: number) => (
            <span key={day} className="px-2 py-1 rounded border border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-medium min-w-[32px] text-center">
              {day}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
