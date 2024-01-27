import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "../index";
import { useFormik } from "formik";
import CartIem from "../pages/Cart/CartIem";
import { http } from "../utils/Config";

const Header = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const cartList = useSelector((state)=>state.cartReducer)
  console.log("cartShoes",cartList.cartShoes)

  const orderList = cartList.cartShoes.map(({id,quantity })=>({productId: id.toString(), quantity}))
  console.log("orderList",orderList)

  let submitOrder = {
    orderDetail: orderList,
    email: userLogin.email,
  }

  console.log("orderDetail", submitOrder.orderDetail)
  console.log("submitOrder",submitOrder)
  
  let totalCartAmt = 0
  cartList.cartShoes.forEach((item) => {
      return totalCartAmt += item.price*item.quantity
  }, 0)
  console.log("totalCartAmt", totalCartAmt)


  const submitOrderCart = async (submitOrder) => {
        try {
            const res = await http.post("Users/order",submitOrder);
            console.log(res)
            alert(res.data.content)
        } catch (err) {
            alert(err)
        }
    }




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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
            <button className="btn btn-outline-success" type="submit">
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
                        welcome {userLogin.email}
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
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasScrolling"
                  aria-controls="offcanvasScrolling"
                >
                  demo cart
                </button>
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
          <div className="container">
            <h5>My order</h5>
            {cartList.cartShoes.map((item)=>(
            <CartIem key={item.id} item={item}/>           
          ))}
          <h5 className="mt-2">Total: ${totalCartAmt} </h5>
          <button className="btn btn-success" onClick={()=>{submitOrderCart(submitOrder)}}>Submit order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header