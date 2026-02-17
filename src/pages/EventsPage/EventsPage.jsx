import React from 'react';
import './EventsPage.css';
import { EVENTS_HERO, EVENTS_DATA, LABELS } from '../../constants/eventsConstants';

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
                className={`event-card-large ${
                  event.featured ? "featured" : "non-featured"
                }`}
              >
  
                {/* LEFT IMAGE */}
                <div className="events-left">
                  <img src={event.image} alt={event.title} />
                </div>
  
                {/* RIGHT TEXT */}
                <div className="event-right">
  
                  <h2>{event.title}</h2>
                  <p>{event.year}</p>
                  <p>{event.description}</p>
                  <p>{event.location}</p>
  
                  <button className="know-more-btn">
                    {LABELS.knowMoreBtn}
                  </button>
  
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


