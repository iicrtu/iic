import React, { useState, useRef, useCallback } from "react";
import "./Preloader.css";

const Preloader = ({ onFinished }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnded = useCallback(() => {
    setFadingOut(true);
    // Signal that the preloader is done so the hero video can start
    window.dispatchEvent(new Event('preloaderDone'));
    // Wait for the CSS fade-out transition to complete, then notify parent
    setTimeout(() => {
      onFinished?.();
    }, 800);
  }, [onFinished]);

  return (
    <div className={`preloader ${fadingOut ? "preloader--hidden" : ""}`}>
      <video
        ref={videoRef}
        className="preloader-video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Preloader;
