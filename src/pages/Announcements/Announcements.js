import React from 'react';
import './Announcements.css';

const Announcements = () => {
    const categories = [
        { count: '1', label: 'WORKSHOP' },
        { count: '4', label: 'NEW UPDATES' },
        { count: '3', label: 'INTERNSHIP' },
        { count: '4', label: 'COMPETETION' }
    ];

    const announcements = [
        {
            id: 1,
            type: 'SIP',
            title: 'Summer Internship Program',
            description: 'Apply for our exclusive Summer Internship Program with top tech companies. Get hands-on experience and .......',
            posted: 'November 20, 2025',
            deadline: 'March 20, 2026'
        },
        {
            id: 2,
            type: 'SIP',
            title: 'Summer Internship Program',
            description: 'Apply for our exclusive Summer Internship Program with top tech companies. Get hands-on experience and .......',
            posted: 'November 20, 2025',
            deadline: 'March 20, 2026'
        },
        {
            id: 3,
            type: 'SIP',
            title: 'Summer Internship Program',
            description: 'Apply for our exclusive Summer Internship Program with top tech companies. Get hands-on experience and .......',
            posted: 'November 20, 2025',
            deadline: 'March 20, 2026'
        }
    ];

    return (
        <div className="announcements-page">
            <section className="announcements-hero">
                <div className="stay-updated-badge">
                    <span>Stay Upated</span>
                </div>
                <h1 className="section-title">_Announcements</h1>
                <p className="section-description">
                    Discover latest opportunities, competitions, workshops, and important announcements. Don't miss out on these amazing chances to grow!
                </p>
            </section>

            <section className="categories-section">
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <div key={index} className="category-card">
                            <div className="category-count">{category.count}</div>
                            <div className="category-label">{category.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="announcements-list-section">
                <div className="announcements-list-container">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="announcement-card">
                            <div className="announcement-header">
                                <div className="announcement-type-badge">{announcement.type}</div>
                            </div>
                            <div className="announcement-content">
                                <h2 className="announcement-title">{announcement.title}</h2>
                                <p className="announcement-description">{announcement.description}</p>
                                <div className="announcement-dates">
                                    <div className="date-item">
                                        <span className="date-label">Posted:</span>
                                        <span className="date-value">{announcement.posted}</span>
                                    </div>
                                    <div className="date-item">
                                        <span className="date-label">Deadline :</span>
                                        <span className="date-value">{announcement.deadline}</span>
                                    </div>
                                </div>
                                <button className="explore-more-btn">
                                    <span>Explore More</span>
                                    <svg width="23" height="29" viewBox="0 0 23 29" fill="none">
                                        <path d="M8.63 7.25L14.38 14.5L8.63 21.75" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Announcements;

