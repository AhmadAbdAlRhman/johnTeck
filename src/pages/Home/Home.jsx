import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import "../../components/Footer/Footer.css";
import Logo from "../../Assets/logo.png"; // تأكد من أن المسار صحيح
import names from "../../Assets/names.png";
import { Link } from "react-router-dom";
import Home21 from "../../Assets/pro1.jpg";
import Home22 from "../../Assets/pro2.jpg";
import Home23 from "../../Assets/pro3.jpg";
import Home24 from "../../Assets/pro4.jpg";
import Home25 from "../../Assets/pro5.jpg";
import Home26 from "../../Assets/pro6.jpg";
import Home27 from "../../Assets/pro7.jpg";
import { useTranslation } from "react-i18next";

function Home() {

  const images = [Home21, Home22, Home23, Home24, Home25, Home26, Home27];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    if (currentIndex === totalImages.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalImages.length - 2);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalImages.length - 2);
    } else if (currentIndex === totalImages.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };
  // https://chatgpt.com/c/67458fb7-82e0-8002-8f84-7e2e5fb5482e
  // http://ncaq-gov.sy/NewsCategory.aspx?CategoryID=4

  const { t, i18n } = useTranslation("Home");
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
  }, [i18n.language]); // Re-run when the language changes
 
  return (
    <div className="homepage">
      <Header />
      <div className="hh">
      <div className={i18n.language === "ar" ? "logooo ar" : "logooo en"} dir="ltr">
        <img src={Logo} alt="Logo" className="logoimg1" />
        <img src={names} alt="name" className="name1" />
      </div>
      <h2 className="p_home">
        {t("phomeh2")}
      </h2>
      <h3 className="p_home">
        {t("phomeh3")}
      </h3>
      <h2 className="font-the-h">
        {t("font-the-h1")}
      </h2>
      <div className="imgshome slider-container">
        <div className="imgshomeall">
          <div
            dir="ltr"
            className="slider-wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {totalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`عرض الصورة ${index}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>
      </div>

      <h2 className="font-the-h">
        {t("font-the-h2")}
      </h2>
      
      <div className="imgshome div222">
        <div className={i18n.language === "ar" ? "half pppppp arh" : "half pppppp enh"}>
          <img src={require("../../Assets/pro6.jpg")} alt="منتج تاني" />
        </div>
        <div className="half2 pppppp">
          <div>
            <h2 className="font_h-ener">
              {t("font-the-ener")}
            </h2>
          </div>
          <Link to="/Products">
            <button className={i18n.language === "ar" ? "arbu" : "btn1"}>{t("button")}</button>
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
