import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAuthCookies } from "../baseApi";

export interface UserProfile {
  name: string;
  email: string;
  clientNo?: string;
  company?: string;
  phone?: string;
  memberSince?: string;
  contractType?: string;
  status?: string;
  profilePhoto?: string;
  role?: string;
  access_token?: string;
  token?: string;
  refreshToken?: string;
  refresh_token?: string;
  [key: string]: unknown;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    initializeAuth: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.initialized = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      clearAuthCookies();
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else {
        state.user = action.payload as UserProfile;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  initializeAuth,
  logout,
  updateProfile,
} = authSlice.actions;

/**
 * Retrieve stored user from localStorage or sessionStorage
 */
export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const local = localStorage.getItem("cleanones-client-user");
    if (local) return JSON.parse(local);
  } catch {
    // ignore
  }
  try {
    const session = sessionStorage.getItem("cleanones-client-user");
    if (session) return JSON.parse(session);
  } catch {
    // ignore
  }
  return null;
}

/**
 * Save user and tokens to localStorage or sessionStorage depending on rememberMe
 */
export function saveStoredUser(user: UserProfile, rememberMe: boolean) {
  if (typeof window === "undefined") return;
  const userJson = JSON.stringify(user);
  const token = (user.access_token || user.token || "") as string;
  const refreshToken = (user.refreshToken || user.refresh_token || "") as string;

  if (rememberMe) {
    try {
      localStorage.setItem("cleanones-client-user", userJson);
      if (token) {
        localStorage.setItem("cleanones_client_access_token", token);
        localStorage.setItem("token", token);
      }
      if (refreshToken) {
        localStorage.setItem("cleanones_client_refresh_token", refreshToken);
      }
      sessionStorage.removeItem("cleanones-client-user");
      sessionStorage.removeItem("cleanones_client_access_token");
      sessionStorage.removeItem("cleanones_client_refresh_token");
      sessionStorage.removeItem("token");
    } catch {
      // ignore
    }
  } else {
    try {
      sessionStorage.setItem("cleanones-client-user", userJson);
      if (token) {
        sessionStorage.setItem("cleanones_client_access_token", token);
        sessionStorage.setItem("token", token);
      }
      if (refreshToken) {
        sessionStorage.setItem("cleanones_client_refresh_token", refreshToken);
      }
      localStorage.removeItem("cleanones-client-user");
      localStorage.removeItem("cleanones_client_access_token");
      localStorage.removeItem("cleanones_client_refresh_token");
      localStorage.removeItem("token");
    } catch {
      // ignore
    }
  }
}

export default authSlice.reducer;
