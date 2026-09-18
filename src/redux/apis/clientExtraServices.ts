import { clientApi, qs } from "./clientApi";

export const clientExtraServicesApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useGetClientExtraServicesQuery,
  useGetClientExtraServiceQuery,
  useGetClientExtraServiceLocationsQuery,
  useGetClientExtraServiceRoomsQuery,
  useCreateClientExtraServiceMutation,
  useUpdateClientExtraServiceMutation,
  useDeleteClientExtraServiceMutation,
} = clientExtraServicesApi;
