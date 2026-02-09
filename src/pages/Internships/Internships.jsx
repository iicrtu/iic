import React from 'react';
import './Internships.css';
import { INTERNSHIPS_HERO, ACTION_BUTTONS, STATS, INTERNSHIPS_DATA, LABELS } from '../../constants/internshipsConstants';

const Internships = () => {
    return (
        <div className="internships-page">
            <section className="internships-hero">
                <h1 className="section-title">{INTERNSHIPS_HERO.title}</h1>
                <p className="section-description">
                    {INTERNSHIPS_HERO.description}
                </p>
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
                                <h3 className="internship-title">{internship.title}</h3>
                                <p className="internship-company">{internship.company}</p>
                                <div className="internship-badge">{internship.type}</div>
                                <div className="internship-details">
                                    <div className="detail-row">
                                        <span className="detail-value">{internship.stipend}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-value">{internship.location}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-value">{internship.duration}</span>
                                    </div>
                                </div>
                                <div className="internship-divider"></div>
                                <button className="more-info-btn">{LABELS.moreInfoBtn}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Internships;


