import React ,{ startTransition } from "react";
import { useState, useEffect, useRef } from "react";
import Sidepar from "../Sidepar/Sidepar";
import Button from "../btn/Btn";
import Logo from "../../Assets/logonew.png"; // تأكد من أن المسار صحيح
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faBars } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import "@fortawesome/fontawesome-free/css/all.min.css"; // استيراد FontAwesome
import { Link , useNavigate } from "react-router-dom";
import "./Header.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function Header() {
  // حالة للشريط الجانبي
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // تعريف حالة للتحكم في إظهار أو إخفاء حقل الإدخال
  const [showInput, setShowInput] = useState(false);
  const [nameProducts, setNamePro] = useState("");
  const navigate=useNavigate();

  const searchRef = useRef(null); // Reference for the search element
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { t, i18n } = useTranslation("header");
  useEffect(() => {
    var dir =i18n.language === "ar"?"rtl":"ltr";
    var lang = i18n.language === "ar"?"ar":i18n.language === "en"? "en" : "tr";
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
    <div className="all">
      <div className={`header ${isSidebarOpen ? "hide" : ""}`} ref={searchRef}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="transfers">
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

          
           {/* /////////////////////////////////    زر البحث   ////////////////////////*/}
          {showInput && (
            <form onSubmit={submitsearch} className="searchdiv">
              <div className="forsearchH">
                <button type="submit" className={i18n.language === "ar" ? "ok arok" : "ok enok"}>
                {t("searchButton")}
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                   className={i18n.language === "ar" ? "inputname arinp" : "inputname eninp"}
                    dir="ltr"
                  value={nameProducts}
                  onChange={(event) => setNamePro(event.target.value)}
                />
              </div>
            </form>
          )}
          <i className="fas fa-search linksss" onClick={handleSearchClick}></i>
        </div>
      </div>
      {/* زر فتح الشريط الجانبي */}

      {!isSidebarOpen && (
        <Button
          onClick={toggleSidebar}
          label={<FontAwesomeIcon icon={faBars} size="sm" id="hoom" />}
        />
      )}
      {/* الشريط الجانبي */}
      <Sidepar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Header;
