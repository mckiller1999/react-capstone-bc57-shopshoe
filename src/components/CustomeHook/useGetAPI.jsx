import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetAPI = (url) => {
  const [data, setData] = useState({});
  const getAPI = async () => {
    const res = await axios({
      url: url,
      method: "GET",
    });
    setData(res.data);
  };
  useEffect(() => {
    getAPI();
  }, []);
  return data;
};

export default useGetAPI;
