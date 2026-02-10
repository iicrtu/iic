import React from 'react';
import './EventsPage.css';
import { EVENTS_HERO, EVENTS_DATA, LABELS } from '../../constants/eventsConstants';

const EventsPage = () => {
  return (
    <div className="events-page">
      <section className="events-hero">
        <h1 className="section-title">{EVENTS_HERO.title}</h1>
        <p className="section-description">{EVENTS_HERO.description}</p>
      </section>

      <section className="events-list-section">
        <div className="events-list-container">
          {EVENTS_DATA.map((event) => (
            <div
              key={event.id}
              className={`event-card-large ${
                event.featured ? 'featured' : 'non-featured'
              }`}
            >
              <div className="event-card-content">
                <div className="event-header">
                  {event.tags ? (
                    <div className="event-tags-group">
                      {event.tags.map((tag, i) => (
                        <div key={i} className="event-tag-small">
                          {tag}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="event-tag">{event.tag}</div>
                  )}
                  {event.badge && (
                    <div className="event-badge">{event.badge}</div>
                  )}
                </div>
                <h2
                  className={
                    event.featured
                      ? 'event-title-large'
                      : 'event-title-small'
                  }
                >
                  {event.title}
                </h2>
                <p
                  className={
                    event.featured ? 'event-year' : 'event-year-small'
                  }
                >
                  {event.year}
                </p>
                <p
                  className={
                    event.featured
                      ? 'event-description-large'
                      : 'event-description-small'
                  }
                >
                  {event.description}
                </p>
                <p
                  className={
                    event.featured
                      ? 'event-location'
                      : 'event-location-small'
                  }
                >
                  {event.location}
                </p>
                <button className="know-more-btn">{LABELS.knowMoreBtn}</button>
              </div>
              {event.featured && <div className="event-image-large"></div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;


