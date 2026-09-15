import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CleaningVisit {
  id: string;
  date: string;
  timeRange: string;
  team: string;
  status: "scheduled" | "in_progress" | "completed";
  type: string;
  exactMinutes?: number;
  scheduledMinutes?: number;
  location?: string;
}

export interface ScheduleState {
  visits: CleaningVisit[];
  filterStatus: "all" | "scheduled" | "in_progress" | "completed";
  filterDate: "today" | "week" | "month";
}

const initialState: ScheduleState = {
  visits: [
    {
      id: "1",
      date: "Tuesday, July 1, 2026",
      timeRange: "08:55 AM - 12:00 PM",
      team: "Team Alpha",
      status: "in_progress",
      type: "Regular Cleaning",
      exactMinutes: 181,
      scheduledMinutes: 240,
      location: "Apex Tech · Main office",
    },
    {
      id: "2",
      date: "Thursday, July 3, 2026",
      timeRange: "09:00 AM - 12:30 PM",
      team: "Team Alpha",
      status: "scheduled",
      type: "Regular Cleaning",
      exactMinutes: 150,
      scheduledMinutes: 210,
      location: "Apex Tech · Main office",
    },
    {
      id: "3",
      date: "Monday, July 7, 2026",
      timeRange: "08:00 AM - 11:00 AM",
      team: "Team Beta",
      status: "scheduled",
      type: "Deep Cleaning",
    },
    {
      id: "4",
      date: "Thursday, July 10, 2026",
      timeRange: "09:00 AM - 12:30 PM",
      team: "Team Alpha",
      status: "scheduled",
      type: "Regular Cleaning",
    },
    {
      id: "5",
      date: "Monday, July 14, 2026",
      timeRange: "09:00 AM - 01:00 PM",
      team: "Team Gamma",
      status: "scheduled",
      type: "Window Cleaning",
    },
  ],
  filterStatus: "all",
  filterDate: "week",
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<ScheduleState["filterStatus"]>) => {
      state.filterStatus = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<ScheduleState["filterDate"]>) => {
      state.filterDate = action.payload;
    },
    addVisit: (state, action: PayloadAction<Omit<CleaningVisit, "id">>) => {
      const newVisit: CleaningVisit = {
        id: String(state.visits.length + 1),
        ...action.payload,
      };
      state.visits.push(newVisit);
    },
  },
});

export const { setFilterStatus, setFilterDate, addVisit } = scheduleSlice.actions;
export default scheduleSlice.reducer;
