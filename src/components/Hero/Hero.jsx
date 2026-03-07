import React, { useState, useEffect } from "react";
import "./Hero.css";
import { HERO_CONTENT } from "../../constants/heroConstants";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["Innovate", "Build", "Scale", "Transform", "Launch"];

const Hero = () => {
  const navigate = useNavigate();
  const [currentRotatingWordIndex, setCurrentRotatingWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Full-width background video */}
      <div className="hero-video-bg">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-gradient-fade"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-bg"></div>
          <span className="badge-text">{HERO_CONTENT.badge}</span>
        </div>
        <h1 className="hero-title">
          {HERO_CONTENT.titlePart1}
          <span className="hero-title-gradient">{HERO_CONTENT.titlePart2}</span>
        </h1>
        <p className="hero-description">{HERO_CONTENT.description}</p>

        <div className="hero-rotating-section">
          <span className="rotating-prefix">We help you</span>
          <div className="rotating-words-container">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRotatingWordIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rotating-word"
              >
                {rotatingWords[currentRotatingWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="explore-more-btn">
            {HERO_CONTENT.secondaryButtonText}
          </button>
          <button className="join-us-btn">
            {HERO_CONTENT.primaryButtonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
