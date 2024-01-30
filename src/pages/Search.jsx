import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { Button, message, Pagination, Select } from "antd";
import { useDispatch } from "react-redux";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";

import axios from "axios";
import { addToCart } from "../redux/reducer/CartReducer";
import useWindowSize from "../components/CustomeHook/useWindowSize";

const Search = () => {
  const windowSize = useWindowSize();
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };
  const dispatch = useDispatch();
  const [search, SetSearch] = useSearchParams();
  const [arrProd, setArrProd] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const key = search.get("keyword");
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getProdByKeyword = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${key}`,
      method: "GET",
    });
    setArrProd(res.data.content);
  };
  useEffect(() => {
    getProdByKeyword();
  }, [key]);

  const handleAddToCart = (prod) => {
    if (!selectedSize) {
      // Hiển thị thông báo hoặc xử lý khi kích thước không được chọn
      messageApi.warning({
        key,
        content: "Vui lòng chọn kích cỡ sản phẩm!",
      });
      return;
    }
    const productToAdd = {
      ...prod,
      selectedSize: selectedSize,
    };
    dispatch(addToCart(productToAdd));
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });

    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Đã thêm vào giỏ hàng!",
        duration: 2,
      });
    }, 1000);
  };

  const sizeArray =
    typeof arrProd[0]?.size === "string"
      ? arrProd[0]?.size
          .slice(1, -1)
          .split(",")
          .map((size) => size.trim())
      : arrProd[0]?.size;

  const sizeOptions =
    sizeArray?.map((size, index) => ({
      value: size,
      label: size,
    })) || [];
  return (
    <div className="container my-3">
      <h1 className="text-start">Resul for: {key}</h1>
      <div className="row">
        {arrProd?.map((prod, index) => {
          return (
            <div className="col-12 col-lg-4" key={index}>
              <div className="conatiner m-4">
                <div className="card p-4">
                  <NavLink
                    to={`/detail${windowSize.width >= 992 ? "" : "mobile"}/${
                      prod.id
                    }`}
                  >
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                      <Paper>
                        <img
                          className="card-img-top"
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Paper>
                    </Slide>
                  </NavLink>
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.price}</p>
                    <Select
                      showSearch
                      placeholder="size"
                      optionFilterProp="children"
                      onChange={handleSizeChange}
                      filterOption={filterOption}
                      options={sizeOptions}
                    />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={() => handleAddToCart(prod)}

                      // Disable button if no size is selected
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
