"use client";

import { useState } from "react";
import { message } from "antd";
import { Button, Pagination, Select } from "antd";
import { TbChevronRight, TbEdit, TbEye, TbPlus, TbTrash, TbChecklist, TbMapPin, TbCalendar, TbClock, TbSparkle, TbSparkles } from "react-icons/tb";
import { MdOutlineChecklist, MdOutlinePlace, MdOutlineSchedule, MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import {
  useGetAllAdditionalTasksQuery,
  useDeleteAdditionalTaskMutation,
} from "@/redux/apis/additionalTask";
import type { AdditionalTask } from "@/types/api";
import { RequestServiceModal } from "@/components/services/RequestServiceModal";
import { ServiceDetailsModal } from "@/components/services/ServiceDetailsModal";
import { DeleteServiceModal } from "@/components/services/DeleteServiceModal";

export default function ServicesPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const statusFlow = [
    t.services.stepPending,
    t.services.stepUnderReview,
    t.services.stepApprovedRejected,
    t.services.stepCompleted,
  ];

  const statusOptions = [
    { value: "", label: t.services.allStatuses },
    { value: "pending", label: t.services.stepPending },
    { value: "approved", label: t.services.statusApproved },
  ];

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<AdditionalTask | null>(null);
  const [details, setDetails] = useState<AdditionalTask | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdditionalTask | null>(null);
  const [deleting, setDeleting] = useState(false);
  const limit = 10;

  const { data: servicesRes, isLoading: loading, refetch } = useGetAllAdditionalTasksQuery({
    page,
    limit,
    ...(status === "approved" ? { is_approved: true } : status === "pending" ? { is_approved: false } : {}),
  });

  const [deleteAdditionalTaskMutation] = useDeleteAdditionalTaskMutation();

  const items: AdditionalTask[] = servicesRes?.data?.result || [];
  const total = servicesRes?.data?.meta?.total ?? 0;

  const openDetails = (item: AdditionalTask) => {
    setDetails(item);
  };

  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdditionalTaskMutation(deleteTarget._id).unwrap();
    } catch (err: any) {
      setError(err?.data?.message || err?.message || "Failed to delete request");
    }
    setDeleting(false);
    message.success(t.actionFeedback.deleted);
        setDeleteTarget(null);
    void refetch();
  };

  return (
    <div className="space-y-4 text-xs text-slate-700">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-bold text-slate-900">{t.services.title}</h1>
          <p className="mt-1 text-xs text-slate-500">{t.services.subtitle}</p>
        </div>
        <Button
          type="primary"
          icon={<TbPlus />}
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className="text-xs font-semibold"
        >
          {t.services.requestService}
        </Button>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {t.services.requestStatusFlow}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {statusFlow.map((step, index) => (
            <span key={step} className="contents">
              <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                {step}
              </span>
              {index < statusFlow.length - 1 && <TbChevronRight className="text-slate-300" />}
            </span>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-end gap-2 rounded-xl border border-slate-200 bg-white p-3">
        <Select
          aria-label="Filter by status"
          value={status}
          options={statusOptions}
          onChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
          className="w-44"
          size="small"
        />
      </div>

      

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => {
            const statusLabel = item.is_completed ? t.serviceCards.completed : item.is_approved ? t.serviceCards.approved : t.serviceCards.pending;
            const editable = !item.is_completed && !item.is_approved;
            return (
              <div key={item._id} className="group relative h-full w-full">
                <article
                  className="flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:ring-slate-300 hover:shadow-[0_12px_28px_-18px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex-1 p-5">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg text-slate-400 ring-1 ring-slate-200/70 transition-colors group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:ring-sky-100">
                        <MdOutlineChecklist />
                      </span>

                      <div className="min-w-0 flex-1 pr-12">
                        <div className="flex items-center gap-2.5">
                          <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-sky-600">
                            {item.name}
                          </h3>
                          <span
                            className={`shrink-0 rounded-full px-2 py-[2px] text-[11px] font-semibold tracking-wide ${
                              statusLabel === "Completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : statusLabel === "Approved"
                                ? "bg-sky-100 text-sky-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </div>

                        <div className="mt-2 space-y-1">
                          {item.cleaning_plan_id && (
                            <p className="flex items-center gap-1.5 truncate text-xs text-slate-500">
                              <span className="shrink-0 text-sm text-slate-400"><MdOutlinePlace /></span>
                              <span className="truncate">{t.serviceCards.planId}: {item.cleaning_plan_id.slice(-6).toUpperCase()}</span>
                            </p>
                          )}
                          <p className="flex items-center gap-1.5 truncate text-xs text-slate-500">
                            <span className="shrink-0 text-sm text-slate-400"><MdOutlineSchedule /></span>
                            <span className="truncate">{t.serviceCards.submitted}: {item.created_at ? new Date(item.created_at).toLocaleDateString() : (item.date_time ? new Date(item.date_time).toLocaleDateString() : "—")}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
                    <div className="min-w-0 px-2 py-2.5 text-center">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.duration_minutes > 0 ? `${item.duration_minutes}m` : "—"}</p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">{t.serviceCards.duration}</p>
                    </div>
                    <div className="min-w-0 px-2 py-2.5 text-center">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.is_photo_required ? t.serviceCards.yes : t.serviceCards.no}</p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">{t.serviceCards.photo}</p>
                    </div>
                    <div className="min-w-0 px-2 py-2.5 text-center">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.date_time ? new Date(item.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}</p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">{t.serviceCards.time}</p>
                    </div>
                  </div>
                </article>

                <div className="absolute right-2.5 top-2.5 flex items-center gap-0.5 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                  <button
                    type="button"
                    aria-label={`View ${item.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openDetails(item);
                    }}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-white/90 text-slate-400 ring-1 ring-slate-200 backdrop-blur transition-colors hover:text-sky-600"
                  >
                    <TbEye className="text-[15px]" />
                  </button>
                  {editable && (
                    <>
                      <button
                        type="button"
                        aria-label={`Edit ${item.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setEditingItem(item);
                          setShowModal(true);
                        }}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-white/90 text-slate-400 ring-1 ring-slate-200 backdrop-blur transition-colors hover:text-slate-800"
                      >
                        <MdModeEditOutline className="text-[15px]" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${item.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeleteTarget(item);
                        }}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-white/90 text-slate-400 ring-1 ring-slate-200 backdrop-blur transition-colors hover:text-red-600"
                      >
                        <MdDeleteOutline className="text-[15px]" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {!items.length && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <span className="rounded-full bg-sky-50 p-4 text-2xl text-sky-500">
                <TbSparkle />
              </span>
              <h3 className="mt-3 text-sm font-bold text-slate-800">{t.services.noRequestsTitle}</h3>
              <p className="mt-1 text-xs text-slate-400">{t.services.noRequestsSubtitle}</p>
              <Button type="primary" icon={<TbPlus />} onClick={() => setShowModal(true)} className="mt-4 text-xs">
                {t.services.requestService}
              </Button>
            </div>
          )}
        </div>
      )}

      {total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500">
          <span>{t.cleaningPlan.showing} {(page - 1) * limit + 1}–{Math.min(page * limit, total)} {t.cleaningPlan.of} {total}</span>
          <Pagination current={page} pageSize={limit} total={total} showSizeChanger={false} size="small" onChange={setPage} />
        </div>
      )}

      {showModal && (
        <RequestServiceModal
          initialTitle={editingItem?.name || ""}
          initialDescription={editingItem?.description || ""}
          editingId={editingItem?._id || null}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingItem(null);
            setPage(1);
            void refetch();
          }}
          onError={setError}
        />
      )}

      {details && <ServiceDetailsModal item={details} loading={false} onClose={() => setDetails(null)} />}
      {deleteTarget && <DeleteServiceModal name={deleteTarget.name} saving={deleting} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => void remove()} />}
    </div>
  );
}
