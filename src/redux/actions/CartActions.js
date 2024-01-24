// define all actions add / increase / decrease cart

import { ADD_TO_CART, DECREASE_SHOE, INCREASE_SHOE } from "../constants/cardConstant"

export const addShoeToCart = (shoe) => {
    return {
        type: ADD_TO_CART,
        payload: shoe
    }
}
export const increaseShoeCart = (idShoe) => {
    return {
        type: INCREASE_SHOE,
        payload: idShoe,
    }
}
export const decreaseShoeCart = (idShoe) => {
    return {
        type: DECREASE_SHOE,
        payload: idShoe,
    }
}