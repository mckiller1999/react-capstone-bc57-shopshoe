import { ADD_TO_CART } from "../constants/cardConstant";

const initialState = {
  cartShoes: [],
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      console.log("test");
      // use findIndex to search for duplicate shoe
      let index = state.cartShoes.findIndex((item) => {
        return item.id === payload.id;
      });
      console.log(index);
      let newCartShoe = [...state.cartShoes];
      if (index === -1) {
        let addedCartShoe = { ...payload, quantity: 1 };
        newCartShoe = [...newCartShoe, addedCartShoe];
      } else {
        newCartShoe[index] = {
          ...newCartShoe[index],
          quantity: newCartShoe[index].quantity + 1,
        };
      }
      console.log("Updated state:", { ...state, cartShoes: newCartShoe });
      return { ...state, cartShoes: newCartShoe };
    }
    default:
      return state;
  }
};
