import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [prodDetail, setProdDetail] = useState({});

  const param = useParams();
  const getProdId = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${param.id}`,
      method: "GET",
    });
    return setProdDetail(res.data.content);
  };
  useEffect(() => {
    getProdId();
  }, [param.id]);
  return (
    <div className="container">
      <h3>Detail</h3>
      <div className="row">
        <div className="col-md-4">
          <img src={prodDetail.image} alt="" width={250} height={250} />
        </div>
        <div className="col-md-4">
          <h3>{prodDetail.name}</h3>
          <p>des: {prodDetail.shortDescription}</p>
          {prodDetail.size?.map((size, index) => {
            return (
              <button className="btn btn-primary" key={index}>
                {size}
              </button>
            );
          })}
          <button className="btn btn-success">Add to cart</button>
        </div>
        <h3 className="text-center">Related Product</h3>
        <div className="row">
          {prodDetail.relatedProducts?.map((prod, index) => {
            return (
              <div className="col-md-4" key={index}>
                <div className="card" key={index}>
                  <img className="card-img-top" src={prod.image} alt="" />
                  <div className="card-body">
                    <h3>{prod.name} </h3>
                    <p>{prod.price} </p>
                    <NavLink className="btn btn-dark" to={`/detail/${prod.id}`}>
                      View Detail
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
