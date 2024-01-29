import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Button, message, Select } from "antd";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Detail = () => {
  const [prodDetail, setProdDetail] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };
  const sizeOptions =
    prodDetail.size?.map((size, index) => ({
      value: size,
      label: size,
    })) || [];
  const dispatch = useDispatch();
  const param = useParams();
  const getProdId = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${param.id}`,
      method: "GET",
    });
    return setProdDetail(res.data.content);
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

    // Tạo đối tượng sản phẩm để thêm vào giỏ hàng
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

    // Cập nhật state khi người dùng nhấp vào "Add to cart"
  };
  useEffect(() => {
    getProdId();
  }, [param.id]);
  return (
    <div className="container">
      {contextHolder}
      <h3>Detail</h3>
      <div className="row">
        <div className="col col-lg-4">
          <img src={prodDetail.image} alt="" width={250} height={250} />
        </div>
        <div className="col col-lg-4 my-3">
          <h3>{prodDetail.name}</h3>
          <p>des: {prodDetail.description}</p>

          <Select
            showSearch
            placeholder="Select a size"
            optionFilterProp="children"
            onChange={handleSizeChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={sizeOptions}
          />

          <button
            className="btn btn-primary mx-2"
            onClick={() => handleAddToCart(prodDetail)}
          >
            Add to cart
          </button>
        </div>
        <h3 className="text-center">Related Product</h3>
        <div className="row">
          {prodDetail.relatedProducts?.map((prod, index) => {
            return (
              <div className="col-12 col-lg-4" key={index}>
                <div className="card" key={index}>
                  <img className="card-img-top" src={prod.image} alt="" />
                  <div className="card-body">
                    <p style={{ fontSize: 13 }}>{prod.name} </p>
                    <p>{prod.price}$ </p>
                    <NavLink className="btn btn-dark" to={`/detail/${prod.id}`}>
                      View Detail
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
