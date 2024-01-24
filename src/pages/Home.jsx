import { NavLink } from "react-router-dom";
import useGetAPI from "../components/CustomeHook/useGetAPI";
import { store } from "../redux/store";
import { addShoeToCart } from "../redux/actions/CartActions";
import { connect, useDispatch } from "react-redux";

const Home = (props) => {
  const data = useGetAPI("https://shop.cyberlearn.vn/api/Product");
  const arrProd = data.content;
  console.log(arrProd);

  // const dispatch = useDispatch()

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

                    <button
                      className="btn btn-primary "
                      type="button"
                      onClick={() => props.addShoeToCart(prod)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a
        class="btn btn-primary"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        Link with href
      </a>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        Button with data-bs-target
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShoeToCart: (shoe) => {
      dispatch(addShoeToCart(shoe));
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
