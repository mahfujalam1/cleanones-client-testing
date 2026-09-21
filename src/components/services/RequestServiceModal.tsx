"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import { TbSparkles } from "react-icons/tb";
import { useGetClientScheduleQuery } from "@/redux/apis/clientSchedule";
import {
  useCreateAdditionalTaskMutation,
  useUpdateAdditionalTaskMutation,
} from "@/redux/apis/additionalTask";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";

interface RequestServiceModalProps {
  initialTitle?: string;
  initialDescription?: string;
  editingId?: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export function RequestServiceModal({
  initialTitle = "",
  initialDescription = "",
  editingId = null,
  onClose,
  onSuccess,
  onError,
}: RequestServiceModalProps) {
  const params = useParams();
  const t = getTranslation(params?.locale as string);

  const [planId, setPlanId] = useState<string>("");
  const [name, setName] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dateTime, setDateTime] = useState<string>(new Date().toISOString().slice(0, 16));

  const { data: plansRes, isFetching: loadingPlans } = useGetClientScheduleQuery({ limit: 100 });
  const plans = Array.isArray(plansRes?.data?.result) ? plansRes.data.result : [];

  const [submitting, setSubmitting] = useState(false);
  const [createAdditionalTaskMutation] = useCreateAdditionalTaskMutation();
  const [updateAdditionalTaskMutation] = useUpdateAdditionalTaskMutation();

  useEffect(() => {
    if (plans.length > 0 && !planId) {
      setPlanId(plans[0]._id);
    }
  }, [plans, planId]);

  const canSubmit = Boolean(name.trim() && planId && dateTime && !submitting);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      const payload = {
        cleaning_plan_id: planId,
        name: name.trim(),
        description: description.trim(),
        is_photo_required: false,
        photo_requirements: [],
        date_time: new Date(dateTime).toISOString(),
      };

      if (editingId) {
        await updateAdditionalTaskMutation({
          id: editingId,
          body: payload,
        }).unwrap();
      } else {
        await createAdditionalTaskMutation(payload).unwrap();
      }

      setSubmitting(false);
      onSuccess();
    } catch (err: unknown) {
      setSubmitting(false);
      const errObj = err as { data?: { message?: string }; message?: string };
      onError(errObj?.data?.message || errObj?.message || "Failed to submit request.");
    }
  };

  return (
    <Modal
      open
      title={null}
      footer={null}
      width={600}
      centered
      destroyOnHidden
      closable={!submitting}
      onCancel={onClose}
      className="custom-modal"
      styles={{
        body: { padding: 0, overflow: "hidden", borderRadius: "16px" },
      }}
    >
      <form onSubmit={handleSubmit} className="flex max-h-[85vh] flex-col text-xs">
        
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 bg-white shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-xl shrink-0">
            <TbSparkles />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {editingId ? t.common.edit : t.services.requestService}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">{t.serviceCards.selectPlan} *</label>
              {plans.length > 0 && (
                <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                  {plans.length} {t.serviceCards.plansAvailable}
                </span>
              )}
            </div>
            <Select
              value={planId || undefined}
              onChange={setPlanId}
              loading={loadingPlans}
              placeholder="Select Cleaning Plan"
              className="w-full h-9"
              options={plans.map((p: any) => ({
                value: p._id,
                label: p.title || p.name || `Plan ${p._id.slice(0, 8)}`,
              }))}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">{t.serviceCards.taskName} *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vacuum hallway carpet"
              className="text-xs h-9"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">{t.services.description}</label>
            <Input.TextArea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.services.description}
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">{t.serviceCards.dateTime} *</label>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="text-xs h-9"
            />
          </div>

        </div>

        
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4 bg-white shrink-0">
          <Button disabled={submitting} onClick={onClose} className="text-xs">
            {t.common.cancel}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            disabled={!canSubmit}
            className="text-xs font-semibold"
          >
            {editingId ? t.common.save : t.services.submitRequest}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
