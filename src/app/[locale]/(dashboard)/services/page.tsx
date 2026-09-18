"use client";

import { useState } from "react";
import { message } from "antd";
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
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServiceStatusFlow } from "@/components/services/ServiceStatusFlow";
import { ServiceStatusFilter } from "@/components/services/ServiceStatusFilter";
import { ServicesSkeleton } from "@/components/services/ServicesSkeleton";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesEmptyState } from "@/components/services/ServicesEmptyState";
import { ServicesPagination } from "@/components/services/ServicesPagination";

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
      <ServicesHeader
        title={t.services.title}
        subtitle={t.services.subtitle}
        requestLabel={t.services.requestService}
        onRequest={() => {
          setEditingItem(null);
          setShowModal(true);
        }}
      />

      <ServiceStatusFlow label={t.services.requestStatusFlow} steps={statusFlow} />

      <ServiceStatusFilter
        value={status}
        options={statusOptions}
        onChange={(val) => {
          setStatus(val);
          setPage(1);
        }}
      />



      {loading ? (
        <ServicesSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <ServiceCard
              key={item._id}
              item={item}
              t={t}
              onView={() => openDetails(item)}
              onEdit={() => {
                setEditingItem(item);
                setShowModal(true);
              }}
              onDelete={() => setDeleteTarget(item)}
            />
          ))}

          {!items.length && (
            <ServicesEmptyState
              title={t.services.noRequestsTitle}
              subtitle={t.services.noRequestsSubtitle}
              requestLabel={t.services.requestService}
              onRequest={() => setShowModal(true)}
            />
          )}
        </div>
      )}

      {total > 0 && (
        <ServicesPagination
          page={page}
          limit={limit}
          total={total}
          showingLabel={t.cleaningPlan.showing}
          ofLabel={t.cleaningPlan.of}
          onPageChange={setPage}
        />
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
