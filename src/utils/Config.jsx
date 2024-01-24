import React from "react";
import axios from "axios";
import { history } from "../index";

export const USER_LOGIN = "userLogin";
export const TOKEN = "accessToken";

export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 30000,
});

//cấu hình cho tất cả request(dữ liệu gửi đi)

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//cấu hình cho tất cả respone(dữ liệu nhận về từ be)
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status === 404) {
    } else if (err.response?.status === 401) {
      alert("please login to go to profile");

      history.push("/login-demo");
    } else if (err.response?.status === 403) {
    }
    return Promise.reject(err);
  }
);


