"use client";

import React from "react";
import { Button, Modal } from "antd";
import { TbCamera, TbClock, TbCalendar } from "react-icons/tb";
import type { AdditionalTask } from "@/types/api";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import {
  getRequestStatusLabel,
  getRequestStatusTone,
  getWorkStatusTone,
} from "@/components/services/serviceStatus";

interface ServiceDetailsModalProps {
  item: AdditionalTask;
  loading: boolean;
  onClose: () => void;
}

export function ServiceDetailsModal({ item, loading, onClose }: ServiceDetailsModalProps) {
  const params = useParams();
  const t = getTranslation(params?.locale as string);
  const requestStatus = getRequestStatusLabel(item, t.serviceCards.pending);
  const workStatus = item.is_completed ? t.serviceCards.workCompleted : t.serviceCards.incomplete;

  return (
    <Modal
      open
      title={null}
      width={600}
      centered
      onCancel={onClose}
      footer={<Button onClick={onClose} className="text-xs">{t.common.cancel}</Button>}
      className="custom-modal"
      styles={{
        body: { maxHeight: "80vh", overflowY: "auto", paddingRight: "4px" },
      }}
    >
      {loading ? (
        <div className="mt-3 h-56 animate-pulse rounded-lg border border-slate-200 bg-slate-100" />
      ) : (
        <div className="space-y-4 pt-2 text-xs text-slate-700">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${getRequestStatusTone(requestStatus)}`}>
                  {requestStatus}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${getWorkStatusTone(item.is_completed)}`}>
                  {workStatus}
                </span>
              </div>

            </div>
          </div>

          
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.services.description}</p>
            <p className="text-xs font-medium text-slate-800 leading-relaxed whitespace-pre-line">
              {item.description || t.services.noRequests}
            </p>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600">
            {item.date_time && (
              <div className="flex items-start gap-1.5">
                <TbCalendar className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">{t.schedule.shiftDate}</span>
                  <span className="font-medium text-slate-800">
                    {new Date(item.date_time).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
            {(item.duration_minutes ?? 0) > 0 && (
              <div className="flex items-start gap-1.5">
                <TbClock className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">{t.common.hours}</span>
                  <span className="font-medium text-slate-800">{item.duration_minutes} min</span>
                </div>
              </div>
            )}
            {item.is_photo_required && (
              <div className="flex items-start gap-1.5">
                <TbCamera className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">{t.serviceCards.photo}</span>
                  <span className="font-medium text-slate-800">{t.serviceCards.yes}</span>
                </div>
              </div>
            )}
          </div>

          
        </div>
      )}
    </Modal>
  );
}
