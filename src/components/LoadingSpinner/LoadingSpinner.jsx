import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = 64 }) => (
  <div className="loading-spinner">
    <div
      className="loading-spinner-ring"
      style={{ width: size, height: size }}
    />
  </div>
);

export default LoadingSpinner;
