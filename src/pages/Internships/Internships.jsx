import React, { useState } from 'react';
import './Internships.css';
import { INTERNSHIPS_HERO, ACTION_BUTTONS, STATS, INTERNSHIPS_DATA } from '../../constants/internshipsConstants';

const Internships = () => {
    const [openId, setOpenId] = useState(null);

    return (
        <div className="internships-page">
            <section className="internships-hero">
                <h1 className="section-title">{INTERNSHIPS_HERO.title}</h1>
                <p className="section-description">{INTERNSHIPS_HERO.description}</p>
            </section>

            <section className="internships-actions">
                <div className="actions-container">
                    {ACTION_BUTTONS.map((button, index) => (
                        <button key={index} className={`action-btn ${button.type}`}>
                            {button.label}
                        </button>
                    ))}
                </div>
            </section>

            <section className="internships-stats">
                <div className="stats-grid">
                    {STATS.map((stat, index) => (
                        <div key={index} className="stat-card-internship">
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-text">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="internships-list-section">
                <div className="internships-grid">
                    {INTERNSHIPS_DATA.map((internship) => (
                        <div key={internship.id} className="internship-card">
                            <div className="internship-image"></div>
                            <div className="internship-content">
                                {openId === internship.id ? (
                                    <div className="internship-details-replaced">
                                        <div className="replaced-section">
                                            <h4>Description</h4>
                                            <p className="replaced-desc">{internship.description || 'No description available.'}</p>
                                        </div>
                                        <div className="replaced-section">
                                            <h4>Stipend</h4>
                                            <p className="replaced-desc">{internship.stipend || 'Not specified'}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="internship-title">{internship.title}</h3>
                                        <p className="internship-company">{internship.company}</p>

                                        <div className="internship-details">
                                            <div className="detail-row">
                                                <span className="detail-value">{internship.location}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-value">{internship.duration}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                            
                                <button
                                    className="more-info-btn"
                                    onClick={() => setOpenId(openId === internship.id ? null : internship.id)}
                                >
                                    {openId === internship.id ? 'View Less' : 'View More'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Internships;