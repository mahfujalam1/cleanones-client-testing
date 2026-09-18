import { clientApi, qs } from "./clientApi";

export const clientOverviewApi = clientApi.injectEndpoints({
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
  }),
  overrideExisting: false,
});

export const {
  useGetClientMyLiveStatusQuery,
  useGetClientOverviewQuery,
  useGetClientActiveProgressQuery,
  useGetClientShiftStatsQuery,
  useGetClientTotalsQuery,
  useGetClientLiveStatusQuery,
  useGetClientShiftLiveStatusQuery,
} = clientOverviewApi;
