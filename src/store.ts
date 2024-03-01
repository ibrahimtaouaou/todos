import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./features/tabs/tabSlice";
import itemReducer from "./features/items/itemSlice";

const store = configureStore({
  reducer: {
    tabs: tabReducer,
    items: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
