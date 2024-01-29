import { ErrorMessage, useFormik } from "formik";
import { message, Upload, Select, Empty } from "antd";

import React, { useState } from "react";
// import * as Yup from "yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
// import { http } from "../utils/Config";
import { registerApiAction } from "../redux/reducer/UserReducer";
import { NavLink } from "react-router-dom";
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const Register = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    formik.setFieldValue("gender", value);
  };
  // const signupSchema = Yup.object().shape({
  //     email: Yup.string().email('Invalid email').required('Email is required'),
  // })

  // get form value
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      gender: selectedGender,
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
      passwordConfirm: yup.string().required("Confirm password is required"),
      name: yup.string().required("Name is required"),
      phone: yup.string().required("Phone is required"),
      gender: yup.boolean().required("Gender is required"),
    }),
    // submit form to BE

    onSubmit: async (values) => {
      try {
        const action = registerApiAction(values);
        dispatch(action);
        messageApi.open({
          type: "loading",
          content: "đang tạo tài khoản...",
          duration: 2.5,
        });

        setTimeout(() => {
          message.success("tạo tài khoản mới thành công", 2.5);
        }, 200); // Điều chỉnh thời gian chờ tùy theo nhu cầu của bạn
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
  });

  // render form and use formik & yup
  return (
    <div className=" d-flex justify-content-between  ">
      {contextHolder}
      <div
        style={{ width: "50vw", height: "50vh" }}
        className="d-none d-md-block"
      >
        <img
          src={process.env.PUBLIC_URL + "/img/banner_register.jpg"}
          width={"100%"}
          height={"200%"}
          alt=""
        />
      </div>
      <div className="pt-5 mx-5">
        <h3 className="text-center">Register</h3>
        <div class="card-body">
          <form
            action=""
            className="row g-3"
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
              <label className="form-label mb-1">Password confirm</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password confirm"
                name="passwordConfirm"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              ></input>
              {formik.errors.passwordConfirm &&
              formik.touched.passwordConfirm ? (
                <div className="text-danger">
                  {formik.errors.passwordConfirm}
                </div>
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
              <br />
              <Select
                className="my-2"
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
              <button type="submit" className="btn btn-primary" value="Submit">
                Submit
              </button>
              <p>
                have a account? <NavLink to={"/login"}>Login here</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
