import React, { useState, useEffect, useRef ,startTransition } from "react";
import Logo from "../../Assets/logo.png";
import { Link , useNavigate} from "react-router-dom";
import "./Sidepar.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import NameLogo from "../../Assets/names.png";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // تعريف حالة للتحكم في إظهار أو إخفاء حقل الإدخال
  const [showInput, setShowInput] = useState(false);
  const [nameProducts, setNamePro] = useState("");
  const navigate=useNavigate();

  // const {productName}=useParams();
  const searchRef = useRef(null); // Reference for the search element
  const sidebarRef = useRef(null); // Reference for the sidebar element

   // دالة لتحديد إذا كان النقر خارج الشريط الجانبي
   const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };
   // إضافة حدث النقر عند فتح الشريط الجانبي وإزالته عند إغلاقه
   useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // تنظيف الحدث عند إلغاء المكون
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // دالة لتغيير حالة الحقل عند الضغط على الأيقونة
  const handleSearchClick = () => {
    setShowInput(!showInput); // تبديل الحالة بين إظهار أو إخفاء
  };

  // Search function
  const submitsearch = async (e) => {
    e.preventDefault();
    const query = nameProducts ? `/Products/${nameProducts}` : "/Products";
    navigate(query);
  };
  // Close search input if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current &&
        // sidebarRef.current &&
         !searchRef.current.contains(event.target)
        // && !sidebarRef.current.contains(event.target)
        ) {
        setShowInput(false);
        // toggleSidebar(); // Close sidebar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    // toggleSidebar
  ]);
  const { t, i18n } = useTranslation("sidepar");
  useEffect(() => {
    var dir = "";
    if (i18n.language === "ar") {
      dir = "rtl";
    } else {
      dir = "ltr";
    }
    var lang = "";
    if (i18n.language === "ar") {
      lang = "ar";
    } else if (i18n.language === "en") {
      lang = "en";
    } else {
      lang = "tr";
    }
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]);

  const ChangeOption = (event) => {
    const languageCode = event.target.value;
    startTransition(() => {
      i18n.changeLanguage(languageCode);
    });
    console.log(event.target.value);
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`} ref={sidebarRef
      // searchRef
      }>
      <button onClick={toggleSidebar} className="close-btn">
        <FontAwesomeIcon icon={faChevronLeft}   size="sm" id="Left" />{" "}
      </button>
      <div className="">
        <img src={Logo} alt="Logo" className="logo1" />
        <img src={NameLogo} alt="NameLogo" className="logo1" />
      </div>

      <Link to="/" className="linksss">
      {t("L1")}
      </Link>
      <Link to="/Products" className="linksss">
      {t("L2")}
      </Link>
      <Link to="/AboutUs" className="linksss">
      {t("L3")}
      </Link>
      <Link to="/Terms" className="linksss">
      {t("L4")}
      </Link>
      <Link to="/PrivacyPolicy" className="linksss">
      {t("L5")}
      </Link>
      <Link to="/ContactUs" className="linksss">
      {t("L6")}
      </Link>
      <Link to="/Certificates" className="linksss">
      {t("L7")}
      </Link>
      <form action="name the aplication" method="0" className="linksss">
      <select
              onChange={ChangeOption}
              name="language"
              className="selectlinksss"
            >
              <option value="en"> {t("lang1")} </option>
              <option value="ar"> {t("lang2")} </option>
              <option value="tr"> {t("lang3")} </option>
            </select>
          </form>
      
      {/* /////////////////////////////////   زر البحث */}
      <i className="fas fa-search linksss" onClick={handleSearchClick}></i>
      {showInput && (
        <form onSubmit={submitsearch} className="searchside"  ref={searchRef}>
          <div className="forsearch">
            <button type="submit" className={i18n.language === "ar" ? "okside aroks" : "okside enoks"}>
            {t("searchButton")}
            </button>
            <input
              type="text"
              placeholder="Search..."
              className= {i18n.language === "ar" ? "inputnamesid arins" : "inputnamesid enins"}
              value={nameProducts}
              onChange={(event) => setNamePro(event.target.value)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
