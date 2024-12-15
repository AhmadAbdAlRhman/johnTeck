import React, { useEffect, useState } from "react";
import "./ProductUser.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stander from "../BtnStand/Stander";
import { useTranslation } from "react-i18next";

const ProductUser = () => {
  const [infoproCard2, SetIn] = useState([]);
  const { search } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation("prouser");
  useEffect(() => {
    var dir = i18n.language === "ar" ? "rtl" : "ltr";
    var lang =i18n.language === "ar" ? "ar" : i18n.language === "en" ? "en" : "tr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // بداية التحميل
      try {
        if (search) {
          // https://johntekvalves.com/backend/api/products
          const res = await axios.get(
            `https://johntekvalves.com/backend/api/products/${search}`
          );
          console.log(res.data);
          SetIn(Array.isArray(res.data) ? res.data : [res.data]);
        } else {
          const res = await axios.get(
            "https://johntekvalves.com/backend/api/products"
          );
          SetIn(res.data);
        }
      } catch (err) {
        console.log("the error is", err);
      }
      finally{
        setIsLoading(false); // بداية التحميل
      }
    };
    fetchData();
  }, [search]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading products, please wait...</p>
      </div>
    );
  }

  const showinfoCard2 = infoproCard2?.map((e, index) => (
    <div key={e.id || index} className="Showcard">
      <div className="C1user">
        <img
          className="imageUser"
          src={`https://johntekvalves.com/backend/storage/products/images/${e.image}`}
          alt="helooo i am not heer"
        />
      </div>

      <div className="C2user">
        <div className="productdetailsuser">
          <h1 className="productNameuser">{e.EnglishName}</h1>
          <div className="PIuser">
            <p className="productdeDescriptionuser">
              {i18n.language === "ar"
                ? e.ArabicDescription
                : i18n.language === "en"
                ? e.EnglishDescription
                : e.TurkishDescription}
            </p>
            <div>
            <a
              href={`https://johntekvalves.com/backend/storage/products/pdfs/${e.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* {isLoading ? (
                <span>Loading PDF...</span>
              ) : ( */}
                <img
                  className="pdfuser"
                  src={require("../../Assets/images__3_-removebg-preview.png")}
                  alt="helooo i am not heer"
                />
              {/* )} */}
            </a>
            {e.standard !== "no information" && (
                <Stander standardData={e.standard} />
              )}
            </div>
          </div>
        </div>

        <p className="C3user" dir="ltr">
          <Link to="/contactUs" className="linuser">
            {t("l1")}
          </Link>
         {t("l2")}
        </p>
      </div>
    </div>
  ));
  return <div>{showinfoCard2}</div>;
};

export default ProductUser;
