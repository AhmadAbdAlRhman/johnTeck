import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import "./ShowCertificateforAdmain.css";
import "../../pages/Certificates/Certificates.css";
import DeleteCer from "../Delete/DeleteCer";

const ShowCertificateforAdmain = ({cerinfo, getCer}) => {
  const [selectedCer, setSelectedCer] = useState(null); // حالة المنتج المختار
  // تعريف دوال فتح وإغلاق المودال للحذف
  const [modalOpen, setModalOpen] = useState(false);
  const opendelete = (product) => {
    setSelectedCer(product);
    setModalOpen(true);
  };
  const closedelete = () => setModalOpen(false);

  const [isLoading, setIsLoading] = useState(false);
  const handlePdfClick = (e) => {
    setIsLoading(true);
    // يسمح بتنزيل الملف بعد التأكد من تحميل الرابط
    setTimeout(() => setIsLoading(false), 5000); // توقيت اختياري
  };

  const ShowCer = cerinfo?.map((i) => (
    <div className="cer1" key={i.id}>
      <a
        href={`http://localhost:8000/storage/Certificates/pdf/${i.pdf}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handlePdfClick}
      >
        {isLoading ? (
          <span>Loading PDF...</span>
        ) : (
          <img
            className="cer2"
            src={`http://localhost:8000/storage/Certificates/image/${i.image}`}
            alt="hellooo i am not heer"
          />
        )}
      </a>
      <div className="iconimage" onClick={() => opendelete(i)}>
        <FontAwesomeIcon icon={faTrash} size="4x" />
      </div>
      <p className="nameicons2">Delete</p>
    </div>
  ));
  return (
    <div>
      {ShowCer}
      <Modal
        isOpen={modalOpen}
        contentLabel="delete Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        {selectedCer && (
          <>
            <DeleteCer
              closedelete={closedelete}
              id={selectedCer.id}
              getType={getCer}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ShowCertificateforAdmain;
