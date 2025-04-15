import { configureStore } from "@reduxjs/toolkit";
import ticketsSlice from "./slice/ticketsSlice";
import filterSlice from "./slice/filterSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;