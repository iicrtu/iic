import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";
import { HERO_CONTENT } from "../../constants/heroConstants";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["Innovate", "Build", "Scale", "Transform", "Launch"];

const Hero = () => {
  const navigate = useNavigate();
  const [currentRotatingWordIndex, setCurrentRotatingWordIndex] = useState(0);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Pause the main video when it ends (no loop)
  const handleVideoEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Start the hero video once the preloader finishes
  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('preloaderDone', startVideo);
    return () => window.removeEventListener('preloaderDone', startVideo);
  }, []);

  // Replay video from start when the hero section re-enters the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* Full-width background video */}
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          onEnded={handleVideoEnded}
        >
          <source src="/hero.mp4" type="video/mp4" />
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
