import { configureStore } from "@reduxjs/toolkit";
import { musicApi } from "./services/musicApi";
import { genresApi } from "./services/genresApi";

export const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(musicApi.middleware)
      .concat(genresApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
