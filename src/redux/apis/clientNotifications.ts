import { clientApi, qs } from "./clientApi";

export const clientNotificationsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useGetClientNotificationsQuery,
  useGetClientNotificationQuery,
  useReadClientNotificationMutation,
  useDeleteClientNotificationMutation,
  useBulkDeleteClientNotificationsMutation,
} = clientNotificationsApi;
