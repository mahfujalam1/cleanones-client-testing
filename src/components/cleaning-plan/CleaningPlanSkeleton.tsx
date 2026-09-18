export function CleaningPlanSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-20 rounded border border-slate-200 bg-slate-100" />
        ))}
      </div>
      <div className="h-96 rounded border border-slate-200 bg-slate-100" />
    </div>
  );
}
