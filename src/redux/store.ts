import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import { apiSlice } from "./apiSlice";


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
})

export interface AppThunkConfig {
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: string,
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store