import { baseApi } from "../baseApi";
import type {
  ApiResponse,
  NotificationItem,
  GetNotificationsParams,
  PaginatedResult,
} from "@/types/api";

const buildQueryString = (params?: GetNotificationsParams): string => {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      searchParams.set(key, String(val));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Returns { success, message, data: { meta, result: NotificationItem[] } }
    getNotifications: builder.query<
      ApiResponse<PaginatedResult<NotificationItem>>,
      GetNotificationsParams | void
    >({
      query: (params) =>
        `/notification/get-notifications${buildQueryString(params || undefined)}`,
      providesTags: ["Notification"],
    }),

    seeNotifications: builder.mutation<ApiResponse<unknown>, void>({
      query: () => ({
        url: "/notification/see-notifications",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteNotification: builder.mutation<ApiResponse<unknown>, string>({
      query: (id) => ({
        url: `/notification/delete-notification/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationApi;
