import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginApiAction } from "../redux/reducer/UserReducer";

const Login = () => {
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (userLogin) => {
      const action = loginApiAction(userLogin);
      dispatch(action);
    },
  });
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <div className="card w-50 ">
        <div className="card-body ">
          <form className="container w-50 " onSubmit={frmLogin.handleSubmit}>
            <h3 className="text-center">Login</h3>
            <div className="form-group">
              <p>email:</p>
              <input
                onChange={frmLogin.handleChange}
                className="form-control"
                id="email"
                name="email"
                //onChange={frmLogin.handleChange}
              />
            </div>
            <div className="form-group">
              <p>password:</p>
              <input
                type="password"
                onChange={frmLogin.handleChange}
                className="form-control"
                id="password"
                name="password"
                //   onChange={frmLogin.handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success m-2">
                Login
              </button>
              <NavLink to="/register" className="text-right ms-4">
                Register Here!
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
