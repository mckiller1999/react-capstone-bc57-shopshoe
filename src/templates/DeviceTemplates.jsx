import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const DeviceTemplate = (props) => {
  //props {Component:, MobileComponent}
  const [screen, setScreen] = useState({
    width: window.innerWidth,
  });
  const [Component, setComponent] = useState(props.Component);
  // const changeSize = () => {
  //   setScreen({
  //     width: window.innerWidth,
  //   });
  // };
  // useEffect(() => {
  //   window.onload = changeSize;
  //   window.onresize = changeSize;
  //   return () => {
  //     window.removeEventListener("onload", changeSize);
  //     window.removeEventListener("onresize", changeSize);
  //   };
  // }, []);
  const changeSize = () => {
    setScreen({
      width: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("load", changeSize);
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("load", changeSize);
      window.removeEventListener("resize", changeSize);
    };
  }, []);
  useEffect(() => {
    if (screen.width < 992 && props.MobileComponent) {
      setComponent(props.MobileComponent);
    } else {
      setComponent(props.Component);
    }
  }, [screen.width]);
  console.log("Rendering Component:", props.Component);
  return <div>{Component}</div>;
};

export default DeviceTemplate;
