import { TbClock, TbDoor, TbCheck, TbCamera } from "react-icons/tb";

export function CleaningPlanDetailsStats({
  duration,
  roomsCount,
  tasksCount,
  photosCount,
  t,
}: {
  duration: number;
  roomsCount: number;
  tasksCount: number;
  photosCount: number;
  t: any;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4">
        <TbClock className="h-6 w-6 text-[#009EE2]" />
        <div>
          <b className="block text-xl text-slate-800 leading-none mb-1">{duration}m</b>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t.cleaningPlan.duration}</span>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4">
        <TbDoor className="h-6 w-6 text-[#009EE2]" />
        <div>
          <b className="block text-xl text-slate-800 leading-none mb-1">{roomsCount}</b>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t.cleaningPlan.rooms}</span>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4">
        <TbCheck className="h-6 w-6 text-[#009EE2]" />
        <div>
          <b className="block text-xl text-slate-800 leading-none mb-1">{tasksCount}</b>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t.cleaningPlan.tasks}</span>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4">
        <TbCamera className="h-6 w-6 text-[#009EE2]" />
        <div>
          <b className="block text-xl text-slate-800 leading-none mb-1">{photosCount}</b>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t.cleaningPlan.photos}</span>
        </div>
      </div>
    </div>
  );
}
