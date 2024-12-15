import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import "./Card.css";
import InfoProd from "../InsertInfoProduct/InfoProd";
import { Delete } from "../Delete/Delete";

const Card = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // حالة المنتج المختار
  const openModal = (product = null) => {
    setModalIsOpen(true);
    if (product) {
      setSelectedProduct(product); // تمرير بيانات المنتج
    } else {
      setSelectedProduct({ name: "", Description: "", Image: "", pdf: "" }); // فتح المودال لإضافة منتج جديد
    }
  };
  const closeModal = () => setModalIsOpen(false);

  // عرض البيانات من الداتا
  const [productinfo, setproductInfo] = useState([]);
  const getType = async () => {
    const response = await axios.get("http://localhost:8000/api/products");
    setproductInfo(response.data);
  };

  useEffect(() => {
    getType();
  }, []);

  // تعريف دوال فتح وإغلاق المودال للحذف
  const [modalOpen, setModalOpen] = useState(false);
  const opendelete = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const closedelete = () => setModalOpen(false);

  const showname = productinfo?.map((i) => (
    <div key={i.id} className="card">
      <p>{i.id}</p>
      <img
        className="imageDashboard"
        src={`http://localhost:8000/storage/products/images/${i.image}`}
        alt="Product Image"
      />
      <div className="productdetails">
        <h1 className="productName">{i.EnglishName}</h1>
        <div className="PI">
          <p className="productdeDescription">{i.EnglishDescription}</p>
          <Link to={`http://localhost:8000/storage/products/pdfs/${i.pdf}`}>
            <img
              className="pdfuser"
              src={require("../../Assets/images__3_-removebg-preview.png")}
              alt="Product PDF"
            />
          </Link>
        </div>
      </div>
      <div className="icons">
        <div className="iconimage" onClick={() => openModal(i)}>
          <FontAwesomeIcon icon={faEdit} size="4x" />
        </div>
        <p className="nameicons1">Edit</p>
        <div className="iconimage" onClick={() => opendelete(i)}>
          <FontAwesomeIcon icon={faTrash} size="4x" />
        </div>
        <p className="nameicons2">Delete</p>
      </div>
    </div>
  ));
  const addProductToList = (newProduct) => {
    setproductInfo((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      {showname}
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <InfoProd
            h1={selectedProduct.id ? "Update the Product" : "Add a New Product"}
            EnglishName={selectedProduct.EnglishName}
            DescriptionEn={selectedProduct.EnglishDescription}
            DescriptionTr={selectedProduct.TurkishDescription}
            DescriptionAr={selectedProduct.ArabicDescription}
            standard={selectedProduct.standard}
            image={selectedProduct.image}
            pdf={selectedProduct.pdf}
            endApi={
              selectedProduct.id
                ? `updateProduct/${selectedProduct.id}`
                : "storage"
            }
            closeModal={closeModal}
            getType={getType}
            addProductToList={addProductToList} // نمرر هذه الدالة لإضافة المنتج الجديد للقائمة
          />
        )}
      </Modal>
      <Modal
        isOpen={modalOpen}
        contentLabel="delete Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <>
            <Delete
              closedelete={closedelete}
              id={selectedProduct.id}
              getType={getType}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Card;
