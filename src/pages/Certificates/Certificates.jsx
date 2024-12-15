import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Certificates.css";

const Certificates = () => {
  const [certe, SetCert] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      setIsLoading(true); // بداية التحميل
      try {
        const res1 = await axios.get(
          "https://johntekvalves.com/backend/api/certificates"
        );
        SetCert(res1.data);
      } catch (err) {
        console.log(err);
      }
      finally{
        setIsLoading(false); // بداية التحميل
      }
    };
    data();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading Certificates, please wait...</p>
      </div>
    );
  }

  const arrcerte = certe.map((e) => (
    <div className="cer1">
      <a
        href={`https://johntekvalves.com/backend/storage/Certificates/pdf/${e.pdf}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* {isLoading ? (
          <span>Loading PDF...</span>
        ) : ( */}
          <img
            className="cer2"
            src={`https://johntekvalves.com/backend/storage/Certificates/image/${e.image}`}
            alt="helooo i am not heer"
          />
        {/* )} */}
      </a>
    </div>
  ));
  return (
    <div className="cerA">
      <Header />
      <div style={{ flex: "1" ,marginBottom:"5%"}}>
        {arrcerte}
      </div>
      <Footer />
    </div>
  );
};

export default Certificates;
