import React from 'react';
import './EventsPage.css';
import { EVENTS_HERO, EVENTS_DATA, LABELS } from '../../constants/eventsConstants';

const EventsPage = () => {
    return (
        <div className="events-page">
            <section className="events-hero">
                <h1 className="section-title">{EVENTS_HERO.title}</h1>
                <p className="section-description">
                    {EVENTS_HERO.description}
                </p>
            </section>

            <section className="events-list-section">
                <div className="events-list-container">
                    {EVENTS_DATA.map((event) => (
                        <div key={event.id} className="event-card-large">
                            <div className="event-card-content">
                                <div className="event-header">
                                    <div className="event-tag">{event.tag}</div>
                                    {event.badge && (
                                        <div className="event-badge">{event.badge}</div>
                                    )}
                                </div>
                                <h2 className="event-title-large">{event.title}</h2>
                                <p className="event-year">{event.year}</p>
                                <p className="event-description-large">{event.description}</p>
                                <p className="event-location">{event.location}</p>
                                <button className="know-more-btn">{LABELS.knowMoreBtn}</button>
                            </div>
                            <div className="event-image-large"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EventsPage;


