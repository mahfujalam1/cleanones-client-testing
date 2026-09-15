import { baseApi } from "../baseApi";
import type {
  ApiResponse,
  PaginatedApiResponse,
  ClientLocation,
  GetLocationsParams,
} from "@/types/api";

const buildQueryString = (params?: GetLocationsParams): string => {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
  if (params.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params.sort) searchParams.set("sort", params.sort);
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyLocations: builder.query<PaginatedApiResponse<ClientLocation>, GetLocationsParams | void>({
      query: (params) => `/location/my-locations${buildQueryString(params || undefined)}`,
      providesTags: (result) =>
        result?.data?.result
          ? [
              ...result.data.result.map(({ _id }) => ({ type: "Location" as const, id: _id })),
              { type: "Location" as const, id: "LIST" },
            ]
          : [{ type: "Location" as const, id: "LIST" }],
    }),
    getSingleLocation: builder.query<ApiResponse<any>, string>({
      query: (id) => `/location/single-location/${encodeURIComponent(id)}`,
      providesTags: (_result, _error, id) => [{ type: "Location" as const, id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyLocationsQuery, useGetSingleLocationQuery } = locationApi;
