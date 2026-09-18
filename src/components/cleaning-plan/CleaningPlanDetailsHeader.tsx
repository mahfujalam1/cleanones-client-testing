import { TbClipboardList } from "react-icons/tb";

export function CleaningPlanDetailsHeader({
  details,
  formattedDate,
  timeStr,
  endTimeStr,
  onBack,
}: {
  details: any;
  formattedDate: string;
  timeStr: string;
  endTimeStr: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-start justify-between p-4 bg-white border-b border-slate-200">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#009EE2]">
          <TbClipboardList className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800 leading-tight">{details.title || "Deep Clean"}</h2>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100">
              {details.status || "Active"}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            ID: {details._id?.slice(0, 10)} • {formattedDate} ({timeStr} - {endTimeStr})
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="ml-2 p-1 text-slate-400 hover:text-slate-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
