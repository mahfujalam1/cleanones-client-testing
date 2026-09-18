import { Pagination } from "antd";

export function CleaningPlanPagination({
  page,
  limit,
  totalCount,
  onPageChange,
  t,
}: {
  page: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  t: any;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
      <span>
        {t.cleaningPlan.showing} {(page - 1) * limit + 1}–{Math.min(page * limit, totalCount)} {t.cleaningPlan.of} {totalCount}
      </span>
      <Pagination
        current={page}
        pageSize={limit}
        total={totalCount}
        showSizeChanger={false}
        size="small"
        onChange={onPageChange}
      />
    </div>
  );
}
