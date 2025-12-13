import React from 'react';
import './Hero.css';
import heroImage from '../../images/hero-image.png';

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
                    <span className="badge-text">Empowering Student Entrepreneurs</span>
                </div>
                <h1 className="hero-title">Welcome To IIC</h1>
                <p className="hero-description">
                    The Entrepreneurship Cell of our college - fostering innovation, building startups, and creating tomorrow's leaders today.
                </p>
                <button className="join-us-btn">JOIN US</button>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt="Hero" />
            </div>
        </section>
    );
};

export default Hero;

