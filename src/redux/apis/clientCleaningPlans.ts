import { clientApi, qs } from "./clientApi";

export const clientCleaningPlansApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientCleaningPlans: builder.query<any, { page?: number; limit?: number; search?: string; serviceKind?: string } | void>({
      query: (arg) =>
        `/cleaning-plan/get-my-cleaning-plans${qs({ service_kind: arg?.serviceKind ?? "cleaning_plan", page: arg?.page ?? 1, limit: arg?.limit ?? 100, search: arg?.search })}`,
      providesTags: ["CleaningPlans" as any],
    }),
    getClientCleaningPlanDetails: builder.query<any, string>({
      query: (id) => `/cleaning-plan/single-cleaning-plan/${encodeURIComponent(id)}`,
      providesTags: ["CleaningPlans" as any],
    }),
  }),
  overrideExisting: false,
});

export const { useGetClientCleaningPlansQuery, useGetClientCleaningPlanDetailsQuery } = clientCleaningPlansApi;
