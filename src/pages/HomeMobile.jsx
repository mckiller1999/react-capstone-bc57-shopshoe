import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Pagination, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import useWindowSize from "../components/CustomeHook/useWindowSize";

import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
AOS.init();
AOS.refresh();
const HomeMobile = (props) => {
  const windowSize = useWindowSize();
  const [arrProduct, setArrProduct] = useState([]);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getAllProductApi = async () => {
      const res = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      setArrProduct(res.data.content);
    };

    // Gọi API khi component được mount
    getAllProductApi();
  }, []);

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

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
    typeof arrProduct[0]?.size === "string"
      ? arrProduct[0]?.size
          .slice(1, -1)
          .split(",")
          .map((size) => size.trim())
      : arrProduct[0]?.size;

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
  const currentItems = (arrProduct || []).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Thay đổi trang hiện tại khi người dùng chuyển trang
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      {contextHolder}

      <div className="">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <NavLink to={"/searchmobile?keyword=adidas"}>
                <img
                  src={process.env.PUBLIC_URL + "/img/adidas-banner.png"}
                  className="d-block w-100 "
                  alt="..."
                />
              </NavLink>
            </div>
            <div className="carousel-item">
              <NavLink to="/searchmobile?keyword=nike">
                <img
                  src={process.env.PUBLIC_URL + "/img/nike-banner.png"}
                  className="d-block w-100 "
                  alt="..."
                />
              </NavLink>
            </div>
            <div className="carousel-item">
              <NavLink to={"/searchmobile?keyword=vans"}>
                <img
                  src={process.env.PUBLIC_URL + "/img/vans-banner.png"}
                  className="d-block w-100 "
                  alt="..."
                />
              </NavLink>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={(arrProduct || []).length}
          onChange={handleChangePage}
        />
        {currentItems.map((prod, index) => {
          return (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
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
                        onSearch={onSearch}
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

export default HomeMobile;
