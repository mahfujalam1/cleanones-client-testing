export const DashboardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 w-48 rounded bg-slate-200" />
    <div className="h-44 rounded-xl border border-slate-200 bg-slate-100" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
  </div>
);
