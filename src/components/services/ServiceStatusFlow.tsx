import { TbChevronRight } from "react-icons/tb";

export function ServiceStatusFlow({ label, steps }: { label: string; steps: string[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <span key={step} className="contents">
            <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              {step}
            </span>
            {index < steps.length - 1 && <TbChevronRight className="text-slate-300" />}
          </span>
        ))}
      </div>
    </section>
  );
}
