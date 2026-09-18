import { clientApi, qs } from "./clientApi";

export const clientScheduleApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useGetClientScheduleQuery,
  useGetClientScheduleVisitQuery,
  useGetClientScheduleRosterQuery,
  useGetClientRosterQuery,
} = clientScheduleApi;
