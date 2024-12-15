import React from "react";
import "./TermsOfService.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function TermsOfService() {
  const { t, i18n } = useTranslation("TermsOfService");
  useEffect(() => {
    var dir =i18n.language === "ar"?"rtl":"ltr";
    var lang = i18n.language === "ar"?"ar":i18n.language === "en"? "en" : "tr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]);

  return (
    <div className="termsall">
      <Header />
      <div className="termsOfService"  style={{ flex: "1"}}>
        <h1 id="H1termsOfService">{t("h")}</h1>
        <h6 id="ptermsOfService">{t("hh")}</h6>
        <p className="text1">{t("p1")}</p>
        <h2 className="h2p">{t("h1")}</h2>
        <p className="text1">{t("p2")}</p>
        <h2 className="h2p">{t("h2")}</h2>
        <p className="text1">{t("p3")}</p>
        <h2 className="h2p">{t("h3")}</h2>
        <p className="text1">{t("p4")}</p>
        <h2 className="h2p">{t("h4")}</h2>
        <p className="text1">{t("p5")}</p>
        <h2 className="h2p">{t("h5")}</h2>
        <p className="text1">{t("p6")}</p>
        <h2 className="h2p">{t("h6")}</h2>
        <p className="text1">{t("p7")}</p>
        <h2 className="h2p">{t("h7")}</h2>
        <p className="text1">{t("p8")}
          <Link to="/PrivacyPolicy">[ Privacy Policy ]</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default TermsOfService;
