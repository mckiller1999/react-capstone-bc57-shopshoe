import { createSlice } from "@reduxjs/toolkit";
import { TOKEN, USER_LOGIN, http } from "../../utils/Config";
import { history } from "../../index";

let userLoginDefault = {
  email: "",
  accessToken: "",
};
let userRegisterDefault = {
  email: "string",
  password: "string",
  name: "string",
  gender: true,
  phone: "string",
};

if (localStorage.getItem("userLogin")) {
  userLoginDefault = JSON.parse(localStorage.getItem("userLogin"));
}

const initialState = {
  userProfile: {},
  userLogin: userLoginDefault,
  userRegister: userRegisterDefault,
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    registerAction: (state, action) => {
      state.userRegister = action.payload;
    },
    logoutAction: (state) => {
      state.userProfile = {};
      state.userLogin = { email: "", accessToken: "" };
    },
  },
});

export const { loginAction, getProfileAction, registerAction, logoutAction } =
  UserReducer.actions;

export default UserReducer.reducer;

//action thunk

export const loginApiAction = (userLogin) => {
  return async (dispatch) => {
    try {
      const res = await http.post("Users/signin", userLogin);

      localStorage.setItem(TOKEN, res.data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
      const action = loginAction(res.data.content);
      dispatch(action);
      history.push("/profile");
    } catch (err) {
      if (err.response?.status === 404) {
        alert("wrong email or pass, please try again");
      }
    }
  };
};
export const registerApiAction = (userRegister) => {
  return async (dispatch) => {
    try {
      const res = await http.post("Users/signup", userRegister);

      localStorage.setItem(TOKEN, res.data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
      const action = registerAction(res.data.content);
      dispatch(action);
      history.push("/login");
    } catch (err) {
      if (err.response?.status === 404) {
        alert("something wrong please try again");
      }
    }
  };
};

export const getProfileApiAction = () => {
  return async (dispatch) => {
    try {
      const res = await http.post("/Users/getProfile");
      //console.log(res.data.content);
      const action = getProfileAction(res.data.content);
      //console.log(action);
      dispatch(action);
    } catch (err) {}
  };
};




export const logoutApiAction = () => {
  return async (dispatch) => {
    try {
      // Xóa dữ liệu đăng nhập từ local storage
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER_LOGIN);

      // Dispatch action logout
      dispatch(logoutAction());

      // Chuyển hướng đến trang login hoặc trang chính (tùy thuộc vào yêu cầu của bạn)
      history.push("/login-demo");
    } catch (err) {
      // Xử lý lỗi, nếu cần
      console.error(err);
    }
  };
};