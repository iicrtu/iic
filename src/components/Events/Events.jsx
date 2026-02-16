import React from 'react';

import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import './Events.css';
import {
  EVENTS_SECTION,
  EVENTS_DATA,
} from '../../constants/eventsComponentConstants';

const EventCard = ({ tag, tagIcon, badge, title, year, description, date, location }) => (
  <div className="event-card">
    <div className="event-card-header">
      {tagIcon ? (
        <div className="event-tag-icon-circle">
          <img src={tagIcon} alt={tag} className="event-tag-icon" />
        </div>
      ) : (
        <span className="event-tag">{tag}</span>
      )}
      {badge && <span className="event-badge">{badge}</span>}
    </div>
    <h3 className="event-title">{title}</h3>
    <p className="event-year">{year}</p>
    <p className="event-description">{description}</p>
    <div className="event-meta">
      <div className="event-date-container">
        <FiCalendar className="event-icon" />
        <p className="event-date">{date}</p>
      </div>
      <div className="event-location-container">
        <FiMapPin className="event-icon" />
        <p className="event-location">{location}</p>
      </div>
    </div>
  </div>
);

const Events = () => {
  return (
    <section id="events" className="events-section">
      <h2 className="section-title">
        <span className="title-part1">Our</span>
        <span className="title-part2">Events</span>
      </h2>
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

