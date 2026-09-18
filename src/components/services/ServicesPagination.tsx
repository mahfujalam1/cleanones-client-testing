import { Pagination } from "antd";

export function ServicesPagination({
  page,
  limit,
  total,
  showingLabel,
  ofLabel,
  onPageChange,
}: {
  page: number;
  limit: number;
  total: number;
  showingLabel: string;
  ofLabel: string;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500">
      <span>{showingLabel} {(page - 1) * limit + 1}–{Math.min(page * limit, total)} {ofLabel} {total}</span>
      <Pagination current={page} pageSize={limit} total={total} showSizeChanger={false} size="small" onChange={onPageChange} />
    </div>
  );
}
