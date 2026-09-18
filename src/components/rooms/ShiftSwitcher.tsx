import type { LiveShift } from "@/components/rooms/liveStatusTypes";

export function ShiftSwitcher({
  shifts,
  activeId,
  onSelect,
}: {
  shifts: LiveShift[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {shifts.map((s) => (
        <button
          key={s._id}
          onClick={() => onSelect(s._id)}
          className={`rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${
            (activeId ?? shifts[0]._id) === s._id
              ? "border-sky-300 bg-sky-50 text-sky-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {s.location?.name || "Shift"}
        </button>
      ))}
    </div>
  );
}
