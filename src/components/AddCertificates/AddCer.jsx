import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AddCer.css";

const AddCer = ({onAdd , close , navigate}) => {
  const [showModal, setShowModal] = useState(false);
  const [image, SetImage] = useState("");
  const [pdf, SetPdf] = useState("");

  const handleOpenModal = () => setShowModal(true);

  async function savecertifi(e) {
    e.preventDefault(e);
    const formData = new FormData();
    if (image instanceof File) {
      formData.append("image", image);
    }
    if (pdf instanceof File) {
      formData.append("pdf", pdf);
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/certificates/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        // بعد حفظ البيانات بنجاح، نقوم بتحديث المنتجات
        const newCer = res.data; // نحصل على المنتج الجديد من الاستجابة
        onAdd(newCer);
        close();
        // الانتقال إلى صفحة Dashboard
        navigate("/Dashboardcertificates", { replace: true });
      }
    } catch (err) {
      console.log(err); // طباعة الخطأ في وحدة التحكم
    }
  }
  return (
    <div>
      <Link to="#" onClick={handleOpenModal}>
        Add New Certificates
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </Link>
      <div className="App">
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={close}>
                &times;
              </span>

              <div>
                <div className="upload-box">
                  <input
                    type="file"
                    onChange={(e) => SetImage(e.target.files[0])} // تمرير الملف إلى الحالة
                  />
                  <div>
                    <FontAwesomeIcon
                      icon={faImage}
                      fontSize="100px"
                      style={{ marginTop: "10%", color: "rgb(135 148 171)" }}
                    />
                    <p style={{ marginTop: "-3%", marginLeft: "6%" }}>
                      Select Image
                    </p>
                  </div>
                </div>

                <div className="upload-box">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => SetPdf(e.target.files[0])} // تمرير الملف إلى الحالة
                  />
                  <div>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      fontSize="90px"
                      style={{
                        marginTop: "20%",
                        marginLeft: "5%",
                        color: "rgb(135 148 171)",
                      }}
                    />
                    <p style={{ marginTop: "7%", marginLeft: "6%" }}>
                      Select File
                    </p>
                  </div>
                </div>
                <button onClick={savecertifi}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddCer;