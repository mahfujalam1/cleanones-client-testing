import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 border-b border-slate-200 pb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </h3>
  );
}

export function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50/60 p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-sky-100 bg-sky-50 text-sky-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-xs font-semibold text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}

export function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-3 first:pl-0 last:pr-0 sm:py-1">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-semibold text-slate-800">{value || "—"}</p>
    </div>
  );
}
