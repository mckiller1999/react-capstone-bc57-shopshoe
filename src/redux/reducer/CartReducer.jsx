// import { ADD_TO_CART } from "../constants/cardConstant"

import { createSlice } from "@reduxjs/toolkit";

import { http } from "../../utils/Config";

const CartReducer = createSlice({
  name: "CartReducer",
  initialState: {
    cartShoes: [],
    cartShoesHistory: [],

    submitOrder: [],
    orderData: null,
    cartCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // Bạn không cần phải import immer nếu sử dụng Redux Toolkit
      state.cartCount += 1;
      const payload = action.payload;
      const index = state.cartShoes.findIndex((item) => item.id === payload.id);
      const newCartShoe = [...state.cartShoes];

      if (index === -1) {
        const addedCartShoe = { ...payload, quantity: 1 };
        newCartShoe.push(addedCartShoe);
      } else {
        newCartShoe[index] = {
          ...newCartShoe[index],
          quantity: newCartShoe[index].quantity + 1,
        };
      }

      // Cập nhật state bằng produce
      state.cartShoes = newCartShoe;
      state.cartShoesHistory = state.cartShoesHistory.concat(newCartShoe);
    },
    increaseItem: (state, action) => {
      let itemID = action.payload;
      // console.log("itemID", itemID)
      let index = state.cartShoes.findIndex((item) => {
        return item.id === itemID;
      });
      // console.log("index",index)
      let newCartShoe = [...state.cartShoes];
      newCartShoe[index] = {
        ...newCartShoe[index],
        quantity: newCartShoe[index].quantity + 1,
      };

      return { ...state, cartShoes: newCartShoe };
    },
    decreaseItem: (state, action) => {
      let itemID = action.payload;
      let index = state.cartShoes.findIndex((item) => {
        return item.id === itemID;
      });
      let newCartShoe = [...state.cartShoes];
      newCartShoe[index] = {
        ...newCartShoe[index],
        quantity: newCartShoe[index].quantity - 1,
      };
      // if else in decrease
      if (newCartShoe[index].quantity <= 0) {
        newCartShoe = [
          ...newCartShoe.slice(0, index),
          ...newCartShoe.slice(index + 1),
        ];
      }
      return { ...state, cartShoes: newCartShoe };
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      const index = state.cartShoes.findIndex((item) => item.id === itemID);

      if (index !== -1) {
        state.cartShoes.splice(index, 1); // Sử dụng splice để cập nhật trực tiếp draft
        state.cartCount -= 1;
      }
    },
    submitOrder: (state, action) => {
      state.submitOrder = action.payload;
      state.cartShoesHistory = state.cartShoesHistory.concat(state.cartShoes);
    },
    saveOrder: (state, action) => {
      state.orderData = action.payload;
      console.log(state.orderData);
      state.cartCount = 0;
      state.cartShoes = [];
    },
  },
});

export const { addToCart, increaseItem, decreaseItem, removeItem, saveOrder } =
  CartReducer.actions;

export default CartReducer.reducer;
