import { clientApi } from "./clientApi";

export const clientSettingsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  overrideExisting: false,
});

export const { useGetClientSettingsQuery, useUpdateClientSettingsMutation } = clientSettingsApi;
