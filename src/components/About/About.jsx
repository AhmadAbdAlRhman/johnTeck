import React,{useEffect} from 'react'
import "./About.css"
import { useTranslation } from "react-i18next";
const About = () => {
  const { t, i18n } = useTranslation("aboutus");
  useEffect(() => {
    let dir = i18n.language === "ar" ? "rtl" : "ltr";
    let lang = i18n.language === "ar" ? "ar" : i18n.language === "en" ? "en" : "tr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]); // Re-run when the language changes
  return (
        <div className="aboutus">
        <p className="text4">
          <span id="H3">
            {t("Title")}
          </span>
        </p>
        <p className="text4">
        {t("p1")}
        </p>
        <p className="text4">
        {t("p2")}
        </p>
        <p className="text4">
        {t("p3")}
        </p>
        <p className="text4">
        {t("p4")}
        </p>
      </div>
  )
}

export default About