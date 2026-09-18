import { Button } from "antd";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

export function NotificationsListPagination({
  page,
  totalPages,
  totalLabel,
  loading,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  totalLabel: string;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
      <span className="text-[10px] text-slate-400">
        {totalLabel}
      </span>
      <div className="flex gap-2">
        <Button
          icon={<TbChevronLeft />}
          disabled={page === 1 || loading}
          onClick={onPrevious}
          className="text-xs"
        >
          Previous
        </Button>
        <Button
          icon={<TbChevronRight />}
          iconPosition="end"
          disabled={page >= totalPages || loading}
          onClick={onNext}
          className="text-xs"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
