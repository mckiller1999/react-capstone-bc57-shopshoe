import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "../index";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import CartIem from "../pages/Cart/CartIem";
import { http } from "../utils/Config";
import { saveOrder } from "../redux/reducer/CartReducer";
import { Avatar, Badge, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

const Header = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.userReducer);

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const cartList = useSelector((state) => state.cartReducer);
  console.log("cartShoes", cartList.cartShoes);

  const orderList = cartList.cartShoes.map(({ id, quantity }) => ({
    productId: id.toString(),
    quantity,
  }));

  //console.log("orderList", orderList);

  let submitOrder = {
    orderDetail: orderList,
    email: userLogin.email,
  };

  // console.log("orderDetail", submitOrder.orderDetail);
  // console.log("submitOrder", submitOrder);

  let totalCartAmt = 0;
  cartList.cartShoes.forEach((item) => {
    return (totalCartAmt += item.price * item.quantity);
  }, 0);
  //console.log("totalCartAmt", totalCartAmt);
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

  const formSearch = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: ({ keyword }) => {
      history.push(`/search?keyword=${keyword}`);
      //console.log(keyword);
    },
  });

  return (
    <div>
      {contextHolder}
      <nav
        className="navbar navbar-expand-lg  "
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="container-fluid px-5 py-2">
          <NavLink className="navbar-brand" to="/">
            ShopShoe
          </NavLink>
          <form
            onSubmit={formSearch.handleSubmit}
            className="d-flex w-75 w-sm-100 "
            role="search"
          >
            <input
              name="keyword"
              onChange={formSearch.handleChange}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarSupportedContent"
          >
            {/* search */}

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                {(() => {
                  if (userLogin.email !== "") {
                    return (
                      <NavLink className="nav-link" to="/profile">
                        {userLogin.email}
                      </NavLink>
                    );
                  } else
                    return (
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    );
                })()}
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasScrolling"
                  aria-controls="offcanvasScrolling"
                >
                  <Badge count={cartList.cartCount}>
                    <ShoppingCartOutlined
                      style={{ fontSize: 30, color: "#000" }}
                    />
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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

export default Header;
