"use client";

import React from "react";
import { Button, Modal } from "antd";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";

interface DeleteServiceModalProps {
  name: string;
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteServiceModal({ name, saving, onClose, onConfirm }: DeleteServiceModalProps) {
  const params = useParams();
  const t = getTranslation(params?.locale as string);
  return (
    <Modal
      open
      title={t.services.noRequestsTitle}
      closable={!saving}
      maskClosable={!saving}
      onCancel={onClose}
      footer={[
        <Button key="cancel" disabled={saving} onClick={onClose} className="text-xs">
          {t.common.cancel}
        </Button>,
        <Button key="delete" type="primary" danger loading={saving} onClick={onConfirm} className="text-xs">
          {t.common.delete}
        </Button>,
      ]}
    >
      <p className="text-xs text-slate-500 py-2">
        {t.services.noRequestsSubtitle} <b className="text-slate-800">{name}</b>
      </p>
    </Modal>
  );
}
