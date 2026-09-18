export function CleaningPlanHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header>
      <h1 className="text-base font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </header>
  );
}
