import { TbSparkles } from "react-icons/tb";
import { CleaningPlanAdditionalTaskItem } from "./CleaningPlanAdditionalTaskItem";

export function CleaningPlanAdditionalTasksSection({ additionalTasks, locale }: { additionalTasks: any[]; locale: string }) {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-bold text-slate-700 flex items-center gap-2 uppercase tracking-widest">
          <TbSparkles className="h-4 w-4 text-amber-500" /> Additional Tasks ({additionalTasks.length})
        </h3>

      </div>

      <div className="space-y-3">
        {additionalTasks.map((task: any) => {
          const taskDate = task.date_time ? new Date(task.date_time) : null;
          const taskDateStr = taskDate
            ? `${taskDate.toLocaleDateString(locale || "en", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} at ${taskDate.toLocaleTimeString(locale || "en", { hour: "2-digit", minute: "2-digit" })}`
            : "Scheduled Date";

          return <CleaningPlanAdditionalTaskItem key={task._id} task={task} taskDateStr={taskDateStr} />;
        })}
      </div>
    </div>
  );
}
