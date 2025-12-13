import React from 'react';
import './Internships.css';

const Internships = () => {
    const stats = [
        { value: '10', label: 'companies' },
        { value: '60+', label: 'Positions' },
        { value: 'Rs.7k', label: 'Average Stipend' },
        { value: '10', label: 'companies' }
    ];

    const internships = [
        {
            id: 1,
            title: 'Software Development Intern',
            company: 'SARAS Prvt. Lt',
            type: 'PAID',
            stipend: '₹5,000/month',
            location: 'JAIPUR',
            duration: '45-60Days',
            image: true
        },
        {
            id: 2,
            title: 'Graphic Design Intern',
            company: 'EntreShip',
            type: 'PAID',
            stipend: '₹2000/month',
            location: 'ONLINE',
            duration: '45-60Days',
            image: true
        },
        {
            id: 3,
            title: 'Software Development Intern',
            company: 'SARAS Prvt. Lt',
            type: 'PAID',
            stipend: '₹5,000/month',
            location: 'JAIPUR',
            duration: '45-60Days',
            image: true
        },
        {
            id: 4,
            title: 'Graphic Design Intern',
            company: 'EntreShip',
            type: 'PAID',
            stipend: '₹2000/month',
            location: 'ONLINE',
            duration: '45-60Days',
            image: true
        },
        {
            id: 5,
            title: 'Graphic Design Intern',
            company: 'EntreShip',
            type: 'PAID',
            stipend: '₹2000/month',
            location: 'ONLINE',
            duration: '45-60Days',
            image: true
        },
        {
            id: 6,
            title: 'Software Development Intern',
            company: 'SARAS Prvt. Lt',
            type: 'PAID',
            stipend: '₹5,000/month',
            location: 'JAIPUR',
            duration: '45-60Days',
            image: true
        },
        {
            id: 7,
            title: 'Graphic Design Intern',
            company: 'EntreShip',
            type: 'PAID',
            stipend: '₹2000/month',
            location: 'ONLINE',
            duration: '45-60Days',
            image: true
        },
        {
            id: 8,
            title: 'Graphic Design Intern',
            company: 'EntreShip',
            type: 'PAID',
            stipend: '₹2000/month',
            location: 'ONLINE',
            duration: '45-60Days',
            image: true
        },
        {
            id: 9,
            title: 'Software Development Intern',
            company: 'SARAS Prvt. Lt',
            type: 'PAID',
            stipend: '₹5,000/month',
            location: 'JAIPUR',
            duration: '45-60Days',
            image: true
        }
    ];

    return (
        <div className="internships-page">
            <section className="internships-hero">
                <h1 className="section-title">INTERNSHIPS</h1>
                <p className="section-description">
                    Explore exciting internship opportunities from top companies. Find your perfect match and kickstart your career!
                </p>
            </section>

            <section className="internships-actions">
                <div className="actions-container">
                    <button className="action-btn primary">DOWNLOAD BROUCHER</button>
                    <button className="action-btn secondary">DOWNLOAD BROUCHER</button>
                    <button className="action-btn tertiary">RESUME TEMPLATE</button>
                    <button className="action-btn gradient">REGISTER AS COMPANY</button>
                </div>
            </section>

            <section className="internships-stats">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card-internship">
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-text">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="internships-list-section">
                <div className="internships-grid">
                    {internships.map((internship) => (
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
                                <button className="more-info-btn">MORE INFO</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Internships;

