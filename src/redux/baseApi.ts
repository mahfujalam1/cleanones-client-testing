import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { refreshSession } from "@/services/actions/auth";
import { apiBase } from "@/utils/baseUrl";


export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split("; cleanones_client_access_token=");
    if (parts.length === 2) {
      const raw = parts.pop()?.split(";").shift();
      if (raw) return decodeURIComponent(raw);
    }
  }

  
  try {
    const direct = localStorage.getItem("cleanones_client_access_token") || localStorage.getItem("token");
    if (direct) return direct;
    const userStr = localStorage.getItem("cleanones-client-user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed?.access_token) return parsed.access_token;
      if (parsed?.token) return parsed.token;
    }
  } catch {
    
  }

  
  try {
    const direct = sessionStorage.getItem("cleanones_client_access_token") || sessionStorage.getItem("token");
    if (direct) return direct;
    const userStr = sessionStorage.getItem("cleanones-client-user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed?.access_token) return parsed.access_token;
      if (parsed?.token) return parsed.token;
    }
  } catch {
    
  }

  return null;
}


export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;

  
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split("; cleanones_client_refresh_token=");
    if (parts.length === 2) {
      const raw = parts.pop()?.split(";").shift();
      if (raw) return decodeURIComponent(raw);
    }
  }

  
  try {
    const direct = localStorage.getItem("cleanones_client_refresh_token");
    if (direct) return direct;
    const userStr = localStorage.getItem("cleanones-client-user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed?.refreshToken || parsed?.refresh_token) return parsed.refreshToken || parsed.refresh_token;
    }
  } catch {
    
  }

  
  try {
    const direct = sessionStorage.getItem("cleanones_client_refresh_token");
    if (direct) return direct;
    const userStr = sessionStorage.getItem("cleanones-client-user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed?.refreshToken || parsed?.refresh_token) return parsed.refreshToken || parsed.refresh_token;
    }
  } catch {
    
  }

  return null;
}


export function setAuthCookies(accessToken: string, refreshToken?: string, rememberMe = false) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? " Secure;" : "";
  
  const maxAgeAccess = rememberMe ? ` max-age=${86400 * 30};` : "";
  const maxAgeRefresh = rememberMe ? ` max-age=${86400 * 30};` : "";

  document.cookie = `cleanones_client_access_token=${encodeURIComponent(accessToken)}; path=/; SameSite=Lax;${maxAgeAccess}${secure}`;
  if (refreshToken) {
    document.cookie = `cleanones_client_refresh_token=${encodeURIComponent(refreshToken)}; path=/; SameSite=Lax;${maxAgeRefresh}${secure}`;
  }
  document.cookie = `cleanones_client_remember=${rememberMe ? "1" : "0"}; path=/; SameSite=Lax;${maxAgeRefresh}${secure}`;
}


export function clearAuthCookies() {
  if (typeof document === "undefined") return;
  document.cookie = "cleanones_client_access_token=; path=/; max-age=0;";
  document.cookie = "cleanones_client_refresh_token=; path=/; max-age=0;";
  document.cookie = "cleanones_client_remember=; path=/; max-age=0;";
  try {
    localStorage.removeItem("cleanones-client-user");
    localStorage.removeItem("cleanones_client_access_token");
    localStorage.removeItem("cleanones_client_refresh_token");
    localStorage.removeItem("token");
  } catch {
    
  }
  try {
    sessionStorage.removeItem("cleanones-client-user");
    sessionStorage.removeItem("cleanones_client_access_token");
    sessionStorage.removeItem("cleanones_client_refresh_token");
    sessionStorage.removeItem("token");
  } catch {
    
  }
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiBase(),
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;
  const isAuthEndpoint = url.includes("/auth/login") || url.includes("/auth/change-password");

  if (result.error && (result.error.status === 401 || result.error.status === 403) && !isAuthEndpoint) {
    const refreshed = await refreshSession();
    if (refreshed.success) {
      
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        clearAuthCookies();
        window.location.href = "/login";
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Profile",
    "Location",
    "Room",
    "Task",
    "AdditionalTask",
    "Notification",
    "Chat",
  ],
  endpoints: () => ({}),
});
