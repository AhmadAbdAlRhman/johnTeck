import React from "react";
import { useState } from "react";
import "./Btn.css";
function ButtonSidBar({ onClick, label }) {
  // حالة للشريط الجانبي
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
   };

  return (
    <div className="buttonSidBar">
      <button className="sidebar-button" onClick={onClick} style={{ backgroundColor: 'transparent', border: 'none' }}
      >
      {label} {/* تأكد من أن هذه السطر موجود */}
    </button>
    </div>
  );
}
export default ButtonSidBar;