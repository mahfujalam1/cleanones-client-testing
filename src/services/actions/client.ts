import { clientApi } from "@/redux/api/clientApi";
import { authenticatedRequest, type ActionResult } from "./auth";

export {
  clientApi,
  useGetClientOverviewQuery,
  useGetClientActiveProgressQuery,
  useGetClientShiftStatsQuery,
  useGetClientTotalsQuery,
  useGetClientLiveStatusQuery,
  useGetClientShiftLiveStatusQuery,
  useGetClientScheduleQuery,
  useGetClientScheduleVisitQuery,
  useGetClientScheduleRosterQuery,
  useGetClientRosterQuery,
  useGetClientLocationsQuery,
  useGetClientLocationDetailsQuery,
  useGetClientLocationRoomsQuery,
  useGetClientLocationRoomDetailsQuery,
  useGetClientExtraServicesQuery,
  useGetClientExtraServiceQuery,
  useGetClientExtraServiceLocationsQuery,
  useGetClientExtraServiceRoomsQuery,
  useGetClientCleaningPlansQuery,
  useCreateClientExtraServiceMutation,
  useUpdateClientExtraServiceMutation,
  useDeleteClientExtraServiceMutation,
  useGetClientNotificationsQuery,
  useGetClientNotificationQuery,
  useReadClientNotificationMutation,
  useDeleteClientNotificationMutation,
  useBulkDeleteClientNotificationsMutation,
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
  useGetClientSettingsQuery,
  useUpdateClientSettingsMutation,
} from "@/redux/api/clientApi";

const json = (value: unknown) => ({
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(value),
});
const qs = (values: Record<string, string | number | undefined>) => {
  const p = new URLSearchParams();
  Object.entries(values).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  return p.toString();
};

export interface ActiveProgressWorker {
  worker_id: string;
  name: string;
  role: "Team leader" | "Co-leader" | "Normal worker" | string;
  is_checked_in: boolean;
  check_in_at: string | null;
  check_out_at: string | null;
  worked_hours: number;
}

export interface ActiveProgressShift {
  shift_id: string;
  location_name: string;
  status: "upcoming" | "in_progress" | "completed" | "cancelled" | string;
  start_time: string;
  estimated_hours: number;
  rooms: { total: number; completed: number };
  tasks: { total: number; completed: number };
  workers: ActiveProgressWorker[];
}

export interface ActiveProgressData {
  date: string;
  status: "no_service" | "scheduled" | "active" | "completed" | string;
  summary: {
    total_estimated_hours: number;
    total_worked_hours: number;
    total_rooms: number;
    completed_rooms: number;
    total_tasks: number;
    completed_tasks: number;
    progress_percentage: number;
  };
  shifts: ActiveProgressShift[];
}

export interface ShiftStatsData {
  range: "today" | "this_week" | "this_month";
  date_from: string;
  date_to: string;
  total_shifts: number;
  total_completed_shifts: number;
  total_pending_shifts: number;
  total_cancelled_shifts: number;
  completion_rate: number;
}

export interface ClientTotalsData {
  total_cleaning_plans: number;
  total_locations: number;
  total_rooms: number;
  total_tasks: number;
}

export const getClientActiveProgress = async () =>
  authenticatedRequest<ActiveProgressData>("/client/active-progress", {
    method: "GET",
  });

export const getClientShiftStats = async (range: "today" | "this_week" | "this_month" = "this_week") =>
  authenticatedRequest<ShiftStatsData>(`/client/shift-stats${qs({ range })}`, {
    method: "GET",
  });

export const getClientTotals = async () =>
  authenticatedRequest<ClientTotalsData>("/client/totals", {
    method: "GET",
  });

