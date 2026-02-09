import React from 'react';
import './Hero.css';
import heroImage from '../../images/hero-image.png';
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
                <h1 className="hero-title">{HERO_CONTENT.title}</h1>
                <p className="hero-description">
                    {HERO_CONTENT.description}
                </p>
                <button className="join-us-btn">{HERO_CONTENT.buttonText}</button>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt={HERO_CONTENT.imageAlt} />
            </div>
        </section>
    );
};

export default Hero;


