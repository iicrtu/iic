import React from "react";
import animatedIcon from "../../assets/animated-icon.gif";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = 120 }) => (
  <div className="loading-spinner">
    <img
      src={animatedIcon}
      alt="Loading…"
      width={size}
      height={size}
      className="loading-spinner-gif"
    />
  </div>
);

export default LoadingSpinner;
