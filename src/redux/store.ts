import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { authReducer } from "./Slices/authSlice";
import { walletsReducer } from "./Slices/walletsSlice";
import { categoriesReducer } from "./Slices/categoriesSlice";
import { transactionsReducer } from "./Slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallets: walletsReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
