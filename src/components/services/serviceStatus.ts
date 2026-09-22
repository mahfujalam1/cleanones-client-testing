import type { AdditionalTask } from "@/types/api";

export function getRequestStatusLabel(item: AdditionalTask, fallback: string) {
  return item.status?.trim() || fallback;
}

export function getRequestStatusTone(status?: string) {
  const value = (status || "").toLowerCase();
  if (value === "approved") return "bg-sky-100 text-sky-700";
  if (value === "rejected") return "bg-red-100 text-red-700";
  if (value === "completed") return "bg-emerald-100 text-emerald-700";
  return "bg-amber-100 text-amber-700";
}

export function getWorkStatusTone(isCompleted: boolean) {
  return isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600";
}

export function isAdditionalTaskEditable(item: AdditionalTask) {
  if (item.is_completed) return false;
  const status = (item.status || "").toLowerCase();
  if (status) return status === "pending";
  return !item.is_approved;
}
