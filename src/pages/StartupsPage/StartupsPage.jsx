import React from 'react';
import './StartupsPage.css';
import { STARTUPS_HERO, STATS, STARTUPS_DATA, LABELS } from '../../constants/startupsConstants';

const StartupsPage = () => {
    return (
        <div className="startups-page">
            <section>
                <h1 className="section-title1">{STARTUPS_HERO.title}</h1>
                <p className="section-description">
                    {STARTUPS_HERO.description}
                </p>
            </section>

            <section className="startups-list-section">
                <div className="startups-list-container">
                    {STARTUPS_DATA.map((startup, index) => (
                        <div key={startup.id} className={`startup-card-detailed ${index % 2 === 0 ? 'left-card' : 'right-card'}`}>
                            <div className="startup-floating-image"  > <img src={`/src/assets/${startup.image}`} height="140" width="140"></img></div>
                            <div className="startup-details-section">
                                <div className="startup-header">
                                    <div className="startup-status-badge">{startup.status}</div>
                                
                                </div>
                                <h2 className="startup-name-large">{startup.name}</h2>
                                <p className="startup-description-large">{startup.description}</p>
                                
                                <div className="startup-stats-detailed">
                                    <div className="stat-box-detailed">
                                        <div className="stat-value-gradient">{startup.stats.users}</div>
                                        <div className="stat-label-text">{LABELS.usersLabel}</div>
                                    </div>
                                    <div className="stat-box-detailed">
                                        <div className="stat-value-gradient">{startup.stats.growth}</div>
                                        <div className="stat-label-text">{LABELS.growthLabel}</div>
                                    </div>
                                </div>

                                <div className="startup-info-detailed">
                                    <div className="info-item">
                                        <span className="info-label">{LABELS.foundedLabel}</span>
                                        <span className="info-value">{startup.info.year}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{LABELS.foundersLabel}</span>
                                        <span className="info-value">{startup.info.founders}</span>
                                    </div>
                    
                                    <div className="info-item">
                                        <span className="info-label">{LABELS.websiteLabel}</span>
                                        <span className="info-value-link">{startup.info.website}</span>
                                    </div>
                                </div>

                                
                                <button className="learn-more-btn">{LABELS.learnMoreBtn}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StartupsPage;


