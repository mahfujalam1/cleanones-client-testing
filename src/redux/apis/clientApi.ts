import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { refreshSession } from "@/services/actions/auth";
import { apiBase, targetApi } from "@/utils/baseUrl";

function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; cleanones_client_access_token=`);
  if (parts.length === 2) {
    const raw = parts.pop()?.split(";").shift();
    if (raw) return decodeURIComponent(raw);
  }
  return null;
}

function getApiBaseUrl(): string {
  return apiBase();
}

export const qs = (values: Record<string, string | number | boolean | undefined>) => {
  const p = new URLSearchParams();
  Object.entries(values).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  const res = p.toString();
  return res ? `?${res}` : "";
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiBase(),
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;
  const isAuthEndpoint = url.includes("/auth/login") || url.includes("/auth/change-password");

  if (result.error && (result.error.status === 401 || result.error.status === 403) && !isAuthEndpoint) {
    const refreshed = await refreshSession();
    if (refreshed.success) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        document.cookie = "cleanones_client_access_token=; path=/; max-age=0;";
        document.cookie = "cleanones_client_refresh_token=; path=/; max-age=0;";
        localStorage.removeItem("cleanones-client-user");
        window.location.href = "/login";
      }
    }
  }
  return result;
};

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  tagTypes: ["Overview", "LiveStatus", "Schedule", "Locations", "ExtraServices", "Notifications", "Profile", "Settings", "Chat"],
  endpoints: () => ({}),
});
