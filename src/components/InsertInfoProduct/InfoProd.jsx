import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSave,
  faImage,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const InfoProd = (props) => {
  const {
    closeModal,
    endApi,
    EnglishName: initialName,
    DescriptionEn: initialDescriptionEn,
    DescriptionTr: initialDescriptionTr,
    DescriptionAr: initialDescriptionAr,
    standard: initialStand,
    image: initialImage,
    pdf: initialPdf,
    navigate,
    addProductToList,
  } = props;
  const [EnglishName, setName] = useState(initialName || "");
  const [EnglishDescription, setDescriptionEn] = useState(
    initialDescriptionEn || ""
  );
  const [TurkishDescription, setDescriptionTr] = useState(
    initialDescriptionTr || ""
  );
  const [ArabicDescription, setDescriptionAr] = useState(
    initialDescriptionAr || ""
  );
  const authToken = Cookies.get('authToken');
  const [standard, setStandEn] = useState(initialStand || "");
  const [image, setImage] = useState(null); // تعديل هذه الحالة
  const [pdf, setPdf] = useState(null);

  // في حال كان هناك صورة أو ملف PDF موجودين، نقوم بتفعيل الـ checkbox
  const [imageUploaded, setImageUploaded] = useState(!!initialImage); // إذا كانت الصورة موجودة، نعرض الـ checkbox
  const [pdfUploaded, setPdfUploaded] = useState(!!initialPdf); // إذا كان ملف الـ PDF موجود، نعرض الـ checkbox

  // تحديث الحقول عند فتح النافذة
  useEffect(() => {
    setName(initialName);
    setDescriptionEn(initialDescriptionEn);
    setDescriptionTr(initialDescriptionTr);
    setDescriptionAr(initialDescriptionAr);
    setStandEn(initialStand);

    // التحقق مما إذا كان يوجد صورة مبدئية
    if (initialImage) {
      setImage(initialImage);
      setImageUploaded(true); // إذا كانت الصورة موجودة مسبقًا، نظهر الـ checkbox
    } else {
      setImageUploaded(false); // لا توجد صورة مبدئية
    }

    // التحقق مما إذا كان يوجد ملف PDF مبدئي
    if (initialPdf) {
      setPdf(initialPdf);
      setPdfUploaded(true); // إذا كان ملف الـ PDF موجودًا مسبقًا، نظهر الـ checkbox
    } else {
      setPdfUploaded(false); // لا يوجد ملف PDF مبدئي
    }
  }, [
    initialName,
    initialDescriptionEn,
    initialDescriptionTr,
    initialDescriptionAr,
    initialStand,
    initialImage,
    initialPdf,
  ]);

  const handleFileChange = (e, setFile, setUploaded) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setUploaded(true); // ضبط حالة الرفع
    }
  };
  const Saveinfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EnglishName", EnglishName);
    formData.append("EnglishDescription", EnglishDescription);
    formData.append("TurkishDescription", TurkishDescription);
    formData.append("ArabicDescription", ArabicDescription);
    formData.append("standard", standard);

    // التأكد من أن الصورة والـ PDF هما كائنات ملفات وليس نصوص
    if (image instanceof File) {
      formData.append("image", image);
    }

    if (pdf instanceof File) {
      formData.append("pdf", pdf);
    }

    console.log([...formData]);
    console.log(authToken);
    try {
      const res = await axios.post(
        `
        http://localhost:8000/api/${endApi}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true 
        }
      );
      if (res.status === 200) {
        // بعد حفظ البيانات بنجاح، نقوم بتحديث المنتجات
        const newProduct = res.data; // نحصل على المنتج الجديد من الاستجابة
        addProductToList(newProduct);
        console.log(newProduct);
        console.log(res.request);
        // إغلاق النافذة المنبثقة
        closeModal();
        // الانتقال إلى صفحة Dashboard
        navigate("/Dashboardproducts", { replace: true });
      }
    } catch (err) {
      console.log(err); // طباعة الخطأ في وحدة التحكم
    }
  };

  return (
    <div>
      <div className="p1">
        <div className="p4">
          <label id="p3"> Product Name :</label>
          <input
            type="text"
            placeholder=" Please enter the product name. "
            className="p5"
            value={EnglishName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="p4">
          <label id="p4">Product Description English:</label>
          <input
            type="text"
            placeholder=" Please enter product description "
            className="p5"
            value={EnglishDescription}
            onChange={(e) => setDescriptionEn(e.target.value)}
          />
        </div>

        <div className="p4">
          <label id="p4">Product Description Arabic:</label>
          <input
            type="text"
            placeholder=" Please enter product description "
            className="p5"
            value={ArabicDescription}
            onChange={(e) => setDescriptionAr(e.target.value)}
          />
        </div>

        <div className="p4">
          <label id="p4">Product Description Turki:</label>
          <input
            type="text"
            placeholder=" Please enter product description "
            className="p5"
            value={TurkishDescription}
            onChange={(e) => setDescriptionTr(e.target.value)}
          />
        </div>

        <div className="p4">
          <label id="p4">Product Stander English:</label>
          <input
            type="text"
            placeholder=" Please enter product Stander English"
            className="p5"
            value={standard}
            onChange={(e) => setStandEn(e.target.value)}
          />
        </div>

        <div className="p2">
          <div className="pdf">
            <span style={{ marginRight: "8%", marginTop: "13%" }}>Image :</span>
            <div className="upload-box">
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(e, setImage, setImageUploaded)
                }
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
            {/* إظهار الـ checkbox إذا كانت الصورة قد تم تحميلها مسبقًا أو تم رفع صورة جديدة */}
            {imageUploaded && (
              <div style={{ marginTop: "10px" }}>
                <input type="checkbox" checked={imageUploaded} readOnly />
                <label style={{ marginLeft: "8px" }}>Image Uploaded</label>
              </div>
            )}
          </div>
          <div className="pdf">
            <span style={{ marginRight: "8%", marginTop: "13%" }}>
              Pdf file
            </span>
            <div className="upload-box">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, setPdf, setPdfUploaded)}
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
                <p style={{ marginTop: "7%", marginLeft: "6%" }}>Select File</p>
              </div>
            </div>
            {/* إظهار الـ checkbox إذا كان ملف الـ PDF قد تم تحميله مسبقًا أو تم رفع ملف جديد */}
            {pdfUploaded && (
              <div style={{ marginTop: "10px" }}>
                <input type="checkbox" checked={pdfUploaded} readOnly />
                <label style={{ marginLeft: "8px" }}>PDF Uploaded</label>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p3">
        <div className="iconimage" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} size="4x" />
        </div>
        <p className="nameicons1">Cancel</p>
        <div className="iconimage" onClick={Saveinfo}>
          <FontAwesomeIcon icon={faSave} size="4x" />
        </div>
        <p className="nameicons2">Save</p>
      </div>
    </div>
  );
};

export default InfoProd;
