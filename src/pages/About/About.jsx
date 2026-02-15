import React from 'react';
import './About.css';
import { ABOUT_HERO, VISION, MISSION, TEAM_SECTION } from '../../constants/aboutConstants';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <div className="about-badge">
                        <span>{ABOUT_HERO.badge}</span>
                    </div>
                    <h1 className="about-title">About <span className="highlight">E-Cell</span></h1>
                    <p className="about-description">
                        {ABOUT_HERO.description}
                    </p>
                </div>
            </section>

            <section className="vision-mission-section">
                <div className="vision-mission-container">
                    <div className="vision-card">
                        <div className="vision-card-box">
                            <div className="icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className="icon">
                                    {/* Eye icon for Vision */}
                                    <ellipse cx="30" cy="30" rx="20" ry="12" stroke="white" strokeWidth="2.5" fill="none"/>
                                    <circle cx="30" cy="30" r="7" stroke="white" strokeWidth="2.5" fill="none"/>
                                    <circle cx="30" cy="30" r="4" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="vision-content">
                            <h2 className="vision-title">{VISION.title}</h2>
                            <p className="vision-text">
                                {VISION.text}
                            </p>
                        </div>
                    </div>
                    <div className="mission-card">
                        <div className="mission-card-box">
                            <div className="icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className="icon">
                                    {/* Rocket icon for Mission */}
                                    <path d="M30 10 L30 42" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    <path d="M30 10 L22 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    <path d="M30 10 L38 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    <ellipse cx="30" cy="25" rx="8" ry="12" stroke="white" strokeWidth="2.5" fill="none"/>
                                    <path d="M22 38 L18 48 L22 46 L30 50 L38 46 L42 48 L38 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                </svg>
                            </div>
                        </div>
                        <div className="mission-content">
                            <h2 className="mission-title">{MISSION.title}</h2>
                            <p className="mission-text">
                                {MISSION.text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2 className="section-title">Our <span className="highlight">Team</span></h2>
                <p className="section-description">
                    {TEAM_SECTION.description}
                </p>
                
                <div className="team-hero">
                    <div className="team-hero-image"></div>
                    <div className="team-hero-info">
                        <div className="team-role">{TEAM_SECTION.chairman.role}</div>
                        <h3 className="team-name">{TEAM_SECTION.chairman.name}</h3>
                        <p className="team-position">{TEAM_SECTION.chairman.position}</p>
                    </div>
                </div>

                <div className="team-categories">
                    <h3 className="team-category-title">{TEAM_SECTION.coreTeamTitle}</h3>
                    <div className="team-grid">
                        {[...Array(TEAM_SECTION.coreTeamCount)].map((_, index) => (
                            <div key={index} className="team-member-card">
                                <div className="member-image"></div>
                                <div className="member-info">
                                    <h4 className="member-name">{TEAM_SECTION.placeholderMemberName}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team-categories">
                    <h3 className="team-category-title">{TEAM_SECTION.alumniTitle}</h3>
                    <div className="alumni-section">
                        <div className="alumni-cards">
                            {[...Array(TEAM_SECTION.alumniCount)].map((_, index) => (
                                <div key={index} className="alumni-card">
                                    <div className="alumni-avatar"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;


