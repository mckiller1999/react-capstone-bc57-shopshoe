import React from "react";
import CartIem from "./CartIem";
import { connect } from "react-redux";

const Cart = (props) => {
  console.log("addedCart", props.cartList);

  return (
    <div>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            My order
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <h5 className="mb-4">Order summary</h5>
          <CartIem />

          <div className="container">
            <h5>My order</h5>
            <h5 className="mb-4">Order summary</h5>
            <CartIem />
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cartList: state.cartReducer.cartShoes,
//   }
// }

// export default connect(mapStateToProps, null)(Cart);
export default Cart;
