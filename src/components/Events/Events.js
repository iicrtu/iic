import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
    const events = [
        {
            featured: true,
            badge: 'Upcoming',
            tag: 'SUMMIT',
            title: 'INTERNSHIP FAIR',
            year: '2025',
            description: 'an event organized to connect students with startups, companies, and organizations that are offering internship opportunities. It\'s like a mini job fair, but focused mainly on internships, especially with startups or innovative ventures.',
            location: 'PTP HALL,PNB BUILDING'
        },
        {
            featured: false,
            tags: ['WORKSHOP', 'COMPETETION'],
            title: 'IDEA SPARK',
            year: '2025',
            description: 'IDEASPARK is typically a startup idea pitching or ideation competition — a platform where students present innovative business ideas and get feedback, mentorship, and sometimes even funding or incubation support.',
            location: 'PTP HALL,PNB BUILDING'
        },
        {
            featured: false,
            badge: 'Upcoming',
            tag: 'SUMMIT',
            title: 'LINKEDIN',
            year: '2025',
            description: 'A LinkedIn Session organized by a college E-Cell (Entrepreneurship Cell) is a professional networking and personal branding workshop designed to help students build a strong LinkedIn profile, expand their network, and learn how to use LinkedIn effectively for career or startup opportunities.',
            location: 'PTP HALL,PNB BUILDING'
        }
    ];

    return (
        <section id="events" className="events-section">
            <h2 className="section-title">Our Events</h2>
            <p className="section-description">
                Join our exciting events, workshops, and competitions designed to fuel your entrepreneurial journey.
            </p>
            <div className="events-container">
                {events.map((event, index) => (
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
                        <button className="know-more-btn">Know More</button>
                    </div>
                ))}
            </div>
            <Link to="/events" className="view-all-btn">View All Events</Link>
        </section>
    );
};

export default Events;