export type DashboardOverview = {
  greeting_name: string;
  current_date_str: string;
  todays_progress: {
    hours_completed: number;
    total_hours: number;
    hours_completed_str: string;
    hours_remaining_str: string;
    rooms_completed: number;
    total_rooms: number;
    progress_percentage: number;
    status_badge: string;
    location_name: string;
    service_time_slot: string;
    tracking_note: string;
  };
  metrics_grid: {
    next_visit: {
      time_str: string;
      team_name: string;
      specialists_count: number;
    };
    on_site_now: { specialists_count: number; sub_text: string };
    last_completed: { worked_str: string; sub_text: string };
  };
  live_status: {
    active_count: number;
    specialists: Array<{
      worker_id: string;
      name: string;
      avatar: string;
      role_title: string;
      arrived_time_str: string;
      time_worked_str: string;
      percentage_assigned_time: number;
    }>;
  };
  quick_actions: Array<{
    id: string;
    title: string;
    subtitle: string;
    action_type: string;
  }>;
  next_visitors: {
    scheduled_time_str: string;
    team_name: string;
    specialists_count: number;
    team_avatars: string[];
    description: string;
  };
  global_metrics?: {
    total_cleaning_plans: number;
    total_locations: number;
    total_rooms: number;
    total_tasks: number;
    total_completed_tasks: number;
    total_completed_hours: number;
    total_completed_rooms: number;
  };
};
export const getClientOverview = async () =>
  authenticatedRequest<DashboardOverview>("/client/overview", {
    method: "GET",
  });

export type LiveTask = {
  id: string;
  name: string;
  time_str: string;
  status: string;
  completed_at: string | null;
};
export type LiveRoom = {
  room_id: string;
  room_name: string;
  location_name: string;
  completed_tasks_count: number;
  total_tasks_count: number;
  tasks: LiveTask[];
};
export type LiveStatus = {
  shift_id: string;
  status_label: string;
  active_room_location_text: string;
  overall_progress_percentage: number;
  est_completion_time: string;
  assigned_cleaner: {
    worker_id: string;
    name: string;
    designation: string;
    profile_picture: string;
  };
  current_location: {
    location_id: string;
    location_name: string;
    address_subtitle: string;
  };
  arrival_time_info: {
    arrival_time: string;
    arrival_status: string;
    date_str: string;
  };
  current_active_room: LiveRoom;
  all_rooms_progress: LiveRoom[];
  active_sessions: Array<{
    shift_id: string;
    location_name: string;
    room_name: string;
    status: string;
    overall_progress_percentage: number;
    start_time: string;
    end_time: string;
  }>;
};
export const getClientLiveStatus = async (
  shiftId?: string,
  timezone?: string,
) =>
  authenticatedRequest<LiveStatus>(
    `/client/live-status?${qs({ shift_id: shiftId, timezone })}`,
    { method: "GET", headers: timezone ? { "X-Timezone": timezone } : {} },
  );
export const getClientShiftLiveStatus = async (shiftId: string) =>
  authenticatedRequest<LiveStatus>(
    `/client/live-status/shifts/${encodeURIComponent(shiftId)}`,
    { method: "GET" },
  );

export type ScheduleVisit = {
  id: string;
  date_badge_month: string;
  date_badge_day: string;
  formatted_date: string;
  time_interval: string;
  assigned_team: string;
  service_type: string;
  status: string;
  location_name: string;
  location_id: string;
  date_raw: string;
};
export type ScheduleResponse = {
  total_count: number;
  page: number;
  limit: number;
  has_more: boolean;
  summary: {
    this_month_visits: number;
    completed_visits: number;
    upcoming_visits: number;
  };
  visits: ScheduleVisit[];
};
export const getClientSchedule = async (
  statusVal = "all",
  timeFrame = "all",
  page = 1,
  limit = 20,
) =>
  authenticatedRequest<ScheduleResponse>(
    `/client/schedule?${qs({ status_val: statusVal, time_frame: timeFrame, page, limit })}`,
    { method: "GET" },
  );
export const getClientScheduleVisit = async (id: string) =>
  authenticatedRequest<ScheduleVisit>(
    `/client/schedule/${encodeURIComponent(id)}`,
    { method: "GET" },
  );

