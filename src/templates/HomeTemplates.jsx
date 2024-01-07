import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeTemplates = () => {
  return (
    <div>
      <Header />
      <div className="content" style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <footer className="p-3 bg-dark text-white text-center">
        © 2021 Company, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeTemplates;
