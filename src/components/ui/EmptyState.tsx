import React from "react";
import { TbFolderOff } from "react-icons/tb";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No data found",
  description = "There are no records to display at this time.",
  icon = <TbFolderOff className="w-8 h-8 text-slate-400" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded border border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center">
      <div className="mb-3 rounded border border-slate-100 bg-white p-2.5 text-slate-500">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
}
