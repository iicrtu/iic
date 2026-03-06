import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import './EventsPage.css';
import { EVENTS_HERO, EVENTS_DATA } from '../../constants/eventsConstants';

const EventsPage = () => {
  return (
    <section className="all-events">
      <div className="events-page">

        {/* HERO */}
        <section className="events-hero">
          <h1 className="section-title">{EVENTS_HERO.title}</h1>
          <p className="section-description">{EVENTS_HERO.description}</p>
        </section>

        {/* LIST */}
        <section className="events-list-section">
          <div className="events-list-container">

            {EVENTS_DATA.map((event) => (
              <div
                key={event.id}
                className="event-card-large"
              >

                {/* LEFT IMAGE */}
                <div className="events-left">
                  <img src={event.image} alt={event.title} loading="lazy" width="600" height="400" />
                </div>

                {/* RIGHT TEXT */}
                <div className="event-right">

                  {/* Tags + Badge row */}
                  <div className="event-card-header-large">
                    <div className="event-tags-group">
                      {event.tags
                        ? event.tags.map((t) => (
                            <span key={t} className="event-tag">{t}</span>
                          ))
                        : event.tag && <span className="event-tag">{event.tag}</span>}
                    </div>
                    {event.badge && <span className="event-badge">{event.badge}</span>}
                  </div>

                  <h2 className="event-title-large">{event.title}</h2>
                  <p className="event-year">{event.year}</p>
                  <p className="event-description-large">{event.description}</p>

                  {/* Date + Location with icons */}
                  <div className="event-meta-large">
                    {event.date && (
                      <div className="event-meta-item">
                        <FiCalendar className="event-meta-icon" />
                        <span>{event.date}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="event-meta-item">
                        <FiMapPin className="event-meta-icon" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ))}

          </div>
        </section>

      </div>
    </section>
  );
};

export default EventsPage;


