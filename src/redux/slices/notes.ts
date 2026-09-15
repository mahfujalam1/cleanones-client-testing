import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClientNote {
  id: string;
  title: string;
  location: string;
  content: string;
  createdAt: string;
}

export interface NotesState {
  notes: ClientNote[];
}

const initialState: NotesState = {
  notes: [
    {
      id: "1",
      title: "Meeting Room First",
      location: "Floor 3 - Conference Room A",
      content: "Please clean the meeting room first. Board meeting at 10 AM.",
      createdAt: "Jun 30, 2026 - 09:00 AM",
    },
    {
      id: "2",
      title: "Extra Attention - Lobby",
      location: "Ground Floor - Lobby",
      content: "Pay extra attention to the lobby entrance area. High-traffic zone.",
      createdAt: "Jun 28, 2026 - 03:30 PM",
    },
    {
      id: "3",
      title: "Kitchen Deep Clean",
      location: "Floor 2 - Kitchen",
      content: "Don't forget the kitchen. The microwave and fridge need extra attention today.",
      createdAt: "Jun 26, 2026 - 11:00 AM",
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<ClientNote, "id" | "createdAt">>) => {
      const now = new Date();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} - ${String(
        now.getHours() % 12 || 12
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
      
      const newNote: ClientNote = {
        id: String(Date.now()),
        createdAt: formattedDate,
        ...action.payload,
      };
      state.notes.unshift(newNote);
    },
    updateNote: (state, action: PayloadAction<ClientNote>) => {
      const index = state.notes.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
