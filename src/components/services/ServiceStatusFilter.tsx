import { Select } from "antd";

export function ServiceStatusFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-2 rounded-xl border border-slate-200 bg-white p-3">
      <Select
        aria-label="Filter by status"
        value={value}
        options={options}
        onChange={onChange}
        className="w-44"
        size="small"
      />
    </div>
  );
}
