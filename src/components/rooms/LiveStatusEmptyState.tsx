import { Button } from "antd";
import { TbBroadcastOff, TbRefresh } from "react-icons/tb";

export function LiveStatusEmptyState({ t, onRefetch }: { t: any; onRefetch: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded border border-slate-200 bg-white px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-2xl text-sky-500">
        <TbBroadcastOff />
      </span>
      <h2 className="mt-4 text-sm font-bold text-slate-800">{t.rooms.noLiveSession}</h2>
      <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">{t.rooms.noLiveSessionDesc}</p>
      <Button icon={<TbRefresh />} onClick={onRefetch} className="mt-4 text-xs font-semibold text-sky-600">
        {t.rooms.checkAgain}
      </Button>
    </div>
  );
}
