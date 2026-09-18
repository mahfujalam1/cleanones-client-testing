import { TbEye } from "react-icons/tb";
import { MdOutlineChecklist, MdOutlinePlace, MdOutlineSchedule, MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import type { AdditionalTask } from "@/types/api";

export function ServiceCard({
  item,
  t,
  onView,
  onEdit,
  onDelete,
}: {
  item: AdditionalTask;
  t: any;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const statusLabel = item.is_completed ? t.serviceCards.completed : item.is_approved ? t.serviceCards.approved : t.serviceCards.pending;
  const editable = !item.is_completed && !item.is_approved;

  return (
    <div className="group relative h-full w-full">
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
            onView();
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
                onEdit();
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
                onDelete();
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
}
