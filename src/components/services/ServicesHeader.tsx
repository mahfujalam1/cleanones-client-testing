import { Button } from "antd";
import { TbPlus } from "react-icons/tb";

export function ServicesHeader({ title, subtitle, requestLabel, onRequest }: { title: string; subtitle: string; requestLabel: string; onRequest: () => void }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-base font-bold text-slate-900">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
      <Button
        type="primary"
        icon={<TbPlus />}
        onClick={onRequest}
        className="text-xs font-semibold"
      >
        {requestLabel}
      </Button>
    </header>
  );
}
