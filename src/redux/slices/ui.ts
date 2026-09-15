import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  mobileSidebarOpen: boolean;
  activeTab: string;
  logoutModalOpen: boolean;
  sidebarCollapsed: boolean;
}

const initialState: UIState = {
  mobileSidebarOpen: false,
  activeTab: "dashboard",
  logoutModalOpen: false,
  sidebarCollapsed: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLogoutModalOpen: (state, action: PayloadAction<boolean>) => {
      state.logoutModalOpen = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const {
  toggleMobileSidebar,
  setMobileSidebarOpen,
  setActiveTab,
  setLogoutModalOpen,
  toggleSidebarCollapsed,
} = uiSlice.actions;

export default uiSlice.reducer;
