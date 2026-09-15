import { apiBase, targetApi } from "@/utils/baseUrl";

const ACCESS_TOKEN_COOKIE = "cleanones_client_access_token";
const REFRESH_TOKEN_COOKIE = "cleanones_client_refresh_token";
const REMEMBER_COOKIE = "cleanones_client_remember";
const PERSIST_MAX_AGE = 86400 * 30;
const ACCESS_MAX_AGE = 86400;
function getApiBaseUrl(): string {
  return apiBase();
}

export type AuthResponse = { message: string; access_token: string; refresh_token: string; token_type: string; name: string; role: string; is_approved: boolean; approval_status: string; is_temporary_password?: boolean };
export type ActionResult<T = string> = { success: true; data: T } | { success: false; error: string; status?: number };

function setClientCookie(name: string, value: string, maxAgeSeconds?: number) {
  if (typeof document === "undefined") return;
  let cookieStr = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax;`;
  if (maxAgeSeconds !== undefined) cookieStr += ` max-age=${maxAgeSeconds};`;
  if (typeof window !== "undefined" && window.location.protocol === "https:") cookieStr += " Secure;";
  document.cookie = cookieStr;
}

function deleteClientCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0;`;
}

function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function errorMessage(payload: unknown, fallback: string) {
  if (typeof payload === "string") return payload;
  if (payload && typeof payload === "object") {
    const value = payload as { message?: string; detail?: string | Array<{ msg?: string } | string> | Record<string, unknown> };
    if (value.message && typeof value.message === "string") return value.message;
    if (typeof value.detail === "string") return value.detail;
    if (Array.isArray(value.detail)) {
      return value.detail.map((item) => (typeof item === "string" ? item : item.msg || JSON.stringify(item))).filter(Boolean).join(", ") || fallback;
    }
    if (value.detail && typeof value.detail === "object") {
      return (value.detail as { message?: string }).message || JSON.stringify(value.detail);
    }
  }
  return fallback;
}

async function request<T>(path: string, init: RequestInit): Promise<ActionResult<T>> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return { success: false, error: "API_BASE_URL is not configured", status: 500 };
  try {
    const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...init.headers }, cache: init.cache ?? "no-store" });
    const text = await response.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }
    if (!response.ok) return { success: false, error: errorMessage(payload, "Request failed"), status: response.status };
    return { success: true, data: (payload ?? text) as T };
  } catch { return { success: false, error: "Unable to connect to the server", status: 500 }; }
}

async function saveTokens(auth: AuthResponse, rememberMe = false) {
  // Remembered: persistent cookies that survive a full browser restart.
  // Not remembered: true session cookies (no max-age) that only clear when the browser itself closes, not on a tab close.
  const accessMaxAge = rememberMe ? ACCESS_MAX_AGE : undefined;
  const refreshMaxAge = rememberMe ? PERSIST_MAX_AGE : undefined;
  if (typeof window !== "undefined") {
    setClientCookie(ACCESS_TOKEN_COOKIE, auth.access_token, accessMaxAge);
    setClientCookie(REFRESH_TOKEN_COOKIE, auth.refresh_token, refreshMaxAge);
    setClientCookie(REMEMBER_COOKIE, rememberMe ? "1" : "0", refreshMaxAge);
  } else {
    try {
      const { cookies } = await import("next/headers");
      const store = await cookies();
      const common = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
      store.set(ACCESS_TOKEN_COOKIE, auth.access_token, accessMaxAge !== undefined ? { ...common, maxAge: accessMaxAge } : common);
      store.set(REFRESH_TOKEN_COOKIE, auth.refresh_token, refreshMaxAge !== undefined ? { ...common, maxAge: refreshMaxAge } : common);
    } catch { }
  }
}

function getRememberPreference(): boolean {
  if (typeof document === "undefined") return false;
  return getClientCookie(REMEMBER_COOKIE) === "1";
}

