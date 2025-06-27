import { configureStore } from "@reduxjs/toolkit"
import navigationSlice from "./features/navigation/navigationSlice"
import reservationSlice from "./features/reservations/reservationSlice"

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    reservations: reservationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