export type ClientLocationRoomSummary = {
  id?: string;
  room_id?: string;
  room_name?: string;
  room_type?: string;
  floor?: number | null;
  duration?: number | null;
  cleaning_type?: string | null;
  monthly_cleaning_frequency?: number | null;
  tasks_count?: number;
  photos_count?: number;
};
export type ClientLocationSummary = {
  id?: string;
  location_id?: string;
  name?: string;
  location_name?: string;
  type?: string;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  floor?: number | null;
  total_rooms_count?: number;
  cleaning_plans_count?: number;
  image_url?: string | null;
  is_active?: boolean;
  rooms_summary?: ClientLocationRoomSummary[];
  created_at: string;
  updated_at: string;
};
export type ClientLocationRoomTask = {
  id: string;
  name: string;
  frequency_type?: string | null;
  is_photo_req?: boolean;
  photo?: Array<{ id: string; name: string }>;
  total_photos_required?: number;
};
export type ClientLocationRoom = {
  _id?: string;
  id?: string;
  room_id?: string;
  name?: string;
  room_name?: string;
  room_type?: string;
  location_id?: string | null;
  location_name?: string | null;
  floor?: number | string | null;
  duration?: number | null;
  cleaning_type?: string | null;
  monthly_cleaning_frequency?: number | null;
  total_task?: number;
  tasks_count?: number;
  photos_count?: number;
  is_active?: boolean;
  last_updated_by?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    user?: any;
  } | null;
  tasks?: ClientLocationRoomTask[];
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type ClientLocationDetails = {
  id?: string;
  location_id?: string;
  name?: string;
  location_name?: string;
  type?: string;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  floor?: number | null;
  description?: string | null;
  notes?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  total_rooms_count?: number;
  cleaning_plans_count?: number;
  client_id?: string;
  company_name?: string;
  rooms?: ClientLocationRoom[];
  created_at: string;
  updated_at: string;
};
export type ClientLocationRoomDetails = {
  id?: string;
  room_id?: string;
  room_name?: string;
  room_type?: string;
  location_id?: string | null;
  location_name?: string | null;
  client_id?: string | null;
  company_name?: string | null;
  floor?: number | null;
  duration?: number | null;
  cleaning_type?: string | null;
  monthly_cleaning_frequency?: number | null;
  photo_number?: number;
  task_number?: number;
  tasks?: ClientLocationRoomTask[];
  created_at: string;
  updated_at: string;
};
export type ClientLocationsResponse = {
  total_count: number;
  page: number;
  limit: number;
  has_more?: boolean;
  locations?: ClientLocationSummary[];
};
export type ClientLocationRoomsResponse = {
  total_count: number;
  page: number;
  limit: number;
  has_more?: boolean;
  location_id: string;
  location_name: string;
  rooms?: ClientLocationRoom[];
};
export const getClientLocations = async (
  input: { search?: string; page?: number; limit?: number } = {},
) =>
  authenticatedRequest<ClientLocationsResponse>(
    `/client/locations?${qs({ search: input.search, page: input.page ?? 1, limit: input.limit ?? 10 })}`,
    { method: "GET" },
  );
export const getClientLocationDetails = async (locationId: string) => {
  const res = await authenticatedRequest<any>(
    `/location/single-location/${encodeURIComponent(locationId)}`,
    { method: "GET" },
  );
  if (res.success && res.data && typeof res.data === "object" && "data" in res.data) {
    return { ...res, data: res.data.data as ClientLocationDetails };
  }
  return res as ActionResult<ClientLocationDetails>;
};
export const getClientLocationRooms = async (
  locationId: string,
  input: {
    search?: string;
    roomType?: string;
    page?: number;
    limit?: number;
  } = {},
) =>
  authenticatedRequest<ClientLocationRoomsResponse>(
    `/client/locations/${encodeURIComponent(locationId)}/rooms?${qs({ search: input.search, room_type: input.roomType, page: input.page ?? 1, limit: input.limit ?? 10 })}`,
    { method: "GET" },
  );
export const getClientLocationRoomDetails = async (
  locationId: string,
  roomId: string,
) =>
  authenticatedRequest<ClientLocationRoomDetails>(
    `/client/locations/${encodeURIComponent(locationId)}/rooms/${encodeURIComponent(roomId)}`,
    { method: "GET" },
  );

