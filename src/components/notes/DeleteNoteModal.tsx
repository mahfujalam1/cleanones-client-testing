import { Modal } from "antd";

export function DeleteNoteModal({
  t,
  open,
  onClose,
  onConfirm,
}: {
  t: any;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onConfirm}
      title={<span className="text-sm font-semibold">{t.common.delete}</span>}
      okText={t.common.delete}
      okButtonProps={{ danger: true }}
      cancelText={t.common.cancel}
      centered
      width={420}
      destroyOnHidden
    >
      <p className="py-2 text-xs leading-5 text-slate-500">
        {t.notes.noNotes}
      </p>
    </Modal>
  );
}
