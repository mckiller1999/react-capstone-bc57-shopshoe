import { NavLink } from "react-router-dom";
import useGetAPI from "../components/CustomeHook/useGetAPI";

const Home = () => {
  const data = useGetAPI("https://shop.cyberlearn.vn/api/Product");
  const arrProd = data.content;
  return (
    <div className="container">
      <h1 className="text-center">Home pages</h1>
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

export default Home;
