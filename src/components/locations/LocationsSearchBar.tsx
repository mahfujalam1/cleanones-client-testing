import { SearchField } from "@/components/ui/ListControls";

export function LocationsSearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2.5">
      <SearchField value={value} onChange={onChange} placeholder={placeholder} className="w-full sm:max-w-80" />
    </div>
  );
}
