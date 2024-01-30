import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Pagination, Select } from "antd";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import useWindowSize from "../components/CustomeHook/useWindowSize";

const SearchMobile = () => {
  const windowSize = useWindowSize();
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };
  const dispatch = useDispatch();
  const [arrProd, setArrProd] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useSearchParams();
  const key = search.get("keyword");

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
  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
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
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Tính toán phạm vi hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (arrProd || []).slice(indexOfFirstItem, indexOfLastItem);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      {contextHolder}
      <h1 className="text-start">Resul for: {key}</h1>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={(arrProd || []).length}
        onChange={handleChangePage}
      />
      <div className="mt-2">
        {currentItems.map((prod, index) => {
          return (
            <div
              className="d-flex my-2"
              style={{ border: "1px solid #000", borderRadius: "20px" }}
              key={index}
            >
              <div className="d-flex p-4">
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
                <div className="w-75 px-2">
                  <div
                    className="prod-info d-flex flex-column"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <h3>{prod.name}</h3>
                      <p>{prod.description}</p>
                    </div>
                    <div className="text-end d-flex justify-content-between align-items-center">
                      <Select
                        showSearch
                        placeholder="size"
                        optionFilterProp="children"
                        onChange={handleSizeChange}
                        filterOption={filterOption}
                        options={sizeOptions}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(prod)}
                      >
                        Add to cart
                      </button>
                    </div>
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

export default SearchMobile;
