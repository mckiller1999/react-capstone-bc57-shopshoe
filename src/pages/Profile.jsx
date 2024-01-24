import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileApiAction,
  logoutApiAction,
} from "../redux/reducer/UserReducer";
import Logout from "./Logout";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);
  console.log(userProfile);

  const dispatch = useDispatch();
  const getProfileApi = async () => {
    const action = getProfileApiAction();
    dispatch(action);
  };
  const handleLogout = () => {
    dispatch(logoutApiAction());
  };
  useEffect(() => {
    getProfileApi();
  }, []);
  return (
    <div className="container">
      <h1 className="text-center">Profile</h1>

      <h3>email :{userProfile.email}</h3>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
