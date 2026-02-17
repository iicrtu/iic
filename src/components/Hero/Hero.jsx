import React, { useState, useEffect } from 'react';
import './Hero.css';
import ideasp from '../../assets/ideasp.jpeg';
import intern from '../../assets/intern.jpeg';
import linkedin from '../../assets/linkedin.jpeg';
import { HERO_CONTENT } from "../../constants/heroConstants";
import {useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

const Hero = () => {
    const navigate = useNavigate();
    const rotatingWords = ['Innovate', 'Build', 'Scale', 'Transform', 'Launch'];
    const heroImages = [ideasp, intern, linkedin];
    const [currentRotatingWordIndex, setCurrentRotatingWordIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Rotating words effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    // Rotating images effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="gradient-circle circle-1"></div>
                <div className="gradient-circle circle-2"></div>
            </div>
            <div className="hero-content">
                <div className="hero-badge">
                    <div className="badge-bg"></div>
                    <span className="badge-text">
                        {HERO_CONTENT.badge}</span>
                </div>
                <h1 className="hero-title">
                    {HERO_CONTENT.titlePart1}
                    <span className="hero-title-gradient">{HERO_CONTENT.titlePart2}</span>
                </h1>
                <p className="hero-description">
                    {HERO_CONTENT.description}
                </p>
                
                <div className="hero-rotating-section">
                    <span className="rotating-prefix">We help you</span>
                    <div className="rotating-words-container">
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
                    </div>
                </div>

                <div className="hero-buttons">
                    <button className="explore-more-btn" onClick={() => navigate('/about')}>{HERO_CONTENT.secondaryButtonText}</button>
                    <button className="join-us-btn">{HERO_CONTENT.primaryButtonText}</button>
                </div>
            </div>
            
            <div className="hero-right">
                <div className="gradient-blur blur-circle-1"></div>
                <div className="gradient-blur blur-circle-2"></div>
                <div className="hero-image-container">
                    <img src={heroImages[currentImageIndex]} alt="IIC" className="hero-rotating-image"/>
                </div>
            </div>
        </section>
);
};

export default Hero;


