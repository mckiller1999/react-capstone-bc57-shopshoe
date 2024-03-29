import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Button, message, Select } from "antd";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Rnd } from "react-rnd";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

AOS.init();
AOS.refresh();

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

  const zoomToImage = (ref) => {
    const { centerView } = ref;
    centerView(undefined, 350, "easeOutCubic");
  };

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
          <TransformWrapper
            centerZoomedOut={true}
            centerOnInit
            limitToBounds
            onZoomStop={zoomToImage}
            onPinching={zoomToImage}
            onWheelStop={zoomToImage}
            onPanningStop={zoomToImage}
            panning={{ disabled: true }}
          >
            <TransformComponent
              wrapperStyle={{
                width: 250,
                height: 250,
              }}
            >
              <Rnd
                default={{
                  x: -120,
                  y: -120,
                  width: 250,
                  height: 250,
                }}
                onDragStop={(event) => event.stopImmediatePropagation()}
              >
                <img src={prodDetail.image} alt="" width={250} height={250} />
              </Rnd>
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="col col-lg-4 my-3">
          <h3>{prodDetail.name}</h3>
          <p>des: {prodDetail.description}</p>
          <p className="">price: ${prodDetail.price}</p>

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
            className="btn btn-primary m-2"
            onClick={() => handleAddToCart(prodDetail)}
          >
            Add to cart
          </button>
        </div>
        <h3 className="text-center">Related Product</h3>
        <div className="row">
          {prodDetail.relatedProducts?.map((prod, index) => {
            return (
              <div
                className="col-12 col-lg-4"
                key={index}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="card w-75 m-5" key={index}>
                  <NavLink to={`/detail/${prod.id}`}>
                    <img className="card-img-top" src={prod.image} alt="" />
                  </NavLink>
                  <div className="card-body">
                    <p style={{ fontSize: 13 }}>{prod.name} </p>
                    <p>{prod.price}$ </p>
                    <p>{prod.description}</p>
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
