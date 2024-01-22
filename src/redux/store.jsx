import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducer/UserReducer";
import CartReducer from "./reducer/CartReducer";



export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    cartReducer: CartReducer,
  },
});
