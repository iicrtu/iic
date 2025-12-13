import React from 'react';
import './StartupsPage.css';

const StartupsPage = () => {
    const stats = [
        { label: 'Jobs Created', value: '100+', color: 'linear-gradient(136deg, rgba(165, 33, 145, 1) 4%, rgba(200, 19, 146, 1) 94%)' },
        { label: 'Startups', value: '40+', color: 'rgba(236, 136, 203, 0.79)' },
        { label: 'Fundings', value: '2Lakh+', color: 'rgba(236, 136, 203, 0.79)' }
    ];

    const startups = [
        {
            id: 1,
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            status: 'Growing',
            category: 'Tech',
            stats: { users: '10K+', growth: '110%' },
            info: { year: '2023', founders: 'Rahul Sharma & Priya Gupta', funding: '₹5L Raised', website: 'www.sevak.com' }
        },
        {
            id: 2,
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            status: 'Growing',
            category: 'Tech',
            stats: { users: '10K+', growth: '110%' },
            info: { year: '2023', founders: 'Rahul Sharma & Priya Gupta', funding: '₹5L Raised', website: 'www.sevak.com' }
        },
        {
            id: 3,
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            status: 'Growing',
            category: 'Tech',
            stats: { users: '10K+', growth: '110%' },
            info: { year: '2023', founders: 'Rahul Sharma & Priya Gupta', funding: '₹5L Raised', website: 'www.sevak.com' }
        }
    ];

    return (
        <div className="startups-page">
            <section className="startups-hero">
                <div className="portfolio-badge">
                    <span>Our Portfolio</span>
                </div>
                <h1 className="section-title">Incubated Startups</h1>
                <p className="section-description">
                    Discover the innovative startups that have grown from ideas to successful ventures through our incubation program. Each story is a testament to the power of entrepreneurship and dedication.
                </p>
            </section>

            <section className="stats-section">
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ background: stat.color }}>
                            <div className="stat-value-large">{stat.value}</div>
                            <div className="stat-label-large">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="startups-list-section">
                <div className="startups-list-container">
                    {startups.map((startup) => (
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
                                        <div className="stat-label-text">Users</div>
                                    </div>
                                    <div className="stat-box-detailed">
                                        <div className="stat-value-gradient">{startup.stats.growth}</div>
                                        <div className="stat-label-text">Growth</div>
                                    </div>
                                </div>

                                <div className="startup-info-detailed">
                                    <div className="info-item">
                                        <span className="info-label">Founded</span>
                                        <span className="info-value">{startup.info.year}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Founders</span>
                                        <span className="info-value">{startup.info.founders}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Funding</span>
                                        <span className="info-value">{startup.info.funding}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Website</span>
                                        <span className="info-value-link">{startup.info.website}</span>
                                    </div>
                                </div>

                                <div className="startup-achievements">
                                    <h4 className="achievements-title">Key Achievements</h4>
                                </div>

                                <button className="learn-more-btn">Learn More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StartupsPage;

