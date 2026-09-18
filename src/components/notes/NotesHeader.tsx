import { Button } from "antd";
import { TbPlus } from "react-icons/tb";

export function NotesHeader({ title, subtitle, addLabel, onAdd }: { title: string; subtitle: string; addLabel: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-lg font-bold leading-tight text-slate-900">{title}</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
      <Button
        type="primary"
        icon={<TbPlus />}
        onClick={onAdd}
        className="shrink-0 text-xs font-semibold"
      >
        {addLabel}
      </Button>
    </div>
  );
}
