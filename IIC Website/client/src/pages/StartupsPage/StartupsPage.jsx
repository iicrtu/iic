import React from 'react';
import './StartupsPage.css';
import { STARTUPS_HERO, STATS, STARTUPS_DATA, LABELS } from '../../constants/startupsConstants';

const StartupsPage = () => {
    return (
        <div className="startups-page">
            <section className="startups-hero">
                <div className="portfolio-badge">
                    <span>{STARTUPS_HERO.badge}</span>
                </div>
                <h1 className="section-title">{STARTUPS_HERO.title}</h1>
                <p className="section-description">
                    {STARTUPS_HERO.description}
                </p>
            </section>

            <section className="stats-section">
                <div className="stats-container">
                    {STATS.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ background: stat.color }}>
                            <div className="stat-value-large">{stat.value}</div>
                            <div className="stat-label-large">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="startups-list-section">
                <div className="startups-list-container">
                    {STARTUPS_DATA.map((startup) => (
                        <div key={startup.id} className="startup-card-detailed">
                            <div className="startup-image-section">
                                <div className="startup-image-large"></div>
                            </div>
                            <div className="startup-details-section">
                                <div className="startup-header">
                                    <div className="startup-status-badge">{startup.status}</div>
                                    <div className="startup-category-tag">{startup.category}</div>
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
                                        <span className="info-label">{LABELS.fundingLabel}</span>
                                        <span className="info-value">{startup.info.funding}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{LABELS.websiteLabel}</span>
                                        <span className="info-value-link">{startup.info.website}</span>
                                    </div>
                                </div>

                                <div className="startup-achievements">
                                    <h4 className="achievements-title">{LABELS.achievementsTitle}</h4>
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


