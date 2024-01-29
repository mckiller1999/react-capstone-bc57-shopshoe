import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useGetAPI from "../components/CustomeHook/useGetAPI";
import { Button, message, Pagination, Select } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";

const Home = (props) => {
  const data = useGetAPI("https://shop.cyberlearn.vn/api/Product");
  const arrProd = data.content;
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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

  // Tính toán phạm vi hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (arrProd || []).slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);
  const sizeArray =
    typeof currentItems[0]?.size === "string"
      ? currentItems[0]?.size
          .slice(1, -1)
          .split(",")
          .map((size) => size.trim())
      : currentItems[0]?.size;

  const sizeOptions =
    sizeArray?.map((size, index) => ({
      value: size,
      label: size,
    })) || [];

  // Thay đổi trang hiện tại khi người dùng chuyển trang
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pb-5">
      {contextHolder}

      <div className="">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <NavLink to={"/search?keyword=adidas"}>
                <img
                  src={process.env.PUBLIC_URL + "/img/adidas-banner.png"}
                  className="d-block w-100"
                  alt="..."
                />
              </NavLink>
            </div>
            <div className="carousel-item">
              <NavLink to="/search?keyword=nike">
                <img
                  src={process.env.PUBLIC_URL + "/img/nike-banner.png"}
                  className="d-block w-100 "
                  alt="..."
                />
              </NavLink>
            </div>
            <div className="carousel-item">
              <NavLink to={"/search?keyword=vans"}>
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
      <div className="container">
        <div className="row ">
          {currentItems.map((prod, index) => {
            return (
              <div
                className="col-12 col-lg-4"
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div className="conatiner m-4">
                  <div className="card p-4">
                    <NavLink to={`/detail/${prod.id}`}>
                      <img
                        className="card-img-top"
                        src={prod.image}
                        alt={prod.name}
                      />
                    </NavLink>

                    <div className="card-body">
                      <div className="">
                        <h5 className="card-title">{prod.price}$</h5>
                        <p className="card-text"> {prod.name}</p>
                        <Select
                          showSearch
                          placeholder="size"
                          optionFilterProp="children"
                          onChange={handleSizeChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={sizeOptions}
                        />
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(prod)}

                          // Disable button if no size is selected
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
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={(arrProd || []).length}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Home;
