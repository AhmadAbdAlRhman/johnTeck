import Home from "./pages/Home/Home"; // استيراد المكون
import "./App.css";
import DashBoard from "./pages/DashBoard/DashBoard";
// import { Router } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router";
import Product from "./pages/Product/Product";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import AboutUs from "./pages/AboutUs/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "./pages/ContactUs/ContactUs";
import Certificates from "./pages/Certificates/Certificates";
import { Suspense } from "react";
import MainDash from "./components/MainDash/MainDash";
import DashBoardCertificate from "./components/DashBoardCertificate/DashBoardCertificate";

export default function App() {
  const location = useLocation();

  // تحقق من مسار الصفحة
  const isAboutPage = location.pathname === "/AboutUs";

  return (
    <Suspense fallback={<div>Loading application...</div>}>
    <div
      style={{
        backgroundColor: isAboutPage ? "transparent" : "",
      }}
    >
      {/* باقي المحتوى */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Dashboardproducts" element={<DashBoard />} />
        <Route path="/Dashboardcertificates" element={<DashBoardCertificate />} />
        <Route path="/Products" element={<Product />} />
        <Route path="/Products/:search" element={<Product />} />
        <Route path="/Terms" element={<TermsOfService />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ContactUs" element={<ContactUs/>}/>
        <Route path="/Certificates" element={<Certificates/>}/>
        <Route path="/Main-DashBoard-RAYS" element={<MainDash />} />
      </Routes>
    </div>
    </Suspense>
  );
}
