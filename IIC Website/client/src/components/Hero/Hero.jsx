import React from 'react';
import './Hero.css';
import heroImage from '../../assets/hero-image.png';
import { HERO_CONTENT } from '../../constants/heroConstants';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="gradient-circle circle-1"></div>
                <div className="gradient-circle circle-2"></div>
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
                <p className="hero-description">
                    {HERO_CONTENT.description}
                </p>
                <div className="hero-buttons">
                    <button className="explore-more-btn">{HERO_CONTENT.secondaryButtonText}</button>
                    <button className="join-us-btn">{HERO_CONTENT.primaryButtonText}</button>
                </div>
            </div>
            <div className="hero-right">
                <div className="gradient-blur blur-circle-1"></div>
                <div className="gradient-blur blur-circle-2"></div>
                <div className="hero-cards-container">
                    <div className="hero-card hero-card-white">
                        <span className="card-label">INNOVATION</span>
                    </div>
                    <div className="hero-card hero-card-white">
                        <span className="card-label">GROWTH</span>
                    </div>
                    <div className="hero-card hero-card-white">
                        <span className="card-label">COMMUNITY</span>
                    </div>
                    <div className="hero-card hero-card-white">
                        <span className="card-label">SUCCESS</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;


