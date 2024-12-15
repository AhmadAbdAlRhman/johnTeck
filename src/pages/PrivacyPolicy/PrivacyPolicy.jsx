import React,{useEffect} from "react";
import "./PrivacyPolicy.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
function PrivacyPolicy() {
  const { t, i18n } = useTranslation("PrivacyPolicy");
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
  return (<div className="privall">
  <Header/>
    <div className="privacyPolicy"  style={{ flex: "1"}}>
      <h1 id="H1privacy">{t("Title")}</h1>
      <h6 id="pprivacy">{t("Subtitle")}</h6>

      <p className="text1">
      {t("p1")}
      </p>

      <h2 className="h2p">{t("Subtitle1")}</h2>
      <p className="text1">{t("p2")}</p>

      <p className="text1">
      {t("p3")}{" "}
      </p>
      <p className="text1">
      {t("p4")}
      </p>
      <p className="text1">
      {t("p5")}
      </p>
      <h2 className="h2p">{t("Subtitle2")}</h2>
      <p className="text1">
      {t("p6")}
      </p>

      <h2 className="h2p">{t("Subtitle3")}</h2>
      <p className="text1">
      {t("p7")}
      </p>

      <h2 className="h2p">{t("Subtitle4")}</h2>
      <p className="text1">
      {t("p8")}
      </p>

      <h2 className="h2p">{t("Subtitle5")}</h2>
      <p className="text1">
      {t("p9")}<a href="mailto:info@johntekvalves.com">info@johntekvalves.com</a>
      </p>
    </div>
    <Footer/>
    </div>
  );
}

export default PrivacyPolicy;
