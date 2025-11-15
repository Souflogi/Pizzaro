import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const rootRedcuer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootRedcuer,
});

export default store;
