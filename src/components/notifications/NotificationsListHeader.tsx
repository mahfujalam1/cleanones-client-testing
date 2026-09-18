import { Button, Checkbox } from "antd";
import { TbTrash } from "react-icons/tb";

export function NotificationsListHeader({
  unreadCount,
  hasItems,
  allSelected,
  isIndeterminate,
  selectedCount,
  bulkDeleting,
  loading,
  onSelectAll,
  onBulkDelete,
}: {
  unreadCount: number;
  hasItems: boolean;
  allSelected: boolean;
  isIndeterminate: boolean;
  selectedCount: number;
  bulkDeleting: boolean;
  loading: boolean;
  onSelectAll: (checked: boolean) => void;
  onBulkDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-lg font-bold text-slate-900">Notifications</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Review your activity updates.
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {hasItems && (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={allSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => onSelectAll(e.target.checked)}
            disabled={bulkDeleting || loading}
          >
            <span className="text-xs font-medium text-slate-700">Select All</span>
          </Checkbox>
          {selectedCount > 0 && (
            <Button
              danger
              size="small"
              type="primary"
              icon={<TbTrash />}
              loading={bulkDeleting}
              onClick={onBulkDelete}
              className="text-xs font-semibold"
            >
              Delete Selected ({selectedCount})
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
