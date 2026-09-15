import { baseApi } from "../baseApi";
import type {
  PaginatedApiResponse,
  ClientRoom,
  GetRoomsParams,
} from "@/types/api";

const buildQueryString = (params: Omit<GetRoomsParams, "locationId">): string => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
  if (params.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params.sort) searchParams.set("sort", params.sort);
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRooms: builder.query<PaginatedApiResponse<ClientRoom>, GetRoomsParams>({
      query: ({ locationId, ...rest }) =>
        `/room/my-rooms/${encodeURIComponent(locationId)}${buildQueryString(rest)}`,
      providesTags: (result, _error, { locationId }) =>
        result?.data?.result
          ? [
              ...result.data.result.map(({ _id }) => ({ type: "Room" as const, id: _id })),
              { type: "Room" as const, id: `LIST-${locationId}` },
            ]
          : [{ type: "Room" as const, id: `LIST-${locationId}` }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyRoomsQuery } = roomApi;
