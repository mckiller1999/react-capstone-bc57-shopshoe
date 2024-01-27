// import { ADD_TO_CART } from "../constants/cardConstant"

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/Config";


const CartReducer = createSlice({
    name: 'CartReducer',
    initialState: {
        cartShoes: [],
        submitOrder: []
    },
    reducers: {
        addToCart: (state, action) => {
            let payload = action.payload
            
          // use findIndex to search for duplicate shoe
            let index = state.cartShoes.findIndex((item)=>{                
                return item.id === payload.id
            });
            // console.log(index)
            let newCartShoe = [...state.cartShoes]
            if (index === -1) {
                let addedCartShoe = {...payload, quantity:1}
                newCartShoe = [...newCartShoe, addedCartShoe]
            } else {
                newCartShoe[index] ={...newCartShoe[index], quantity: newCartShoe[index].quantity + 1}
            }
            // console.log("Updated state:", { ...state, cartShoes: newCartShoe });
            return {...state, cartShoes: newCartShoe}
        },
        increaseItem: (state,action) => {
            let itemID = action.payload
            // console.log("itemID", itemID)
            let index = state.cartShoes.findIndex((item)=>{
                return item.id === itemID
            })
            // console.log("index",index)
            let newCartShoe = [...state.cartShoes]
            newCartShoe[index] = {...newCartShoe[index], quantity: newCartShoe[index].quantity + 1}

            return {...state, cartShoes: newCartShoe}
        },
        decreaseItem: (state, action) => {
            let itemID = action.payload
            let index = state.cartShoes.findIndex((item)=>{
                return item.id === itemID
            })
            let newCartShoe = [...state.cartShoes]
            newCartShoe[index] = {...newCartShoe[index], quantity: newCartShoe[index].quantity - 1}
            // if else in decrease
            if (newCartShoe[index].quantity <= 0) {
                newCartShoe = [...newCartShoe.slice(0, index),...newCartShoe.slice(index+1)]
            }
            return {...state, cartShoes: newCartShoe}
        },
        removeItem: (state, action) => {
            let itemID = action.payload
            let index = state.cartShoes.findIndex((item)=>{
                return item.id === itemID
            })
            // console.log("removeindex",index)
            let newCartShoe = [...state.cartShoes]
            newCartShoe = [...newCartShoe.slice(0, index),...newCartShoe.slice(index + 1)]
            return {...state, cartShoes : newCartShoe}
            
        },
        submitOrder: (state,action) => {
            state.submitOrder = action.payload
        }
    },

});



export const {addToCart, increaseItem, decreaseItem, removeItem} = CartReducer.actions;

export default CartReducer.reducer;




