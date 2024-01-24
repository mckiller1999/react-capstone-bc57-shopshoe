import { ErrorMessage, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { http } from "../utils/Config";
import { registerApiAction } from "../redux/reducer/UserReducer";

const Register = () => {
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
      gender: "",
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
      const action = registerApiAction(values);
      dispatch(action);
    },
  });

  // render form and use formik & yup
  return (
    <div className="container-sm">
      Register
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
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
            <div className="text-danger">{formik.errors.passwordConfirm}</div>
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value={true}
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
              value={false}
              onChange={formik.handleChange}
            ></input>
            <label className="form-check-label">Female</label>
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
