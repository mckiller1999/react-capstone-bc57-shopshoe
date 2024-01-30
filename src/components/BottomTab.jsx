import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Badge, Space, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartIem from "../pages/Cart/CartIem";
import { http } from "../utils/Config";
import { useDispatch } from "react-redux";
import { saveOrder } from "../redux/reducer/CartReducer";

const BottomTab = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = (data) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: data,
        duration: 2,
      });
    }, 1000);
  };
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartReducer);
  const { userLogin } = useSelector((state) => state.userReducer);

  // Move the initialization of orderList after cartList is declared
  const orderList = cartList.cartShoes.map(({ id, quantity }) => ({
    productId: id.toString(),
    quantity,
  }));

  let submitOrder = {
    orderDetail: orderList,
    email: userLogin.email,
  };

  let totalCartAmt = 0;
  cartList.cartShoes.forEach((item) => {
    return (totalCartAmt += item.price * item.quantity);
  }, 0);

  const submitOrderCart = async (submitOrder) => {
    try {
      const res = await http.post("Users/order", submitOrder);
      console.log(res);
      openMessage(res.data.content);
      dispatch(saveOrder(submitOrder.orderDetail));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className=" text-primary d-flex justify-content-around p-3 text-center  "
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#f5f5f5",
      }}
    >
      <div>
        {(() => {
          if (userLogin.email !== "") {
            return (
              <NavLink className="nav-link" to="/profile">
                <i className="fa fa-user"></i>
              </NavLink>
            );
          } else
            return (
              <NavLink className="nav-link" to="/login">
                <i className="fa fa-users"></i>
                <h5>Login </h5>
              </NavLink>
            );
        })()}
      </div>
      <div>
        <NavLink to={"/"}>
          <i className="fa fa-home"></i>
        </NavLink>
      </div>

      <div>
        <NavLink
          className="nav-link"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <Badge count={cartList.cartCount}>
            <ShoppingCartOutlined style={{ fontSize: 20, color: "blue" }} />
          </Badge>
        </NavLink>
      </div>
      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header" style={{ backgroundColor: "#f5f5f5" }}>
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
        <div class="offcanvas-body" style={{ backgroundColor: "#f5f5f5" }}>
          <div className="container">
            {cartList.cartShoes.map((item) => (
              <CartIem key={item.id} item={item} />
            ))}
            <h5 className="mt-2">Total: ${totalCartAmt} </h5>
            <button
              className="btn btn-primary"
              onClick={() => {
                submitOrderCart(submitOrder);
              }}
            >
              Submit order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
