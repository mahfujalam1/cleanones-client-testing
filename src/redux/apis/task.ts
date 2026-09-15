import { baseApi } from "../baseApi";
import type {
  PaginatedApiResponse,
  ClientTask,
  GetTasksParams,
} from "@/types/api";

const buildQueryString = (params: Omit<GetTasksParams, "roomId">): string => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
  if (params.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params.sort) searchParams.set("sort", params.sort);
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTasks: builder.query<PaginatedApiResponse<ClientTask>, GetTasksParams>({
      query: ({ roomId, ...rest }) =>
        `/task/my-tasks/${encodeURIComponent(roomId)}${buildQueryString(rest)}`,
      providesTags: (result, _error, { roomId }) =>
        result?.data?.result
          ? [
              ...result.data.result.map(({ _id }) => ({ type: "Task" as const, id: _id })),
              { type: "Task" as const, id: `LIST-${roomId}` },
            ]
          : [{ type: "Task" as const, id: `LIST-${roomId}` }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyTasksQuery } = taskApi;
