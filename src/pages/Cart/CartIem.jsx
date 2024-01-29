import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../redux/reducer/CartReducer";

function CartIem({ item }) {
  let dispatch = useDispatch();
  let totalPrice = item.quantity * item.price;
  return (
    <div className="my-4">
      <div>
        <div
          className="container row border"
          style={{ backgroundColor: "#fff" }}
        >
          <img className="col-md-5" src={item.image} alt="" />
          <div className="col-md-7">
            <div className="row align-items-center mb-2">
              <p className="col-md-6 text text-start">{item.name}</p>
              <p>Size: {item.selectedSize}</p>
              <p className="col-md-6 text-end">{totalPrice}$</p>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className=" row col-6 align-items-center">
            <button
              className="btn btn-primary col"
              onClick={() => dispatch(increaseItem(item.id))}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <p className="col text-center">{item.quantity}</p>
            <button
              className="btn btn-primary col"
              onClick={() => dispatch(decreaseItem(item.id))}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-danger col"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartIem;
