import { configureStore } from "@reduxjs/toolkit";
import { calendarReducer } from "../reducer/calendar-slice";
import { escaperoomReducer } from "../reducer/escaperooms-slice";
import { reservationReducer } from "../reducer/reservations-slice";
import { userReducer } from "../reducer/users-slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    escaperooms: escaperoomReducer,
    reservations: reservationReducer,
    calendar: calendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
