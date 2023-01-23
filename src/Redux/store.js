import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Task";

export const store = configureStore({
  reducer: {
    task:taskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      devTools:false
    }),
});
