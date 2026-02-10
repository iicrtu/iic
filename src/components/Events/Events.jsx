import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';
import {
  EVENTS_SECTION,
  EVENTS_DATA,
} from '../../constants/eventsComponentConstants';

const EventCard = ({ tag, badge, title, year, description, date, location }) => (
  <div className="event-card">
    <div className="event-card-header">
      <span className="event-tag">{tag}</span>
      {badge && <span className="event-badge">{badge}</span>}
    </div>
    <h3 className="event-title">{title}</h3>
    <p className="event-year">{year}</p>
    <p className="event-description">{description}</p>
    <div className="event-meta">
      <p className="event-date">{date}</p>
      <p className="event-location">{location}</p>
    </div>
  </div>
);

const Events = () => {
  return (
    <section id="events" className="events-section">
      <h2 className="section-title">{EVENTS_SECTION.title}</h2>
      <p className="section-description">{EVENTS_SECTION.description}</p>
      <div className="events-grid">
        {EVENTS_DATA.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      <Link to={EVENTS_SECTION.viewAllLink} className="view-all-btn">
        {EVENTS_SECTION.viewAllButtonText}
      </Link>
    </section>
  );
};

export default Events;

