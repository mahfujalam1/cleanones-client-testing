import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { clientApi } from "./apis/clientApi";
import authReducer from "./slices/auth";
import locationReducer from "./slices/location";
import uiReducer from "./slices/ui";
import liveReducer from "./slices/live";
import notesReducer from "./slices/notes";
import scheduleReducer from "./slices/schedule";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    ui: uiReducer,
    live: liveReducer,
    notes: notesReducer,
    schedule: scheduleReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, clientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
