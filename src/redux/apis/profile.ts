import { baseApi } from "../baseApi";
import type { ApiResponse, ClientProfile, UpdateProfileRequest } from "@/types/api";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<ApiResponse<ClientProfile>, void>({
      query: () => "/user/get-my-profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ApiResponse<ClientProfile>, FormData | UpdateProfileRequest>({
      query: (body) => {
        let payload: FormData | Record<string, string>;
        if (body instanceof FormData) {
          payload = body;
        } else {
          const formData = new FormData();
          if (body.name) formData.append("name", body.name);
          if (body.phone) formData.append("phone", body.phone);
          if (body.profile_image) formData.append("profile_image", body.profile_image);
          payload = formData;
        }

        return {
          url: "/user/update-profile",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
