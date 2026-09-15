import { baseApi } from "../baseApi";
import type {
  ApiResponse,
  PaginatedApiResponse,
  AdditionalTask,
  CreateAdditionalTaskRequest,
  UpdateAdditionalTaskRequest,
  GetAllAdditionalTasksParams,
  DeleteAdditionalTaskResponse,
} from "@/types/api";

const buildQueryString = (params: Omit<GetAllAdditionalTasksParams, "planId">): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      searchParams.set(key, String(val));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

export const additionalTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdditionalTask: builder.mutation<ApiResponse<AdditionalTask>, CreateAdditionalTaskRequest>({
      query: (body) => ({
        url: "/additional-task/create-additional-task",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "AdditionalTask", id: "LIST" }],
    }),

    updateAdditionalTask: builder.mutation<
      ApiResponse<AdditionalTask>,
      { id: string; body: UpdateAdditionalTaskRequest }
    >({
      query: ({ id, body }) => ({
        url: `/additional-task/update-additional-task/${encodeURIComponent(id)}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdditionalTask", id },
        { type: "AdditionalTask", id: "LIST" },
      ],
    }),

    deleteAdditionalTask: builder.mutation<ApiResponse<DeleteAdditionalTaskResponse>, string>({
      query: (id) => ({
        url: `/additional-task/delete-additional-task/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "AdditionalTask", id },
        { type: "AdditionalTask", id: "LIST" },
      ],
    }),

    getAllAdditionalTasks: builder.query<PaginatedApiResponse<AdditionalTask>, GetAllAdditionalTasksParams>({
      query: ({ planId, ...rest }) =>
        planId 
          ? `/additional-task/all-additional-tasks/${encodeURIComponent(planId)}${buildQueryString(rest)}`
          : `/additional-task/all-additional-tasks${buildQueryString(rest)}`,
      providesTags: (result, _error, { planId }) => {
        const tags = result?.data?.result
          ? [
              ...result.data.result.map(({ _id }) => ({ type: "AdditionalTask" as const, id: _id })),
              { type: "AdditionalTask" as const, id: "LIST" },
            ]
          : [{ type: "AdditionalTask" as const, id: "LIST" }];
        
        if (planId) {
          tags.push({ type: "AdditionalTask" as const, id: `PLAN-${planId}` });
        }
        
        return tags;
      }
    }),

    getSingleAdditionalTask: builder.query<ApiResponse<AdditionalTask>, string>({
      query: (id) => `/additional-task/single-additional-task/${encodeURIComponent(id)}`,
      providesTags: (_result, _error, id) => [{ type: "AdditionalTask", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAdditionalTaskMutation,
  useUpdateAdditionalTaskMutation,
  useDeleteAdditionalTaskMutation,
  useGetAllAdditionalTasksQuery,
  useGetSingleAdditionalTaskQuery,
} = additionalTaskApi;
