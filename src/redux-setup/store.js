import { configureStore } from "@reduxjs/toolkit";
import { UserSliceReducer } from "./UserDataSlice";

export const store = configureStore({
  reducer: { UserSlice: UserSliceReducer },
});
