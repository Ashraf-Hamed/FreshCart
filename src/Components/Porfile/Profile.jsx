import jwtDecode from "jwt-decode";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  const decodedToken = jwtDecode(localStorage.getItem("userToken"));
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile Page" />
      </Helmet>
      <h1 className="mt-5 mb-3 h4 fw-bold">
        Hi,{" "}
        <span className="text-main">{decodedToken.name.toUpperCase()}!</span>
      </h1>
      <h1 className="mt-5 mb-3 h4 fw-bold h5">
        Role :  
        <span className="mx-2 text-main">{decodedToken.role.toUpperCase()}!</span>
      </h1>
      <h1 className="mt-5 mb-5 h4 fw-bold h5">
      UserID : 
        <span className="text-main mx-2">{decodedToken.id.toUpperCase()}!</span>
      </h1>
      <div className="mb-4 row justify-content-center align-items-center g-2 flex-wrap bg-main-light p-5">
        <div className="col-md-4 text-end">
          <Link
            to="/wishlist"
            className="px-3 py-2 btn bg-main text-light fw-bold rounded-2 w-100 "
          >
            Wishlist
          </Link>
        </div>
       
      </div>
      <Outlet />
    </>
  );
}