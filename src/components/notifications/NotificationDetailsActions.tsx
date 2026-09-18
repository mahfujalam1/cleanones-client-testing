import { Button, Tooltip } from "antd";
import { TbChevronLeft, TbTrash } from "react-icons/tb";

export function NotificationDetailsActions({
  t,
  showDelete,
  deleting,
  onBack,
  onDelete,
}: {
  t: any;
  showDelete: boolean;
  deleting: boolean;
  onBack: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        icon={<TbChevronLeft />}
        onClick={onBack}
        className="text-xs"
      >
        {t.notificationsPage.backTo}
      </Button>
      {showDelete && (
        <Tooltip title="Delete notification">
          <Button
            danger
            icon={<TbTrash />}
            loading={deleting}
            onClick={onDelete}
            className="text-xs"
          >
            {t.notificationsPage.delete}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
