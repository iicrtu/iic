import React from 'react';
import './WhatWeOffer.css';
import { WHAT_WE_OFFER_HEADING, OFFER_CARDS } from '../../constants/whatWeOfferConstants';

const OfferCard = ({ iconColor, title, description }) => (
    <div className="offer-card">
        <div
            className="card-icon"
            style={{ backgroundColor: iconColor }}
        />
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
    </div>
);

const WhatWeOffer = () => {
    return (
        <section id="about" className="what-we-offer">
            <h2 className="section-title">{WHAT_WE_OFFER_HEADING.title}</h2>
            <p className="section-description">{WHAT_WE_OFFER_HEADING.description}</p>
            <div className="offer-grid">
                {OFFER_CARDS.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        iconColor={offer.iconColor}
                        title={offer.title}
                        description={offer.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default WhatWeOffer;


