export function LiveStatusSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[55, 70, 90, 280].map((height) => (
        <div key={height} className="rounded border border-slate-200 bg-slate-100" style={{ height }} />
      ))}
    </div>
  );
}
