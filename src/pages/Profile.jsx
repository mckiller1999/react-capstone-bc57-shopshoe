import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileApiAction,
  logoutApiAction,
} from "../redux/reducer/UserReducer";
import Logout from "./Logout";
import { useFormik } from "formik";
import * as yup from "yup";
import { http } from "../utils/Config";
import ProfileOrder from "./ProfileOrder";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Select, Empty, Pagination } from "antd";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);
  //console.log("userProfile", userProfile);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(userProfile.avatar);
  const [selectedGender, setSelectedGender] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [currentPageData, setCurrentPageData] = useState([]);

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setSelectedImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userProfile.email,
      password: userProfile.password,
      name: userProfile.name,
      phone: userProfile.phone,
      gender: selectedGender,
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
      name: yup.string().required("Name is required"),
      phone: yup.string().required("Phone is required"),
      gender: yup.boolean().required("Gender is required"),
    }),
    // submit form to BE
    onSubmit: async (values) => {
      console.log("values", values);
      //alert(JSON.stringify(values, null, 2));
      try {
        let res = await http.post("Users/updateProfile", values);
        messageApi
          .open({
            type: "loading",
            content: "Đang cập nhật mới thông tin",
            duration: 2.5,
          })
          .then(() => message.success("thông tin đã được cập nhật", 2.5))
          .then(() => message.info("thông tin đã được cập nhật", 2.5));

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  });

  console.log("userProfile", userProfile);
  console.log("initialValues", formik.values);
  console.log("userProfile.gender", formik.values.gender);

  const dispatch = useDispatch();
  const getProfileApi = async () => {
    const action = getProfileApiAction();
    dispatch(action);
  };
  const handleLogout = () => {
    dispatch(logoutApiAction());
  };
  const cartList = useSelector((state) => state.cartReducer);
  console.log("cartShoes", cartList.cartShoes);
  console.log("cartShoes", cartList.cartShoesHistory);

  const orderList = cartList.cartShoesHistory.map(({ id, quantity }) => ({
    productId: id.toString(),
    quantity,
  }));
  console.log("orderList", orderList);

  let submitOrder = {
    orderDetail: orderList,
  };

  console.log("orderDetail", submitOrder.orderDetail);
  console.log("submitOrder", submitOrder);

  useEffect(() => {
    getProfileApi();
    setSelectedGender(userProfile.gender);
    setSelectedImageUrl(userProfile.avatar);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageData(submitOrder.orderDetail.slice(startIndex, endIndex));
  }, [
    userProfile.gender,
    userProfile.avatar,
    currentPage,
    submitOrder.orderDetail,
  ]);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      {contextHolder}
      <h1 className="text-center">{userProfile.name} Profile</h1>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={selectedImageUrl || userProfile.avatar}
          width={150}
          height={150}
          className="rounded-circle"
          alt=""
        />
      </div>

      <div className="d-flex justify-content-around ">
        <form
          action=""
          className="row g-3 w-50"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div>
            <label className="form-label mb-1">Email address</label>
            <input
              className="form-control"
              type="email"
              placeholder="email@gmail.com"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            ></input>
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label mb-1">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="password"
              name="password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            ></input>
            {formik.errors.password && formik.touched.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <label className="form-label mb-1">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            ></input>
            {formik.errors.name && formik.touched.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label mb-1">Phone</label>
            <input
              className="form-control"
              type="tel"
              placeholder="Phone"
              name="phone"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            ></input>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-danger">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label mb-1">Gender</label>
            {/*  */}

            <Select
              showSearch
              placeholder="Select a Gender"
              optionFilterProp="children"
              onChange={handleGenderChange}
              value={selectedGender}
              filterOption={filterOption}
              options={[
                {
                  value: true,
                  label: "Male",
                },
                {
                  value: false,
                  label: "Female",
                },
              ]}
            />
            <br className="" />
            {/*  */}
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value={"true"}
                onChange={formik.handleChange}
                checked="checked"
              ></input>
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value={"false"}
                onChange={formik.handleChange}
              ></input>
              <label className="form-check-label">Female</label>
            </div> */}
            <div className=" d-flex justify-content-between align-items-center my-3">
              <button type="submit" className="btn btn-primary" value="Submit">
                Change info!
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center flex-column align-items-center flex-sm-column">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader ms-5"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <p>click to upload img</p>
          <p>Max of file 1 MB </p>
          <p>img quality:.JPEG, .PNG</p>
        </div>
      </div>

      {cartList.cartShoesHistory.length === 0 ? (
        <Empty />
      ) : (
        <div>
          <nav className="mt-5">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Order history
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabIndex="0"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th>date</th>
                    <th>img</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <ProfileOrder
                      key={index}
                      userProfile={userProfile.ordersHistory}
                      item={item}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabIndex="0"
            ></div>
          </div>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={(cartList.cartShoesHistory || []).length}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
