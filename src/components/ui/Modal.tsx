import React from "react";
import { Modal as AntdModal } from "antd";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  return (
    <AntdModal
      open={isOpen}
      onCancel={onClose}
      title={<span className="text-sm font-semibold text-slate-800">{title}</span>}
      footer={footer}
      destroyOnHidden
      centered
      width={480}
      styles={{
        mask: {
          backdropFilter: "none",
          backgroundColor: "rgba(15, 23, 42, 0.28)",
        },
      }}
    >
      <div className="pt-2">{children}</div>
    </AntdModal>
  );
}
