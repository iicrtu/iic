import React from 'react';
import {Link}from "react-router-dom";
import './Announcements.css';
import { ANNOUNCEMENTS_HERO, ANNOUNCEMENTS_DATA, LABELS } from '../../constants/announcementsConstants';

const Announcements = () => {
    return (
        <div className="announcements-page">
            <section className="announcements-hero">
                <div className="stay-updated-badge">
                    <span>{ANNOUNCEMENTS_HERO.badge}</span>
                </div>
                <h1 className="section-title">{ANNOUNCEMENTS_HERO.title}</h1>
                <p className="section-description">
                    {ANNOUNCEMENTS_HERO.description}
                </p>
            </section>

               

            <section className="announcements-list-section">
                <div className="announcements-list-container">
                    {ANNOUNCEMENTS_DATA.map((announcement) => (
                        <div key={announcement.id} className="announcement-card">
                            <div className="announcement-header">
                                <div className="announcement-type-badge">{announcement.type}</div>
                            </div>
                            <div className="announcement-content">
                                <h2 className="announcement-title">{announcement.title}</h2>
                                <p className="announcement-description">{announcement.description}</p>
                                <div className="announcement-dates">
                                    <div className="date-item">
                                        <span className="date-label">{LABELS.postedLabel}</span>
                                        <span className="date-value">{announcement.posted}</span>
                                    </div>
                                    <div className="date-item">
                                        <span className="date-label">{LABELS.deadlineLabel}</span>
                                        <span className="date-value">{announcement.deadline}</span>
                                    </div>
                                </div>
                                <Link to="/apply" className="explore-more-btn">
                                    <span>{LABELS.exploreMoreBtn}</span>
                                    <svg width="23" height="29" viewBox="0 0 23 29" fill="none">
                                        <path d="M8.63 7.25L14.38 14.5L8.63 21.75" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Announcements;


