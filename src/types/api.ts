

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export interface ApiPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  unreadCount?: number;
}

export interface PaginatedResult<T> {
  meta: ApiPaginationMeta;
  result: T[];
}

export type PaginatedApiResponse<T> = ApiResponse<PaginatedResult<T>>;





export interface LoginRequest {
  email: string;
  password: string;
  role?: string;
  playerId?: string;
  platform?: "android" | "ios" | "web";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  resetCode: number;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}





export interface UserAccount {
  _id: string;
  isBlocked: boolean;
  isActive: boolean;
}

export interface ClientProfile {
  _id: string;
  user: UserAccount;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  licence_expiration_date: string;
  contract_status: string;
  manager: string;
  isDeleted: boolean;
  profile_image?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  profile_image?: File | Blob;
}





export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface ClientLocation {
  _id: string;
  name: string;
  address: string;
  is_active: boolean;
  location?: GeoPoint;
  total_room: number;
  created_at: string;
  updated_at: string;
}

export interface GetLocationsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
}





export interface LocationSummary {
  _id: string;
  name: string;
  address: string;
}

export interface ClientRoom {
  _id: string;
  name: string;
  room_type?: string;
  cleaning_type?: string;
  floor?: number | string | null;
  is_active?: boolean;
  location?: LocationSummary | {
    _id: string;
    name: string;
    address?: string;
    description?: string;
    type?: string;
    is_active?: boolean;
    location?: {
      type: string;
      coordinates: number[];
    };
    createdAt?: string;
    updatedAt?: string;
  };
  last_updated_by?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    user?: any;
  };
  total_task?: number;
  tasks_count?: number;
  duration?: number;
  photos_count?: number;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetRoomsParams {
  locationId: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
}





export interface TaskPhotoRequirement {
  title: string;
  photo_url?: string | null;
  is_uploaded?: boolean;
}

export interface ClientTask {
  _id: string;
  name: string;
  frequency_type: "daily" | "weekly" | "monthly";
  is_photo_required: boolean;
  photo_requirements: TaskPhotoRequirement[];
  duration_minutes: number;
  days_of_week?: string[];
  days_of_month?: number[];
  is_active: boolean;
  room: {
    _id: string;
    name: string;
    room_type: string;
    floor: number;
  };
  created_at: string;
  updated_at: string;
}

export interface GetTasksParams {
  roomId: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
}





export interface AdditionalTaskPhotoRequirement {
  title: string;
  photo_url?: string;
  is_uploaded?: boolean;
}

export interface CreateAdditionalTaskRequest {
  cleaning_plan_id: string;
  name: string;
  description?: string;
  duration_minutes?: number;
  is_photo_required?: boolean;
  photo_requirements?: AdditionalTaskPhotoRequirement[];
  date_time: string;
}

export type UpdateAdditionalTaskRequest = Partial<CreateAdditionalTaskRequest>;

export interface AdditionalTask {
  _id: string;
  cleaning_plan_id: string;
  name: string;
  description?: string;
  duration_minutes: number | null;
  is_photo_required: boolean;
  photo_requirements: AdditionalTaskPhotoRequirement[];
  date_time: string;
  is_completed: boolean;
  is_approved?: boolean;
  status?: string;
  reject_reason?: string | null;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
  cleaning_plan?: {
    _id: string;
    title?: string;
    location?: {
      _id: string;
      name?: string;
      address?: string;
    };
  };
}

export interface GetAllAdditionalTasksParams {
  planId?: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  is_approved?: boolean;
  [key: string]: unknown;
}

export interface DeleteAdditionalTaskResponse {
  message: string;
}





export interface NotificationData {
  entity?: string;
  action?: string;
  entityId?: string;
  meta?: Record<string, unknown>;
}

export interface NotificationItem {
  _id: string;
  receiver?: string;
  type?: string;
  title: string;
  message: string;
  notification_type?: string;
  route_type?: string;
  
  isRead?: boolean;
  
  is_read?: boolean;
  isSeen?: boolean;
  readAt?: string | null;
  seenAt?: string | null;
  data?: NotificationData;
  createdAt?: string;
  
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}
