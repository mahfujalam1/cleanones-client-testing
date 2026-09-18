import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationClientState {
  selectedLocationId: string | null;
  selectedRoomId: string | null;
  searchTerm: string;
  filterStatus: "all" | "active" | "inactive";
}

const initialState: LocationClientState = {
  selectedLocationId: null,
  selectedRoomId: null,
  searchTerm: "",
  filterStatus: "all",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<string | null>) => {
      state.selectedLocationId = action.payload;
      state.selectedRoomId = null; 
    },
    setSelectedRoom: (state, action: PayloadAction<string | null>) => {
      state.selectedRoomId = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<LocationClientState["filterStatus"]>) => {
      state.filterStatus = action.payload;
    },
    clearLocationSelection: (state) => {
      state.selectedLocationId = null;
      state.selectedRoomId = null;
    },
  },
});

export const {
  setSelectedLocation,
  setSelectedRoom,
  setSearchTerm,
  setFilterStatus,
  clearLocationSelection,
} = locationSlice.actions;

export default locationSlice.reducer;
