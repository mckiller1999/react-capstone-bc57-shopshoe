import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [search, SetSearch] = useSearchParams();
  const [arrProd, setArrProd] = useState([]);
  const key = search.get("keyword");

  const getProdByKeyword = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${key}`,
      method: "GET",
    });
    setArrProd(res.data.content);
  };
  useEffect(() => {
    getProdByKeyword();
  }, [key]);
  return (
    <div className="container my-3">
      <h1 className="text-start">Resul for: {key}</h1>
      <div className="row">
        {arrProd?.map((prod, index) => {
          return (
            <div className="col-md-4" key={index}>
              <div className="conatiner m-4">
                <div className="card p-4">
                  <img
                    className="card-img-top"
                    src={prod.image}
                    alt={prod.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.price}</p>
                    <NavLink className="btn btn-dark" to={`/detail/${prod.id}`}>
                      View detail
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
