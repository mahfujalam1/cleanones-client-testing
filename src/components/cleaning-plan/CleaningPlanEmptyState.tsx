import { TbCalendar } from "react-icons/tb";

export function CleaningPlanEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-slate-200">
      <span className="rounded-full border border-sky-100 bg-sky-50 p-4 text-2xl text-sky-400">
        <TbCalendar />
      </span>
      <h2 className="mt-4 text-sm font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}
