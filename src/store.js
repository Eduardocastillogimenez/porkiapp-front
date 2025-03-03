import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import farmReducer from "./features/farms/farmSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    farm: farmReducer,
  },
});

export default store;
