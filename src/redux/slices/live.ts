import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CleaningTask {
  id: string;
  name: string;
  status: "completed" | "in_progress" | "pending";
  timestamp?: string;
}

export interface LiveSession {
  room: string;
  location: string;
  buildingDetails: string;
  progress: number;
  estCompletion: string;
  cleanerName: string;
  cleanerRole: string;
  arrivalTime: string;
  arrivalStatus: string;
  tasks: CleaningTask[];
}

const initialState: LiveSession = {
  room: "Room 204",
  location: "Floor 3 - Main Office",
  buildingDetails: "Building A, Suite 301",
  progress: 60,
  estCompletion: "12:00 PM",
  cleanerName: "Sarah Mitchell",
  cleanerRole: "Team Lead - Alpha",
  arrivalTime: "08:55 AM",
  arrivalStatus: "On time - Jul 1, 2026",
  tasks: [
    { id: "1", name: "Vacuum Floor", status: "completed", timestamp: "09:48 AM" },
    { id: "2", name: "Clean Mirrors", status: "completed", timestamp: "09:52 AM" },
    { id: "3", name: "Empty Trash", status: "completed", timestamp: "10:01 AM" },
    { id: "4", name: "Mop Floor", status: "in_progress", timestamp: "10:09 AM (Est.)" },
    { id: "5", name: "Replace Amenities", status: "pending" },
  ],
};

export const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        if (task.status === "pending") {
          task.status = "in_progress";
          task.timestamp = "Now (Est.)";
        } else if (task.status === "in_progress") {
          task.status = "completed";
          const now = new Date();
          task.timestamp = `${String(now.getHours() % 12 || 12).padStart(2, "0")}:${String(
            now.getMinutes()
          ).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
        } else {
          task.status = "pending";
          delete task.timestamp;
        }

        
        const completedCount = state.tasks.filter((t) => t.status === "completed").length;
        state.progress = Math.round((completedCount / state.tasks.length) * 100);
      }
    },
    updateLiveSession: (state, action: PayloadAction<Partial<LiveSession>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { toggleTaskStatus, updateLiveSession } = liveSlice.actions;
export default liveSlice.reducer;
