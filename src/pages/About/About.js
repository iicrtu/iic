import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <div className="about-badge">
                        <span>OUR STORY</span>
                    </div>
                    <h1 className="about-title">About E-Cell</h1>
                    <p className="about-description">
                        We are a dynamic student-run organization dedicated to promoting entrepreneurship and innovation culture on campus. Since our inception, we've been on a mission to transform ideas into successful ventures.
                    </p>
                </div>
            </section>

            <section className="vision-mission-section">
                <div className="vision-mission-container">
                    <div className="vision-card">
                        <div className="vision-icon"></div>
                        <h2 className="vision-title">Our Vision</h2>
                        <p className="vision-text">
                            Entrepreneurs have a clear vision. These are the thinkers, innovators, the action takers who change society for a better tomorrow. The vision of IIC RTU Kota is to enable these action-takers to efficiently traverse their road to an enterprise by giving them exposure, mentorship, network, funding opportunities and wisdom to turn their dreams into reality.
                        </p>
                    </div>
                    <div className="mission-card">
                        <div className="mission-icon"></div>
                        <h2 className="mission-title">Our Mission</h2>
                        <p className="mission-text">
                            "Our mission is to cultivate an entrepreneurial mindset among students by providing hands-on learning experiences, organizing innovation-driven events, connecting them with mentors and investors, and supporting them in turning ideas into viable startups."
                        </p>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2 className="section-title">Our Team</h2>
                <p className="section-description">
                    Meet the passionate individuals driving innovation and entrepreneurship on campus. Our diverse team brings together expertise in technology, marketing, operations, and business development.
                </p>
                
                <div className="team-hero">
                    <div className="team-hero-image"></div>
                    <div className="team-hero-info">
                        <div className="team-role">Chairmen</div>
                        <h3 className="team-name">Dr. Manish Chaturvedi</h3>
                        <p className="team-position">Chairmen, IIC</p>
                    </div>
                </div>

                <div className="team-categories">
                    <h3 className="team-category-title">CORE TEAM</h3>
                    <div className="team-grid">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="team-member-card">
                                <div className="member-image"></div>
                                <div className="member-info">
                                    <h4 className="member-name">Aditya Choudhary</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team-categories">
                    <h3 className="team-category-title">OUR ALUMINI</h3>
                    <div className="alumni-section">
                        <div className="alumni-cards">
                            {[...Array(4)].map((_, index) => (
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

