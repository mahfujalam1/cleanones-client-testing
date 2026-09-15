import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { refreshSession } from "@/services/actions/auth";
import { apiBase, targetApi } from "@/utils/baseUrl";

function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; cleanones_client_access_token=`);
  if (parts.length === 2) {
    const raw = parts.pop()?.split(";").shift();
    if (raw) return decodeURIComponent(raw);
  }
  return null;
}

function getApiBaseUrl(): string {
  return apiBase();
}

const qs = (values: Record<string, string | number | boolean | undefined>) => {
  const p = new URLSearchParams();
  Object.entries(values).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  const res = p.toString();
  return res ? `?${res}` : "";
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiBase(),
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;
  const isAuthEndpoint = url.includes("/auth/login") || url.includes("/auth/change-password");

  if (result.error && (result.error.status === 401 || result.error.status === 403) && !isAuthEndpoint) {
    const refreshed = await refreshSession();
    if (refreshed.success) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        document.cookie = "cleanones_client_access_token=; path=/; max-age=0;";
        document.cookie = "cleanones_client_refresh_token=; path=/; max-age=0;";
        localStorage.removeItem("cleanones-client-user");
        window.location.href = "/login";
      }
    }
  }
  return result;
};

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  tagTypes: ["Overview", "LiveStatus", "Schedule", "Locations", "ExtraServices", "Notifications", "Profile", "Settings", "Chat"],
  endpoints: (builder) => ({
    getClientMyLiveStatus: builder.query<any, void>({
      query: () => "/shift/my-live-status",
      providesTags: ["LiveStatus"],
    }),
    getClientOverview: builder.query<any, void>({
      query: () => "/client/overview",
      providesTags: ["Overview"],
    }),
    getClientActiveProgress: builder.query<any, void>({
      query: () => "/client/active-progress",
      providesTags: ["Overview"],
    }),
    getClientShiftStats: builder.query<any, { range?: "today" | "this_week" | "this_month" } | void>({
      query: (arg) => `/client/shift-stats${qs({ range: arg?.range })}`,
      providesTags: ["Overview"],
    }),
    getClientTotals: builder.query<any, void>({
      query: () => "/client/totals",
      providesTags: ["Overview"],
    }),
    getClientLiveStatus: builder.query<any, { shiftId?: string; timezone?: string } | void>({
      query: (arg) => {
        const shiftId = arg && typeof arg === "object" ? arg.shiftId : undefined;
        const timezone = arg && typeof arg === "object" ? arg.timezone : undefined;
        return {
          url: `/client/live-status${qs({ shift_id: shiftId, timezone })}`,
          headers: timezone ? { "X-Timezone": timezone } : {},
        };
      },
      providesTags: ["LiveStatus"],
    }),
    getClientShiftLiveStatus: builder.query<any, string>({
      query: (shiftId) => `/client/live-status/shifts/${encodeURIComponent(shiftId)}`,
      providesTags: ["LiveStatus"],
    }),
    getClientSchedule: builder.query<any, { statusVal?: string; timeFrame?: string; page?: number; limit?: number } | void>({
      query: (arg) => {
        const statusVal = arg?.statusVal ?? "all";
        const timeFrame = arg?.timeFrame ?? "all";
        const page = arg?.page ?? 1;
        const limit = arg?.limit ?? 20;
        return `/cleaning-plan/get-my-cleaning-plans${qs({ status_val: statusVal, time_frame: timeFrame, page, limit })}`;
      },
      providesTags: ["Schedule"],
    }),
    getClientScheduleVisit: builder.query<any, string>({
      query: (id) => `/client/schedule/${encodeURIComponent(id)}`,
      providesTags: ["Schedule"],
    }),
    getClientScheduleRoster: builder.query<any, { date?: string } | void>({
      query: (arg) => `/client/schedule-roster${arg?.date ? `?date=${encodeURIComponent(arg.date)}` : ""}`,
      providesTags: ["Schedule"],
    }),
    /** GET /client/roster — day/week/month schedule grouped by cleaning plan */
    getClientRoster: builder.query<
      any,
      {
        view?: "day" | "week" | "month";
        date?: string;
        year?: number;
        month?: number;
        page?: number;
        limit?: number;
      } | void
    >({
      query: (arg) => {
        const view = arg?.view ?? "day";
        if (view === "month") {
          return `/client/roster${qs({
            view,
            year: arg?.year,
            month: arg?.month,
            page: arg?.page ?? 1,
            limit: arg?.limit ?? 10,
          })}`;
        }
        return `/client/roster${qs({
          view,
          date: arg?.date,
          page: arg?.page ?? 1,
          limit: arg?.limit ?? 10,
        })}`;
      },
      providesTags: ["Schedule"],
    }),
    getClientLocations: builder.query<any, { search?: string; page?: number; limit?: number } | void>({
      query: (arg) => `/client/locations${qs({ search: arg?.search, page: arg?.page ?? 1, limit: arg?.limit ?? 10 })}`,
      providesTags: ["Locations"],
    }),
    getClientLocationDetails: builder.query<any, string>({
      query: (locationId) => `/client/locations/${encodeURIComponent(locationId)}`,
      providesTags: ["Locations"],
    }),
    getClientLocationRooms: builder.query<any, { locationId: string; search?: string; roomType?: string; page?: number; limit?: number }>({
      query: ({ locationId, search, roomType, page, limit }) =>
        `/client/locations/${encodeURIComponent(locationId)}/rooms${qs({ search, room_type: roomType, page: page ?? 1, limit: limit ?? 10 })}`,
      providesTags: ["Locations"],
    }),
    getClientLocationRoomDetails: builder.query<any, { locationId: string; roomId: string }>({
      query: ({ locationId, roomId }) =>
        `/client/locations/${encodeURIComponent(locationId)}/rooms/${encodeURIComponent(roomId)}`,
      providesTags: ["Locations"],
    }),
    getClientExtraServices: builder.query<any, { page?: number; limit?: number; statusVal?: string; priority?: string } | void>({
      query: (arg) =>
        `/client/extra-services${qs({ page: arg?.page ?? 1, limit: arg?.limit ?? 10, status_val: arg?.statusVal, priority: arg?.priority })}`,
      providesTags: ["ExtraServices"],
    }),
    getClientExtraService: builder.query<any, string>({
      query: (id) => `/client/extra-services/${encodeURIComponent(id)}`,
      providesTags: ["ExtraServices"],
    }),
    getClientExtraServiceLocations: builder.query<any, { search?: string; page?: number; limit?: number } | void>({
      query: (arg) =>
        `/client/extra-services/locations-dropdown${qs({ search: arg?.search, page: arg?.page ?? 1, limit: arg?.limit ?? 100 })}`,
      providesTags: ["ExtraServices"],
    }),
    getClientExtraServiceRooms: builder.query<any, { locationId?: string; search?: string; page?: number; limit?: number } | void>({
      query: (arg) =>
        `/client/extra-services/rooms-dropdown${qs({ location_id: arg?.locationId, search: arg?.search, page: arg?.page ?? 1, limit: arg?.limit ?? 100 })}`,
      providesTags: ["ExtraServices"],
    }),
    getClientCleaningPlans: builder.query<any, { page?: number; limit?: number; search?: string; serviceKind?: string } | void>({
      query: (arg) =>
        `/cleaning-plan/get-my-cleaning-plans${qs({ service_kind: arg?.serviceKind ?? "cleaning_plan", page: arg?.page ?? 1, limit: arg?.limit ?? 100, search: arg?.search })}`,
      providesTags: ["CleaningPlans" as any],
    }),
    getClientCleaningPlanDetails: builder.query<any, string>({
      query: (id) => `/cleaning-plan/single-cleaning-plan/${encodeURIComponent(id)}`,
      providesTags: ["CleaningPlans" as any],
    }),
    createClientExtraService: builder.mutation<any, any>({
      query: (input) => {
        const { room_id, ...required } = input;
        return {
          url: "/client/extra-services",
          method: "POST",
          body: room_id ? { ...required, room_id } : required,
        };
      },
      invalidatesTags: ["ExtraServices"],
    }),
    updateClientExtraService: builder.mutation<any, { id: string; input: any }>({
      query: ({ id, input }) => {
        const { room_id, ...required } = input;
        return {
          url: `/client/extra-services/${encodeURIComponent(id)}`,
          method: "PATCH",
          body: room_id ? { ...required, room_id } : required,
        };
      },
      invalidatesTags: ["ExtraServices"],
    }),
    deleteClientExtraService: builder.mutation<any, string>({
      query: (id) => ({
        url: `/client/extra-services/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExtraServices"],
    }),
    getClientNotifications: builder.query<any, { page?: number; limit?: number } | void>({
      query: (arg) => `/client/notifications${qs({ page: arg?.page ?? 1, limit: arg?.limit ?? 10 })}`,
      providesTags: ["Notifications"],
    }),
    getClientNotification: builder.query<any, string>({
      query: (id) => `/client/notifications/${encodeURIComponent(id)}`,
      providesTags: ["Notifications"],
    }),
    readClientNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/client/notifications/${encodeURIComponent(id)}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteClientNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/client/notifications/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
    bulkDeleteClientNotifications: builder.mutation<any, { notification_ids: string[] }>({
      query: (body) => ({
        url: "/client/notifications/bulk-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),
    getClientProfile: builder.query<any, void>({
      query: () => "/client/profile",
      providesTags: ["Profile"],
    }),
    updateClientProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/client/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    getClientSettings: builder.query<any, void>({
      query: () => "/client/settings",
      providesTags: ["Settings"],
    }),
    updateClientSettings: builder.mutation<any, any>({
      query: (body) => ({
        url: "/client/settings",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetClientMyLiveStatusQuery,
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
  useGetClientCleaningPlanDetailsQuery,
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
} = clientApi;
