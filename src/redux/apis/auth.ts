import { baseApi, setAuthCookies } from "../baseApi";
import type {
  ApiResponse,
  AuthTokens,
  LoginRequest,
  ChangePasswordRequest,
  ForgetPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
} from "@/types/api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthTokens>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            setAuthCookies(data.data.accessToken, data.data.refreshToken);
          }
        } catch {
          
        }
      },
    }),

    refreshToken: builder.mutation<ApiResponse<AuthTokens>, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            setAuthCookies(data.data.accessToken, data.data.refreshToken);
          }
        } catch {
          
        }
      },
    }),

    changePassword: builder.mutation<ApiResponse<unknown>, ChangePasswordRequest>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    forgetPassword: builder.mutation<ApiResponse<unknown>, ForgetPasswordRequest>({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
    }),

    verifyResetOtp: builder.mutation<ApiResponse<unknown>, VerifyResetOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<AuthTokens>, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            setAuthCookies(data.data.accessToken, data.data.refreshToken);
          }
        } catch {
          
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
