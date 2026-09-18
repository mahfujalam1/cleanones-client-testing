export function ServicesSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
  );
}
