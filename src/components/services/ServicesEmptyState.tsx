import { Button } from "antd";
import { TbPlus, TbSparkle } from "react-icons/tb";

export function ServicesEmptyState({
  title,
  subtitle,
  requestLabel,
  onRequest,
}: {
  title: string;
  subtitle: string;
  requestLabel: string;
  onRequest: () => void;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <span className="rounded-full bg-sky-50 p-4 text-2xl text-sky-500">
        <TbSparkle />
      </span>
      <h3 className="mt-3 text-sm font-bold text-slate-800">{title}</h3>
      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      <Button type="primary" icon={<TbPlus />} onClick={onRequest} className="mt-4 text-xs">
        {requestLabel}
      </Button>
    </div>
  );
}
