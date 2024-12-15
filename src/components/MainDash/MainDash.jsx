import React ,{ useState } from "react";
import "./MainDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";

function MainDash() {
  const [password, setPassword] = useState(""); // لتخزين قيمة كلمة المرور
  const [showPassword, setShowPassword] = useState(false); // للتحكم في عرض النص أو النقاط
  const navigate=useNavigate();
  const req=async(e)=>{
    e.preventDefault();
    try{
      const r=await axios.post("http://127.0.0.1:8000/api/admin/login",
        {password}, 
        {headers: {
        'Content-Type': 'application/json'},
         withCredentials: true}); // If your backend requires credentials like cookies;
      console.log(r.status)
      if(r.status===200){
        // افترض أن التوكن قادم في response.data.token
        const token = r.data.token;

        // تخزين التوكن في الكوكيز
        Cookies.set("authToken", token, { expires: 7 }); // يتم التخزين لمدة 7 أيام

        navigate("/Dashboardproducts")
      }
    }
    catch(error){
      if (error.response) {
        // الخطأ جاء من الخادم
        console.error('Error:', error.response.data.message);
        alert(`Error: ${error.response.data.message}`); // عرض رسالة للمستخدم
      } else {
        // خطأ غير متوقع
        console.error('Unexpected Error:', error.message);
        alert('Unexpected error occurred. Please try again later.');
      } 
    }
  }
  return (
    <><HeaderAdmin/>
    <div className="tota">
      <h1>Welcome to Main DashBoard</h1>
      <form action="post">
      {/* حقل الإدخال */}
      <input
        type={showPassword ? "text" : "password"} // تغيير نوع الإدخال بناءً على الحالة
        className="styled-input"
        placeholder="Enter your password..."
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" onClick={(e) => req(e)}> ok </button>
       {/* أيقونة لإظهار أو إخفاء الباسوورد */}
       <i 
        className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
        onClick={() => setShowPassword(!showPassword)} // عند الضغط يتم تبديل الحالة
        style={{ cursor: "pointer", marginRight: "10px" }}
      ></i>
      </form>
    </div>
 </>
  );
}

export default MainDash;