export type ExtraServiceTaskInput = {
  id?: string;
  name: string;
  frequency_type?: string;
  is_photo_req?: boolean;
  photo?: Array<{ id?: string; name: string }>;
  total_photos_required?: number;
  fixed_date?: string;
  duration_minutes?: number;
  description?: string;
};
export type ExtraServiceLocationOption = {
  address: string;
  city: string;
  cleaning_plans_count: number;
  id: string;
  location_id: string;
  location_name: string;
  name: string;
  postal_code: string;
  total_rooms_count: number;
};
export type ExtraServiceRoomOption = {
  cleaning_type: string;
  duration: number;
  floor: number;
  id: string;
  location_id: string;
  location_name: string;
  monthly_cleaning_frequency: number;
  photo_number: number;
  room_id: string;
  room_name: string;
  room_type: string;
  task_number: number;
  tasks: Array<{
    frequency_type: string;
    id: string;
    is_photo_req: boolean;
    name: string;
    photo: Array<{ id: string; name: string }>;
  }>;
};
export type ExtraServiceInput = {
  title: string;
  preferred_date?: string;
  priority?: string;
  description: string;
  location_id?: string;
  room_id?: string;
  plan_id?: string;
  tasks: ExtraServiceTaskInput[];
};
export type ExtraService = Omit<ExtraServiceInput, "tasks"> & {
  id: string;
  status: string;
  client_id: string;
  client_name: string;
  location_name: string;
  room_name: string;
  date_submitted: string;
  rejection_reason?: string;
  plan_id?: string;
  plan_name?: string;
  duration?: string;
  duration_minutes?: number;
  start_time?: string;
  end_time?: string;
  tasks: Array<
    ExtraServiceTaskInput & {
      id?: string;
      is_completed?: boolean;
      completed_at?: string | null;
    }
  >;
  task_list?: string[];
  required_photos?: Array<{
    id: string;
    name: string;
    photo_url: string;
    is_uploaded: boolean;
  }>;
};
export const getClientExtraServices = async (
  page = 1,
  limit = 10,
  statusVal?: string,
  priority?: string,
) =>
  authenticatedRequest<{
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
    requests: ExtraService[];
  }>(
    `/client/extra-services?${qs({ page, limit, status_val: statusVal, priority })}`,
    { method: "GET" },
  );
export const getClientExtraService = async (id: string) =>
  authenticatedRequest<ExtraService>(
    `/client/extra-services/${encodeURIComponent(id)}`,
    { method: "GET" },
  );
export const getClientExtraServiceLocations = async (
  input: { search?: string; page?: number; limit?: number } = {},
) =>
  authenticatedRequest<{
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
    locations: ExtraServiceLocationOption[];
  }>(
    `/client/extra-services/locations-dropdown?${qs({ search: input.search, page: input.page ?? 1, limit: input.limit ?? 100 })}`,
    { method: "GET" },
  );
