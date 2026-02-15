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
                    <h1 className="about-title">
                        <span className="title-part1">About </span>
                        <span className="title-part2">E-Cell</span>
                    </h1>
                    <p className="about-description">
                        {ABOUT_HERO.description}
                    </p>
                </div>
            </section>

            <section className="vision-mission-section">
                <div className="vision-mission-container">
                    <div className="vision-card">
                        <div className="vision-icon"></div>
                        <h2 className="vision-title">{VISION.title}</h2>
                        <p className="vision-text">
                            {VISION.text}
                        </p>
                    </div>
                    <div className="mission-card">
                        <div className="mission-icon"></div>
                        <h2 className="mission-title">{MISSION.title}</h2>
                        <p className="mission-text">
                            {MISSION.text}
                        </p>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2 className="section-title">
                    <span className="title-part1">Our </span>
                    <span className="title-part2">Team</span>
                    <span className="core-underline"></span> 
                    </h2>
                    
                <p className="section-description">
                    {TEAM_SECTION.description}
                </p>
                
                <div className="team-hero">
                    <div className="team-hero-inner">
                        <div className="team-member-card chairman-card">
                            <div className="member-image-container">
                                <img
                                    src={`/src/assets/${TEAM_SECTION.chairman.image}`}
                                    alt={TEAM_SECTION.chairman.name}
                                    className="member-image"
                                />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">{TEAM_SECTION.chairman.name}</h4>
                                <div className="team-role">{TEAM_SECTION.chairman.role}</div>
                                
                                <div className="member-socials">
                                        <a href={TEAM_SECTION.chairman.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                            <img src="/src/assets/linkedin-icon.png" alt="LinkedIn" />
                                        </a>
                                        <a href={`mailto:${TEAM_SECTION.chairman.email}`} className="social-icon">
                                            <img src="/src/assets/email.webp" alt="Email" />
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team-categories">
                    <h2 className="category-title">
                    <span className="team-category-title1">Core</span>
                    <span className="team-category-title2">Team</span>
                    <span className="core-underline"></span>
                    </h2>
                    
                    <div className="team-grid">
                        {TEAM_SECTION.coreTeam.map((member, index) => (
                            <div key={index} className="team-member-card">
                                <div className="member-image-container">
                                    <img 
                                        src={`/src/assets/${member.image}`} 
                                        alt={member.name}
                                        className="member-image" 
                                    />
                                </div>
                                <div className="member-info">
                                    <h4 className="member-name">{member.name}</h4>
                                    <p className="member-position">{member.position}</p>
                                    <div className="member-socials">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                            <img src="/src/assets/linkedin-icon.png" alt="LinkedIn" />
                                        </a>
                                        <a href={`mailto:${member.email}`} className="social-icon">
                                            <img src="/src/assets/email.webp" alt="Email" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                    
            </section>
        </div> 
    );
};

export default About;


