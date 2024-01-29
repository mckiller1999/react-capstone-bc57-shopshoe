import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginApiAction } from "../redux/reducer/UserReducer";
import { message, Upload, Select, Empty } from "antd";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (userLogin) => {
      const action = loginApiAction(userLogin);
      try {
        dispatch(action);
        messageApi.open({
          type: "loading",
          content: "Action in progress..",
          duration: 2.5,
        });

        setTimeout(() => {
          message.success("Đăng nhập thành công", 2.5);
        }, 200); // Điều chỉnh thời gian chờ tùy theo nhu cầu của bạn
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="">
      {contextHolder}
      <div className=" d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center ">
          <form
            action=""
            className="row g-3 w-75"
            onSubmit={frmLogin.handleSubmit}
            noValidate
          >
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
              <button type="submit" className="btn btn-primary m-2">
                Login
              </button>
              <NavLink to="/register" className="text-right ms-4">
                Register Here!
              </NavLink>
            </div>
          </form>
        </div>

        <div
          style={{ width: "35vw", height: "50vh" }}
          className="d-none d-md-block"
        >
          <img
            src={process.env.PUBLIC_URL + "/img/banner_register.jpg"}
            width={"100%"}
            height={"200%"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