export async function loginUser(input: { email: string; password: string; remember_me: boolean; onesignal_player_id?: string }) {
  const result = await request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(input) });
  if (result.success && result.data.role.toLowerCase() !== "client") return { success: false, error: "This account does not have access to the Client Portal" } as ActionResult<AuthResponse>;
  if (result.success) await saveTokens(result.data, input.remember_me);
  return result;
}
export async function forgotPassword(email: string) { return request<string>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }); }
export async function resendOtp(email: string) { return request<string>("/auth/resend-otp", { method: "POST", body: JSON.stringify({ email }) }); }
export async function resetPassword(input: { email: string; otp_code: string; new_password: string }) { return request<string>("/auth/reset-password", { method: "POST", body: JSON.stringify(input) }); }
export async function verifyEmail(input: { email: string; otp_code: string; onesignal_player_id?: string }) {
  const result = await request<AuthResponse>("/auth/verify-email", { method: "POST", body: JSON.stringify(input) });
  if (result.success && result.data.role.toLowerCase() !== "client") return { success: false, error: "This account does not have access to the Client Portal" } as ActionResult<AuthResponse>;
  if (result.success) await saveTokens(result.data);
  return result;
}
let refreshInFlight: Promise<ActionResult<AuthResponse>> | null = null;

export async function refreshSession() {
  // De-duplicate concurrent callers (e.g. several queries firing 401s at once on reopen) into a single
  // network request — otherwise a rotating refresh token gets used twice and every extra caller fails.
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    let refreshToken: string | null = null;
    if (typeof window !== "undefined") {
      refreshToken = getClientCookie(REFRESH_TOKEN_COOKIE);
    } else {
      try {
        const { cookies } = await import("next/headers");
        refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE)?.value ?? null;
      } catch { }
    }
    if (!refreshToken) return { success: false, error: "Session expired" } as ActionResult<AuthResponse>;
    const result = await request<AuthResponse>("/auth/refresh", { method: "POST", body: JSON.stringify({ refresh_token: refreshToken }) });
    if (result.success) await saveTokens(result.data, getRememberPreference());
    return result;
  })();
  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}
export async function authenticatedRequest<T>(path: string, init: RequestInit): Promise<ActionResult<T>> {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = getClientCookie(ACCESS_TOKEN_COOKIE);
  } else {
    try {
      const { cookies } = await import("next/headers");
      token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value ?? null;
    } catch { }
  }
  if (!token) { const refreshed = await refreshSession(); if (!refreshed.success) return refreshed as ActionResult<T>; token = refreshed.data.access_token; }
  const method = (init.method ?? "GET").toUpperCase();
  let result = await request<T>(path, { ...init, headers: { ...init.headers, Authorization: `Bearer ${token}` } } as RequestInit);
  if (!result.success && (result.status === 401 || result.status === 403 || result.error.includes("401") || result.error.toLowerCase().includes("credential") || result.error.toLowerCase().includes("unauthorized"))) {
    const refreshed = await refreshSession();
    if (refreshed.success) result = await request<T>(path, { ...init, headers: { ...init.headers, Authorization: `Bearer ${refreshed.data.access_token}` } } as RequestInit);
  }
  return result;
}
export async function changePassword(input: { old_password: string; new_password: string }) { return authenticatedRequest<string>("/auth/change-password", { method: "POST", body: JSON.stringify(input) }); }
export type CurrentUser = { id?: string; full_name?: string; name?: string | null; email: string; phone?: string | null; role: string; is_active: boolean; is_verified: boolean };
export async function getCurrentUser() { return authenticatedRequest<CurrentUser>("/auth/me", { method: "GET" }); }
export async function logoutUser() {
  try {
    await authenticatedRequest<string>("/auth/logout", { method: "POST" });
  } catch {
    // Ignore API error on logout
  } finally {
    if (typeof window !== "undefined") {
      deleteClientCookie(ACCESS_TOKEN_COOKIE);
      deleteClientCookie(REFRESH_TOKEN_COOKIE);
      deleteClientCookie(REMEMBER_COOKIE);
    }
    try {
      const { cookies } = await import("next/headers");
      const store = await cookies();
      store.delete(ACCESS_TOKEN_COOKIE);
      store.delete(REFRESH_TOKEN_COOKIE);
      store.delete(REMEMBER_COOKIE);
    } catch { }
  }
  return { success: true, data: "Logged out" } as ActionResult<string>;
}
