import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileApiAction,
  logoutApiAction,
} from "../redux/reducer/UserReducer";
import Logout from "./Logout";
import { useFormik } from "formik";
import * as yup from "yup";
import { http } from "../utils/Config";


const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);
  // console.log("userProfile", userProfile);

  
  const formik = useFormik ({
    enableReinitialize: true,
    initialValues: {
      email: userProfile.email,
      password: userProfile.password,
      name: userProfile.name,
      phone: userProfile.phone,
      gender: userProfile.gender,
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      name: yup.string().required('Name is required'),
      phone: yup.string().required('Phone is required'),
      gender: yup.boolean().required('Gender is required')
    }),
    // submit form to BE
    onSubmit: async (values) => {
      console.log('values', values)
      alert(JSON.stringify(values, null, 2));      
      try {
        let res = await http.post('Users/updateProfile',values)
        alert(res.data.content)
            console.log(res)
      } catch (err) {
        alert(err)
      }       
    }
  });
  
  
// console.log('userProfile', userProfile);
// console.log('initialValues', formik.values);
console.log("userProfile.gender", formik.values.gender)


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
                     <form action="" className="row g-3" onSubmit={formik.handleSubmit} noValidate>
               <div>
              <label className="form-label mb-1">Email address</label>
              <input className="form-control" type="email" placeholder="email@gmail.com" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required></input>
              {formik.errors.email && formik.touched.email ? (<div className="text-danger">{formik.errors.email}</div>) : null} 
              
              
            </div>
            <div>
              <label className="form-label mb-1">Password</label>
              <input className="form-control" type="password" placeholder="password" name="password" required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} ></input>
              {formik.errors.password && formik.touched.password ? (<div className="text-danger">{formik.errors.password}</div>) : null} 
            </div>
          
            <div>
              <label className="form-label mb-1">Name</label>
              <input className="form-control" type="text" placeholder="Name" name="name" required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}></input>
              {formik.errors.name && formik.touched.name ? (<div className="text-danger">{formik.errors.name}</div>) : null} 
            </div>
            <div>
              <label className="form-label mb-1">Phone</label>
              <input className="form-control" type="tel" placeholder="Phone" name="phone" required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}></input>
              {formik.errors.phone && formik.touched.phone ? (<div className="text-danger">{formik.errors.phone}</div>) : null} 
            </div>
            <div>
              <label className="form-label mb-1">Gender</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value={'true'} onChange={formik.handleChange} checked="checked"></input>
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value={'false'} onChange={formik.handleChange}></input>
                <label className="form-check-label">Female</label>
              </div>
              <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
            </div>
                </form>  
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
      <nav className="mt-5">
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
  </div>
</div>
    </div>
  );
};

export default Profile;
