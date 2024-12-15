import React from "react";
import "./HeaderAdmin.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const HeaderAdmin = () => {
  // التحقق إذا كان التوكن موجودًا
  const isLoggedIn = !!Cookies.get("authToken"); // يتحقق إذا كان التوكن موجودًا في الكوكيز

return (
    <div className="containA">
        <div className="navad">
          <h1 className="nameAdmin">
            DashBoard
           {/* Welcome To The Site Manager */}
          </h1>
          <div className="d-flex">
          {isLoggedIn ? (
            <><Link to="/Dashboardproducts" className="button">
              Manege Products
            </Link>
            <Link to="/Dashboardcertificates" className="button">
              Manege Certificates
            </Link></>
            ):(
              <p></p>
              )}
            <Link to="/" className="button">
              Back To The WebSite
            </Link>
          </div>
        </div>
    </div>
  );
};
