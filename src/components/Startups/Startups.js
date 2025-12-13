import React from 'react';
import { Link } from 'react-router-dom';
import './Startups.css';

const Startups = () => {
    const startups = [
        {
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            stats: {
                users: '10K+',
                growth: '110%'
            },
            info: {
                year: '2022',
                funding: '50L',
                members: '3 Members'
            }
        },
        {
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            stats: {
                users: '10K+',
                growth: '110%'
            },
            info: {
                year: '2022',
                funding: '50L',
                members: '3 Members'
            }
        },
        {
            name: 'SEVAK',
            description: 'Connection between household main and people who want them',
            stats: {
                users: '10K+',
                growth: '110%'
            },
            info: {
                year: '2022',
                funding: '50L',
                members: '3 Members'
            }
        }
    ];

    return (
        <section id="startups" className="startups-section">
            <h2 className="section-title">
                <span className="title-part1">Our Incubated</span>
                <span className="title-part2">Startups</span>
            </h2>
            <p className="section-description">
                Meet the innovative startups we've nurtured from ideation to successful ventures. These are just a few success stories from our thriving ecosystem.
            </p>
            <div className="startups-grid">
                {startups.map((startup, index) => (
                    <div key={index} className="startup-card">
                        <div className="startup-image"></div>
                        <div className="startup-content">
                            <div className="startup-badge">Growing</div>
                            <h3 className="startup-name">{startup.name}</h3>
                            <p className="startup-description">{startup.description}</p>
                            <div className="startup-stats">
                                <div className="stat-box">
                                    <div className="stat-value">{startup.stats.users}</div>
                                    <div className="stat-label">Users</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-value">{startup.stats.growth}</div>
                                    <div className="stat-label">Growth</div>
                                </div>
                            </div>
                            <div className="startup-info">
                                <span>{startup.info.year}</span>
                                <span>{startup.info.funding}</span>
                                <span>{startup.info.members}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/startups" className="view-all-btn">View All Startups</Link>
        </section>
    );
};

export default Startups;

