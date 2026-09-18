import { TbCheck, TbClock, TbCalendar, TbCamera } from "react-icons/tb";

export function CleaningPlanAdditionalTaskItem({ task, taskDateStr }: { task: any; taskDateStr: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-slate-300 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <b className="block text-sm font-bold text-slate-800">{task.name}</b>
          {task.description && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">

          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold rounded px-2 py-1 border ${task.is_completed
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-slate-50 text-slate-600 border-slate-200"
            }`}>
            <TbCheck className="h-3 w-3" /> {task.is_completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-md bg-slate-50 border border-slate-200/80 p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
            <TbClock className="h-3.5 w-3.5 text-amber-600" /> +{task.duration_minutes || 0}m Additional Duration
          </span>
          <span className="text-[10px] text-slate-400">•</span>
          <span className="text-[11px] text-slate-600 flex items-center gap-1">
            <TbCalendar className="h-3.5 w-3.5 text-slate-400" /> {taskDateStr}
          </span>
        </div>

      </div>

      {task.is_photo_required && (
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mb-1.5">
            <TbCamera className="h-3.5 w-3.5 text-orange-500" />
            <span>Photo Requirements ({task.photo_requirements?.length || 0})</span>
          </div>
          {task.photo_requirements && task.photo_requirements.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {task.photo_requirements.map((req: any, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-600"
                >
                  <span>📷</span>
                  <span className="font-medium">{req.title || `Requirement ${idx + 1}`}</span>
                  {req.is_uploaded && (
                    <span className="text-emerald-600 font-bold ml-1">✓ Uploaded</span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[10px] text-slate-400">Photo verification required upon completion</span>
          )}
        </div>
      )}
    </div>
  );
}
