export interface ShiftRoom {
  room: string;
  name: string;
  room_type: string;
  total_task: number;
  completed_task: number;
  progress_percent: number;
}
export interface AssignedWorker {
  worker: string;
  name: string;
  role: string;
  check_in_at: string;
  check_out_at: string;
}
export interface ShiftLocation {
  location: string;
  name: string;
  coordinates?: { type: string; coordinates: number[] };
}
export interface LiveShift {
  _id: string;
  cleaning_plan: string;
  date: string;
  date_time: string;
  location: ShiftLocation;
  duration_minutes: number;
  assigned_workers: AssignedWorker[];
  status: string;
  total_room: number;
  completed_room: number;
  total_task: number;
  overall_progress_percent: number;
  rooms: ShiftRoom[];
}
