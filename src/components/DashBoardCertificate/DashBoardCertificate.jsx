import React, { useState, useEffect } from "react";
import "./DashBoardCertificate.css"
import { HeaderAdmin } from '../HeaderAdmin/HeaderAdmin';
import AddCer from '../AddCertificates/AddCer';
import ShowCertificateforAdmain from '../ShowCertificateforAdmain/ShowCertificateforAdmain';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashBoardCertificate = () => {
  const [cerinfo, setCerInfo] = useState([]); // حالة تخزين الشهادات

  // دالة لجلب الشهادات من API
  const getCer = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/certificates");
      setCerInfo(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    getCer();
  }, []);

  // دالة لإضافة شهادة جديدة إلى القائمة
  const addNewCertificate = (newCertific) => {
    setCerInfo((prev) => [...prev, newCertific]); // تحديث القائمة بالشهادة الجديدة
  };

  const [showModal, setShowModal] = useState(false);
  const closeAdd = () => setShowModal(false);
  const navigate = useNavigate(); // استخدام useNavigate للانتقال بعد الحفظ
  
  return (
    <div>
        <HeaderAdmin/>
        <div style={{ flex:"1", marginTop:"10%"}} >
        <AddCer onAdd={addNewCertificate} close={closeAdd} navigate={navigate}/>
        </div>
        <ShowCertificateforAdmain cerinfo={cerinfo} getCer={getCer}/>
    </div>
  )
}

export default DashBoardCertificate