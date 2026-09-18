import { clientApi, qs } from "./clientApi";

export const clientLocationsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useGetClientLocationsQuery,
  useGetClientLocationDetailsQuery,
  useGetClientLocationRoomsQuery,
  useGetClientLocationRoomDetailsQuery,
} = clientLocationsApi;
