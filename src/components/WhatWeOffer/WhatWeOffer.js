import React from 'react';
import './WhatWeOffer.css';

const WhatWeOffer = () => {
    const offers = [
        {
            iconColor: '#3EDB6E',
            title: 'Workshops & Training',
            description: 'Regular workshops on business planning, product development, marketing strategies, and more.'
        },
        {
            iconColor: '#DBCE3E',
            title: 'Ideation Sessions',
            description: 'Brainstorming sessions and hackathons to help you develop and refine your business ideas.'
        },
        {
            iconColor: '#DB3E41',
            title: 'Business Incubation',
            description: 'Access to incubation facilities, resources, and infrastructure to grow your startup.'
        },
        {
            iconColor: '#853EDB',
            title: 'Networking Events',
            description: 'Connect with fellow entrepreneurs, investors, and industry leaders at our events.'
        },
        {
            iconColor: '#DB3ECC',
            title: 'Mentorship Program',
            description: 'Connect with experienced entrepreneurs and industry experts for guidance and support.'
        },
        {
            iconColor: '#3ECCDB',
            title: 'Funding Support',
            description: 'Help in securing seed funding, connecting with investors, and pitch preparation'
        }
    ];

    return (
        <section id="about" className="what-we-offer">
            <h2 className="section-title">What We Offer</h2>
            <p className="section-description">
                Comprehensive support and resources to help you turn your entrepreneurial dreams into reality.
            </p>
            <div className="offer-grid">
                {offers.map((offer, index) => (
                    <div key={index} className="offer-card">
                        <div 
                            className="card-icon" 
                            style={{ background: offer.iconColor }}
                        ></div>
                        <h3 className="card-title">{offer.title}</h3>
                        <p className="card-description">{offer.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatWeOffer;

