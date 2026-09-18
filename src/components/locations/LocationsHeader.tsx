import { TbMapPin } from "react-icons/tb";

export function LocationsHeader({ title, total, subtitle }: { title: string; total: number; subtitle: string }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-[#009EE2]">
          <TbMapPin className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-base font-bold leading-tight text-slate-900">{title}</h1>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{total}</span>
          </div>
          <p className="truncate text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