export const getClientExtraServiceRooms = async (
  input: {
    locationId?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {},
) =>
  authenticatedRequest<{
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
    rooms: ExtraServiceRoomOption[];
  }>(
    `/client/extra-services/rooms-dropdown?${qs({ location_id: input.locationId, search: input.search, page: input.page ?? 1, limit: input.limit ?? 100 })}`,
    { method: "GET" },
  );
export const createClientExtraService = async (input: ExtraServiceInput) => {
  const { room_id, ...required } = input;
  return authenticatedRequest<ExtraService>("/client/extra-services", {
    method: "POST",
    ...json(room_id ? { ...required, room_id } : required),
  });
};
export const updateClientExtraService = async (
  id: string,
  input: ExtraServiceInput,
) => {
  const { room_id, ...required } = input;
  return authenticatedRequest<ExtraService>(
    `/client/extra-services/${encodeURIComponent(id)}`,
    { method: "PATCH", ...json(room_id ? { ...required, room_id } : required) },
  );
};
export const deleteClientExtraService = async (id: string) =>
  authenticatedRequest<string>(
    `/client/extra-services/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );

export type ClientPlanOption = {
  id: string;
  title: string;
  location_id?: string;
  location_name?: string;
  date?: string;
  status?: string;
};

export const getClientCleaningPlans = async (
  input: { page?: number; limit?: number; search?: string; serviceKind?: string } = {},
) =>
  authenticatedRequest<{
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
    plans: ClientPlanOption[];
  }>(`/cleaning-plan/get-my-cleaning-plans?${qs({ service_kind: input.serviceKind ?? "cleaning_plan", page: input.page ?? 1, limit: input.limit ?? 100, search: input.search })}`, {
    method: "GET",
  });

export const requestClientAdditionalTask = async (
  planId: string,
  input: {
    name: string;
    description?: string;
    frequency_type?: string;
    fixed_date?: string;
    duration_minutes?: number;
    is_photo_req?: boolean;
    photo?: Array<{ name: string }>;
  },
) =>
  authenticatedRequest<any>(
    `/client/cleaning-plan/${encodeURIComponent(planId)}/additional-tasks`,
    { method: "POST", ...json(input) },
  );

export type ClientNotification = {
  _id: string;
  title: string;
  message: string;
  notification_type: string;
  route_type?: string;
  is_read: boolean;
  created_at: string;
};

export function getNotificationRoute(routeType?: string, locale = "en"): string | null {
  if (!routeType) return null;

  const normalized = routeType.toLowerCase().trim();

  
  if (normalized.includes("chat") || normalized.includes("support")) {
    return `/${locale}/chat`;
  }

  
  if (normalized.includes("extra_service") || normalized.includes("service")) {
    return `/${locale}/services`;
  }

  
  if (normalized.includes("schedule")) {
    return `/${locale}/schedule`;
  }

  
  if (normalized.includes("location")) {
    return `/${locale}/locations`;
  }

  
  if (normalized.includes("room")) {
    return `/${locale}/rooms`;
  }

  
  if (normalized.includes("profile")) {
    return `/${locale}/profile`;
  }

  
  if (
    normalized === "overview" ||
    normalized === "home" ||
    normalized === "dashboard" ||
    normalized.startsWith("overview") ||
    normalized.startsWith("dashboard")
  ) {
    return `/${locale}`;
  }

  
  return null;
}
export const getClientNotifications = async (page = 1, limit = 10) =>
  authenticatedRequest<{
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
    unread_count: number;
    notifications: ClientNotification[];
  }>(`/client/notifications?${qs({ page, limit })}`, { method: "GET" });
export const readClientNotification = async (id: string) =>
  authenticatedRequest<string>(
    `/client/notifications/${encodeURIComponent(id)}/read`,
    { method: "PATCH" },
  );
export const getClientNotification = async (id: string) =>
  authenticatedRequest<ClientNotification>(
    `/client/notifications/${encodeURIComponent(id)}`,
    { method: "GET" },
  );
export const deleteClientNotification = async (id: string) =>
  authenticatedRequest<string>(
    `/client/notifications/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
export const bulkDeleteClientNotifications = async (notification_ids: string[]) =>
  authenticatedRequest<{ message?: string }>(
    "/client/notifications/bulk-delete",
    { method: "POST", ...json({ notification_ids }) },
  );

export type ClientProfile = {
  full_name: string;
  account_type: string;
  company_name: string;
  profile_picture: string;
  contact_information: {
    company_name: string;
    contact_person: string;
    email_address: string;
    phone_number: string;
  };
  account_details: {
    client_id: string;
    member_since: string;
    contract_type: string;
    account_status: string;
  };
  security_info: { last_password_changed: string };
};
export const getClientProfile = async () =>
  authenticatedRequest<ClientProfile>("/client/profile", { method: "GET" });
export const updateClientProfile = async (input: {
  company_name: string;
  contact_person: string;
  contact_email: string;
  phone_number: string;
  profile_picture?: string;
}) =>
  authenticatedRequest<ClientProfile>("/client/profile", {
    method: "PATCH",
    ...json(input),
  });
export type ClientSettings = {
  profile_settings: Record<string, unknown>;
  notification_alerts: {
    email_notifications: boolean;
    email_notifications_description: string;
    sms_cleaning_alerts: boolean;
    sms_cleaning_alerts_description: string;
  };
  portal_preferences: { portal_language: string };
};
export const getClientSettings = async () =>
  authenticatedRequest<ClientSettings>("/client/settings", { method: "GET" });
export const updateClientSettings = async (input: {
  email_notifications: boolean;
  sms_cleaning_alerts: boolean;
  portal_language: string;
}) =>
  authenticatedRequest<ClientSettings>("/client/settings", {
    method: "PATCH",
    ...json(input),
  });

export type ChatParticipant = {
  _id: string;
  name: string;
  worker_type?: string;
  email?: string;
  phone?: string;
  user: {
    full_name: string;
    profile_photo: string | null;
  };
};

export type Conversation = {
  _id: string;
  type: "group" | "direct" | "worker" | "client";
  cleaning_plan?: string | null;
  name?: string | null;
  display_name?: string | null;
  client?: ChatParticipant | null;
  workers?: ChatParticipant[];
  participant_key?: string | null;
  last_message?: ChatMessage | string | null;
  last_message_at?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  unread_count?: number; 
};

export type ChatMessage = {
  _id: string;
  chat: string;
  sender: {
    _id: string;
    full_name: string;
    profile_photo: string | null;
    email: string;
  };
  sender_role: "client" | "worker" | "manager";
  text: string;
  attachments?: { url: string; type: "image" | "video" | "pdf" | "file" }[];
  seen?: boolean;
  is_deleted: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
};
export const getClientConversations = async (page = 1, limit = 20) =>
  authenticatedRequest<{
    meta: { page: number; limit: number; total: number; totalPage: number };
    result: Conversation[];
  }>(`/chat/my-chats?${qs({ page, limit })}`, { method: "GET" });

export const getClientConversationParticipants = async (id: string) =>
  authenticatedRequest<{
    client: ChatParticipant | null;
    workers: ChatParticipant[];
    managers: string;
    display_name: string | null;
  }>(`/chat/${encodeURIComponent(id)}/members`, {
    method: "GET",
  });

export const getClientMessages = async (id: string, page = 1, limit = 20) =>
  authenticatedRequest<{
    meta: { page: number; limit: number; total: number; totalPage: number };
    result: ChatMessage[];
  }>(
    `/chat-message/${encodeURIComponent(id)}?${qs({ page, limit })}`,
    { method: "GET" },
  );

export const deleteClientMessage = async (id: string) =>
  authenticatedRequest<ChatMessage>(
    `/chat-message/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
export async function uploadClientChatAttachment(
  file: File,
): Promise<
  ActionResult<{
    attachment_url: string;
    attachment_type: string;
    filename: string;
    file_name: string;
  }>
> {
  const form = new FormData();
  let type = "file";
  if (file.type.startsWith("image/")) {
    form.append("conversation_image", file);
    type = "image";
  } else if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    form.append("conversation_pdf", file);
    type = "pdf";
  } else if (file.type.startsWith("video/")) {
    form.append("conversation_video", file);
    type = "video";
  } else {
    form.append("conversation_image", file);
    type = "image";
  }

  const result = await authenticatedRequest<{
    images?: string[];
    videos?: string[];
    pdfs?: string[];
  }>("/file/upload-conversation-files", {
    method: "POST",
    body: form,
  });

  if (!result.success) {
    return { success: false, error: result.error, status: result.status };
  }

  const rawData = result.data as any;
  const dataPayload = rawData?.data || rawData;
  const url =
    dataPayload?.images?.[0] ||
    rawData?.images?.[0] ||
    dataPayload?.pdfs?.[0] ||
    rawData?.pdfs?.[0] ||
    dataPayload?.videos?.[0] ||
    rawData?.videos?.[0] ||
    (typeof dataPayload === "string" ? dataPayload : "");

  if (!url) {
    return { success: false, error: "Upload failed: no file URL returned", status: 500 };
  }

  return {
    success: true,
    data: {
      attachment_url: url,
      attachment_type: type,
      filename: file.name,
      file_name: file.name,
    },
  };
}
