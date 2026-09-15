import React from "react";
import { CleaningTask } from "@/redux/slices/liveSlice";
import { TbLoader, TbCircle, TbCircleCheckFilled } from "react-icons/tb";

interface LiveTaskItemProps {
  task: CleaningTask;
  onClick: () => void;
}

export function LiveTaskItem({ task, onClick }: LiveTaskItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 transition-colors cursor-pointer ${
        task.status === "in_progress"
          ? "bg-secondary-light/30 hover:bg-secondary-light/40"
          : "hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {task.status === "completed" && (
          <TbCircleCheckFilled className="w-5 h-5 text-emerald-500 shrink-0" />
        )}
        {task.status === "in_progress" && (
          <TbLoader className="w-5 h-5 text-secondary animate-spin shrink-0" />
        )}
        {task.status === "pending" && (
          <TbCircle className="w-5 h-5 text-slate-300 shrink-0" />
        )}
        <span
          className={`text-xs font-semibold ${
            task.status === "completed" ? "text-slate-500 line-through" : "text-slate-800"
          }`}
        >
          {task.name}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[10px]">
        {task.timestamp && <span className="text-slate-500">{task.timestamp}</span>}
        {task.status === "in_progress" && (
          <span className="bg-secondary-light text-secondary border border-secondary/15 px-2 py-0.5 rounded font-bold uppercase tracking-wider scale-90">
            Active
          </span>
        )}
        {task.status === "completed" && (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider scale-90">
            Done
          </span>
        )}
        {task.status === "pending" && (
          <span className="bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider scale-90">
            Pending
          </span>
        )}
      </div>
    </div>
  );
}
