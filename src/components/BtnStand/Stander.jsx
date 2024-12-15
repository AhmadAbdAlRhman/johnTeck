import React, { useState } from "react";
import "./Stander.css";

const Stander = (props) => {
  const [showData, setShowData] = useState(false) ;// تظهر وتخفي الداتا 

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setShowData(true);
  };

  const handleHideData = (e) => {
    e.stopPropagation();
    setShowData(false);
  };

  return (
    <div className="botton_item" onClick={handleHideData}>
      {/* عرض الزر فقط إذا كانت حالة isButtonVisible true */}
        <button
          className="botton2 iner"
          type="submit"
          onClick={handleButtonClick}
        >
          Standers
        </button>

      {/* عرض النافذة المنبثقة */}
      {showData && props.standardData && (
        <>
          {/* نافذة منبثقة */}
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleHideData}>&times;</button>
            <div style={{ marginTop: "10px", textAlign: "left" }}><h2 className="Stand1">Standard Information</h2>
              <p className="Stand2">{props.standardData}</p> 
            </div>
          </div>

          {/* Overlay */}
          <div className="overlay" onClick={handleHideData}></div>
        </>
      )}
    </div>
  );
};

export default Stander;