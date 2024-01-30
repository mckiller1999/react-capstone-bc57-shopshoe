import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeTemplates from "./templates/HomeTemplates";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail";
import useWindowSize from "./components/CustomeHook/useWindowSize";
import Search from "./pages/Search";
import DeviceTemplate from "./templates/DeviceTemplates";
import HomeMobile from "./pages/HomeMobile";
import SearchMobile from "./pages/SearchMobile";
import DetailMobile from "./pages/DetailMobile";

export const history = createBrowserHistory();

const App = () => {
  const windowSize = useWindowSize();

  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<HomeTemplates />}>
            <Route
              index
              element={
                <DeviceTemplate
                  Component={<Home />}
                  MobileComponent={<HomeMobile />}
                />
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />

            {windowSize.width >= 992 ? (
              <Route path="detail/:id" element={<Detail />} />
            ) : (
              <Route path="detailmobile/:id" element={<DetailMobile />} />
            )}

            <Route path="*" element={<Navigate to="" />} />
          </Route>
          {/* detail/:id */}
          {/* Thêm route cho Search và SearchMobile */}
          {windowSize.width >= 992 ? (
            <Route path="search" element={<Search />} />
          ) : (
            <Route path="searchmobile" element={<SearchMobile />} />
          )}
        </Routes>
      </HistoryRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
