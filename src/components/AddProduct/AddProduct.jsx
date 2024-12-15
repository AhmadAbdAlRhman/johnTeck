import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddProduct.css";
import InfoProd from "../InsertInfoProduct/InfoProd";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
Modal.setAppElement("#root");

const AddProduct = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal =()=> setModalIsOpen(false);

  const [productinfo, setproductInfo] = useState([]);

  // دالة لإضافة المنتج الجديد إلى القائمة
  const addProductToList = (newProduct) => {
    setproductInfo((prevProducts) => [...prevProducts, newProduct]);
  };

  const navigate = useNavigate(); // استخدام useNavigate للانتقال بعد الحفظ
  
  return (
    <div>
      <button className="add" onClick={openModal}>
        <h2> Add New Product </h2>
        <FontAwesomeIcon
         icon={faPlus} size="2x" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Add Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        <InfoProd h1="Add New Product" 
        endApi="storage"
        closeModal={closeModal}
        addProductToList={addProductToList} // تمرير الدالة لإضافة المنتج الجديد
        navigate={navigate}
        />
      </Modal>
    </div>
  );
};

export default AddProduct;
