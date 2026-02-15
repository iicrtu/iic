import React, { useEffect, useRef, useState } from 'react';
import './WhatWeOffer.css';
import { WHAT_WE_OFFER_HEADING, OFFER_CARDS } from '../../constants/whatWeOfferConstants';
import * as FaIcons from 'react-icons/fa';

const OfferCard = ({ iconColor, iconName, title, description, index }) => {
    const IconComponent = FaIcons[iconName];
    const cardNumber = String(index + 1).padStart(2, '0');

    return (
        <div className="offer-card">
            <div className="card-header">
                <div
                    className="card-icon"
                    style={{ backgroundColor: iconColor }}
                >
                    {IconComponent && <IconComponent className="icon-element" />}
                </div>
                <span className="card-number">{cardNumber}.</span>
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
};

const WhatWeOffer = () => {
    const total = OFFER_CARDS.length;
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);
    const isPaused = useRef(false);

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startAutoPlay = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            if (!isPaused.current) setCurrent((c) => (c + 1) % total);
        }, 3000);
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleMouseEnter = () => { isPaused.current = true; };
    const handleMouseLeave = () => { isPaused.current = false; };

    const slideStyle = (index) => {
        let diff = (index - current + total) % total;
        if (diff > total / 2) diff -= total;
        const abs = Math.abs(diff);

        if (abs > 2) {
            const off = diff > 0 ? 1200 : -1200;
            return {
                transform: `translate(-50%, -50%) translate3d(${off}px, 0px, -900px) scale(0.7)`,
                opacity: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
            };
        }

        // card width reduced to 360px; spacing set so 70% of background card is visible
        const cardWidth = 360;
        const spacing = Math.round(cardWidth * 0.7); // 70% visible -> 30% hidden behind previous
        const translateX = diff * spacing;
        const translateY = -abs * 6;
        const translateZ = -abs * 80;
        const scale = diff === 0 ? 1 : 0.96 - abs * 0.02;
        const opacity = diff === 0 ? 1 : 0.7;
        const zIndex = 100 - abs;

        return {
            transform: `translate(-50%, -50%) translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale(${scale})`,
            opacity,
            zIndex,
            visibility: 'visible',
            pointerEvents: diff === 0 ? 'auto' : 'none',
        };
    };

    return (
        <section id="about" className="what-we-offer">
            <h2 className="section-title">
                <span className="title-part1">What We</span>
                <span className="title-part2">Offer</span>
            </h2>
            <p className="section-description">{WHAT_WE_OFFER_HEADING.description}</p>

            {/* Desktop carousel (centered single card with background cards) */}
            <div className="offers-carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {OFFER_CARDS.map((offer, i) => (
                    <div key={offer.id} className="carousel-slide" style={slideStyle(i)}>
                        <OfferCard 
                            iconColor={offer.iconColor} 
                            iconName={offer.iconName}
                            title={offer.title} 
                            description={offer.description}
                            index={i}
                        />
                    </div>
                ))}

                <div className="carousel-segments" role="tablist" aria-label="offers progress">
                    {OFFER_CARDS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`segment ${idx === current ? 'active' : ''}`}
                            onClick={() => setCurrent(idx)}
                            role="tab"
                            aria-selected={idx === current}
                        />
                    ))}
                </div>
            </div>

            {/* Grid fallback for smaller screens */}
            <div className="offer-grid">
                {OFFER_CARDS.map((offer, index) => (
                    <OfferCard
                        key={offer.id}
                        iconColor={offer.iconColor}
                        iconName={offer.iconName}
                        title={offer.title}
                        description={offer.description}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default WhatWeOffer;


