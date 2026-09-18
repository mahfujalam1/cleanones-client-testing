export function CleaningPlanDetailsSkeleton() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-12 w-64 bg-slate-200 rounded"></div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-200 rounded"></div>)}
      </div>
    </div>
  );
}
