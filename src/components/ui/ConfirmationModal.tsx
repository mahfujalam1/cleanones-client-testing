"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { getTranslation } from "@/utils/translations";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  danger = false,
}: ConfirmationModalProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = getTranslation(locale);

  const resolvedConfirmText = confirmText || t?.common?.submit || "Confirm";
  const resolvedCancelText = cancelText || t?.common?.cancel || "Cancel";
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={null}>
      <div className="space-y-4">
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          {message}
        </p>
        <div className="flex justify-end gap-3 pt-2 select-none">
          <Button type="button" variant="outline" onClick={onClose}>
            {resolvedCancelText}
          </Button>
          <Button
            type="button"
            variant={danger ? "secondary-red" : "primary"}
            onClick={handleConfirm}
          >
            {resolvedConfirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
