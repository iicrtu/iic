import React from "react";
import animatedIcon from "../../assets/animated-icon.gif";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = 120 }) => (
  <div className="loading-spinner">
    <img
      src={animatedIcon}
      alt="Loading…"
      className="loading-spinner-img"
      style={{ width: size, height: size }}
    />
  </div>
);

export default LoadingSpinner;
