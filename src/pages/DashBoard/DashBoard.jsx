import React from "react";
import Card from "../../components/Card/Card";
import AddProduct from "../../components/AddProduct/AddProduct";
import "./Dashboard.css";
import "../../components/Card/Card.css";
import AddCer from "../../components/AddCertificates/AddCer";
import { HeaderAdmin } from "../../components/HeaderAdmin/HeaderAdmin";

function DashBoard() {
  return (
    <div>
      <HeaderAdmin/>
      <div style={{ flex:"1", marginTop:"10%"}} >
      <AddProduct/>
      </div>
      <Card/>
    </div>
  )
}

export default DashBoard