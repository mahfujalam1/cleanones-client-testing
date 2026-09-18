import { TbMapPin } from "react-icons/tb";

export function CleaningPlanLocationCard({
  label,
  name,
  address,
}: {
  label: string;
  name: string;
  address: string;
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</h3>
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-sky-50 text-[#009EE2] flex items-center justify-center shrink-0">
            <TbMapPin className="h-4 w-4" />
          </div>
          <div>
            <b className="block text-xs text-slate-800">{name}</b>
            {address && (
              <p className="text-[10px] text-slate-500 mt-0.5">{address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
