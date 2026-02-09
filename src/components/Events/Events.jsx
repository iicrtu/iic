import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';
import { EVENTS_SECTION, EVENTS_DATA } from '../../constants/eventsComponentConstants';

const Events = () => {
    return (
        <section id="events" className="events-section">
            <h2 className="section-title">{EVENTS_SECTION.title}</h2>
            <p className="section-description">
                {EVENTS_SECTION.description}
            </p>
            <div className="events-container">
                {EVENTS_DATA.map((event, index) => (
                    <div key={index} className={`event-card ${event.featured ? 'featured' : ''}`}>
                        {event.badge && (
                            <div className="event-badge">{event.badge}</div>
                        )}
                        {event.tags ? (
                            <>
                                {event.tags.map((tag, i) => (
                                    <div key={i} className="event-tag-small">{tag}</div>
                                ))}
                            </>
                        ) : (
                            <div className="event-tag">{event.tag}</div>
                        )}
                        <h3 className={event.featured ? 'event-title' : 'event-title-small'}>
                            {event.title}
                        </h3>
                        <p className={event.featured ? 'event-year' : 'event-year-small'}>
                            {event.year}
                        </p>
                        <p className={event.featured ? 'event-description' : 'event-description-small'}>
                            {event.description}
                        </p>
                        <p className={event.featured ? 'event-location' : 'event-location-small'}>
                            {event.location}
                        </p>
                        <button className="know-more-btn">{EVENTS_SECTION.knowMoreButtonText}</button>
                    </div>
                ))}
            </div>
            <Link to={EVENTS_SECTION.viewAllLink} className="view-all-btn">{EVENTS_SECTION.viewAllButtonText}</Link>
        </section>
    );
};

export default Events;

