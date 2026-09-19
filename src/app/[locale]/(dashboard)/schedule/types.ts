export type RosterView = "day" | "week" | "month";

export type ShiftStatus =
  | "upcoming"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "unstaffed"
  | string;

export interface RosterWorker {
  worker_id: string;
  name: string;
  role: "Team leader" | "Co-leader" | "Normal worker" | string;
}

export interface RosterShift {
  date: string;
  shift_id: string | null;
  is_virtual: boolean;
  status: ShiftStatus;
  start_time: string | null;
  end_time: string | null;
  duration_minutes: number;
  rooms: { total: number; completed: number };
  tasks: { total: number; completed: number };
  assigned_workers: RosterWorker[];
}

export interface RosterCleaningPlan {
  plan_id: string;
  plan_title: string;
  location_name: string;
  total_shifts_in_range: number;
  total_hours_in_range: number;
  shifts: RosterShift[];
}

export interface RosterMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  total_shifts: number;
}

export interface ClientRosterData {
  view: RosterView;
  start_date: string;
  end_date: string;
  meta: RosterMeta;
  cleaning_plans: RosterCleaningPlan[];
}


export interface Shift {
  id: string;
  shiftId?: string | null;
  planId?: string;
  planTitle?: string;
  workerName: string;
  workerId?: string;
  workerRole?: string;
  location: string;
  locationAddress?: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: string | null;
  endAt: string | null;
  durationMinutes?: number;
  status?: ShiftStatus;
  isVirtual?: boolean;
  roomsCount?: number;
  roomsCompleted?: number;
  tasksCount?: number;
  tasksCompleted?: number;
  assignedWorkers?: Array<{ name: string; role?: string }>;
}

export function formatTimeLabel(iso?: string | null, locale = "en"): string {
  if (!iso) return "--";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--";
  return d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
}

export function localMinutesOfDay(iso?: string | null): number {
  if (!iso) return 0;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 0;
  return d.getHours() * 60 + d.getMinutes();
}

export function isOvernightShift(startIso?: string | null, endIso?: string | null): boolean {
  if (!startIso || !endIso) return false;
  const s = new Date(startIso);
  const e = new Date(endIso);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return false;
  return e.getDate() !== s.getDate() || e.getMonth() !== s.getMonth() || e.getFullYear() !== s.getFullYear();
}

export function hoursFromMinutes(minutes: number): string {
  return (minutes / 60).toFixed(1);
}

export function mapRosterToShifts(plans: RosterCleaningPlan[]): Shift[] {
  const out: Shift[] = [];
  for (const plan of plans) {
    for (const shift of plan.shifts ?? []) {
      const leader = shift.assigned_workers?.[0];
      const isVirtual = Boolean(shift.is_virtual || shift.status === "unstaffed");
      out.push({
        id: shift.shift_id || `${plan.plan_id}-${shift.date}-${shift.start_time || "unstaffed"}`,
        shiftId: shift.shift_id,
        planId: plan.plan_id,
        planTitle: plan.plan_title,
        workerName: leader?.name || (isVirtual ? "Unstaffed" : plan.plan_title),
        workerId: leader?.worker_id,
        workerRole: leader?.role,
        location: plan.location_name,
        date: shift.date,
        startTime: formatTimeLabel(shift.start_time),
        endTime: formatTimeLabel(shift.end_time),
        startAt: shift.start_time,
        endAt: shift.end_time,
        durationMinutes: shift.duration_minutes,
        status: shift.status,
        isVirtual,
        roomsCount: shift.rooms?.total ?? 0,
        roomsCompleted: shift.rooms?.completed ?? 0,
        tasksCount: shift.tasks?.total ?? 0,
        tasksCompleted: shift.tasks?.completed ?? 0,
        assignedWorkers: (shift.assigned_workers ?? []).map((w) => ({
          name: w.name,
          role: w.role,
        })),
      });
    }
  }
  return out;
}

export function sumPlanHours(plans: RosterCleaningPlan[]): number {
  return plans.reduce((acc, p) => acc + (p.total_hours_in_range || 0), 0);
}
