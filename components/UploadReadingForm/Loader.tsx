import React from "react";
import "../../styles/loader.css";
const Loader = ({ text }: { text: string }) => {
  return (
    <div className="info-message blue">
      <div className="loader-container d-flex align-items-center justify-content-center">
        <div className="loader"></div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Loader;
