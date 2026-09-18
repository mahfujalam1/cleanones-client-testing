import { clientApi } from "./clientApi";

export const clientProfileApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const { useGetClientProfileQuery, useUpdateClientProfileMutation } = clientProfileApi;
