"use client";

import { useParams, useRouter } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useGetClientCleaningPlanDetailsQuery } from "@/redux/apis/clientCleaningPlans";
import { TbClipboardList, TbClock, TbDoor, TbCheck, TbCamera, TbMapPin, TbCalendar, TbRefresh, TbSparkles, TbInfoCircle } from "react-icons/tb";

export default function CleaningPlanDetailsPage() {
  const params = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const t = getTranslation(params?.locale);

  const { data: detailsRes, isLoading } = useGetClientCleaningPlanDetailsQuery(params?.id || "", { skip: !params?.id });
  const details = detailsRes?.data;

  if (isLoading) {
    return (
      <div className="animate-pulse p-4 space-y-4">
        <div className="h-12 w-64 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-200 rounded"></div>)}
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="p-8 text-center text-slate-500">
        {t.cleaningPlan.planNotFound}
      </div>
    );
  }

  const dateObj = new Date(details.date_time || details.createdAt);
  const formattedDate = dateObj.toLocaleDateString();
  const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTimeStr = details.end_date ? new Date(details.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "End";

  const duration = details.total_duration ?? details.max_estimated_duration ?? 0;
  const roomsCount = details.total_rooms ?? details.rooms?.length ?? 0;
  const tasksCount = details.total_tasks ?? 0;
  const photosCount = details.rooms?.reduce((acc: number, room: any) => {
    return acc + (room.tasks?.reduce((tAcc: number, task: any) => tAcc + (task.photo_requirements?.length || 0), 0) || 0);
  }, 0) || 0;

  const locationName = details.location?.name || "Unknown Location";
  const locationAddress = details.location?.address || "";
  const rooms = details.rooms || [];
  const additionalTasks = details.additional_tasks || [];

  return (
    <div className="flex flex-col bg-slate-50/30 rounded-xl overflow-hidden border border-slate-200">
      
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
          <button onClick={() => router.back()} className="ml-2 p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
      </div>

      
      <div className="p-4 space-y-4">
        
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

        <div className="space-y-4">

          
          <div className="flex flex-col">
            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">{t.cleaningPlan.location}</h3>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-sky-50 text-[#009EE2] flex items-center justify-center shrink-0">
                  <TbMapPin className="h-4 w-4" />
                </div>
                <div>
                  <b className="block text-xs text-slate-800">{locationName}</b>
                  {locationAddress && (
                    <p className="text-[10px] text-slate-500 mt-0.5">{locationAddress}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-[11px] font-bold text-slate-600 flex items-center gap-2 uppercase tracking-widest mb-3">
              <TbDoor className="h-4 w-4 text-[#009EE2]" /> {t.cleaningPlan.roomsAndTasks} ({roomsCount})
            </h3>
            <div className="space-y-4">
              {rooms.map((room: any) => (
                <div key={room._id} className="bg-white border border-slate-200 rounded-lg p-4">
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-white border border-slate-200 text-[#009EE2] flex items-center justify-center shadow-sm">
                        <TbDoor className="h-4 w-4" />
                      </div>
                      <div>
                        <b className="block text-sm text-slate-800">{room.name}</b>
                        <p className="text-[10px] text-slate-500 capitalize">
                          {room.room_type || 'Room'} • {room.floor != null && room.floor !== "" ? `Floor ${room.floor}` : 'Floor —'}
                          {room.cleaning_type ? ` • ${room.cleaning_type}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-2 py-1">
                        <TbClock className="text-slate-400 h-3 w-3" /> {room.total_duration || 0}m
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#009EE2] bg-sky-50 border border-sky-100 rounded px-2 py-1">
                        <TbCheck className="h-3 w-3" /> {room.total_task ?? room.tasks?.length ?? 0} {t.cleaningPlan.tasks}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-2 py-1">
                        <TbCamera className="text-slate-400 h-3 w-3" /> {room.tasks?.reduce((acc: number, t: any) => acc + (t.photo_requirements?.length || 0), 0) || 0} {t.cleaningPlan.photos}
                      </span>
                    </div>
                  </div>

                  
                  {room.tasks && room.tasks.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t.cleaningPlan.tasks}</p>
                      <div className="space-y-2">
                        {room.tasks.map((task: any) => (
                          <div key={task._id} className="bg-white border border-slate-200 rounded-lg p-4">
                            <b className="block text-sm text-slate-800 mb-3">{task.name}</b>
                            <div className="flex gap-2">
                              <span className="inline-flex items-center gap-1 text-[10px] text-[#009EE2] bg-sky-50 border border-sky-100 rounded px-2 py-1 font-medium capitalize">
                                <TbRefresh className="h-3.5 w-3.5" /> {task.frequency_type}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-200 rounded px-2 py-1 font-medium">
                                <TbClock className="h-3.5 w-3.5" /> {task.duration_minutes}m
                              </span>
                              {task.is_photo_required && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-orange-500 bg-orange-50 border border-orange-100 rounded px-2 py-1 font-medium">
                                  <TbCamera className="h-3.5 w-3.5" /> {task.photo_requirements?.length || 0} {t.cleaningPlan.photos}
                                </span>
                              )}
                            </div>

                            {task.frequency_type === 'weekly' && task.days_of_week?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {task.days_of_week.map((day: string) => (
                                  <span key={day} className="px-2 py-1 rounded border border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-medium capitalize min-w-[32px] text-center">
                                    {day}
                                  </span>
                                ))}
                              </div>
                            )}

                            {task.frequency_type === 'monthly' && task.days_of_month?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {task.days_of_month.map((day: number) => (
                                  <span key={day} className="px-2 py-1 rounded border border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-medium min-w-[32px] text-center">
                                    {day}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          
          {additionalTasks && additionalTasks.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-slate-700 flex items-center gap-2 uppercase tracking-widest">
                  <TbSparkles className="h-4 w-4 text-amber-500" /> Additional Tasks ({additionalTasks.length})
                </h3>

              </div>

              


              <div className="space-y-3">
                {additionalTasks.map((task: any) => {
                  const taskDate = task.date_time ? new Date(task.date_time) : null;
                  const taskDateStr = taskDate
                    ? `${taskDate.toLocaleDateString(params?.locale || "en", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} at ${taskDate.toLocaleTimeString(params?.locale || "en", { hour: "2-digit", minute: "2-digit" })}`
                    : "Scheduled Date";

                  return (
                    <div key={task._id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-slate-300 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <b className="block text-sm font-bold text-slate-800">{task.name}</b>
                          {task.description && (
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">

                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold rounded px-2 py-1 border ${task.is_completed
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}>
                            <TbCheck className="h-3 w-3" /> {task.is_completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>

                      
                      <div className="mt-3 rounded-md bg-slate-50 border border-slate-200/80 p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                            <TbClock className="h-3.5 w-3.5 text-amber-600" /> +{task.duration_minutes || 0}m Additional Duration
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[11px] text-slate-600 flex items-center gap-1">
                            <TbCalendar className="h-3.5 w-3.5 text-slate-400" /> {taskDateStr}
                          </span>
                        </div>
                        
                      </div>

                      
                      {task.is_photo_required && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mb-1.5">
                            <TbCamera className="h-3.5 w-3.5 text-orange-500" />
                            <span>Photo Requirements ({task.photo_requirements?.length || 0})</span>
                          </div>
                          {task.photo_requirements && task.photo_requirements.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {task.photo_requirements.map((req: any, idx: number) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-600"
                                >
                                  <span>📷</span>
                                  <span className="font-medium">{req.title || `Requirement ${idx + 1}`}</span>
                                  {req.is_uploaded && (
                                    <span className="text-emerald-600 font-bold ml-1">✓ Uploaded</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400">Photo verification required upon completion</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
