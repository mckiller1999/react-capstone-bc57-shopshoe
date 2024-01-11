import { Field, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const Register = () => {
  // const signupSchema = Yup.object().shape({
  //     email: Yup.string().email('Invalid email').required('Email is required'),
  // })

  // get form value
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      gender: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      passwordConfirm: Yup.string().required("Confirm password is required"),
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      gender: Yup.boolean().required("Gender is required"),
    }),
    // submit form to BE
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  // render form and use formik & Yup
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
            value={formik.values.email}
            required
          ></input>
          {/* {formik.errors.email && formik.touched.email && (<div className="invalid-feedback">{formik.errors.email}</div>)} */}
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
            value={formik.values.password}
          ></input>
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
            value={formik.values.passwordConfirm}
          ></input>
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
            value={formik.values.name}
          ></input>
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
            value={formik.values.phone}
          ></input>
        </div>
        <div className="form-group">
          <label className="form-label mb-1">Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value={true}
              onChange={formik.handleChange}
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
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" value="Gửi">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
