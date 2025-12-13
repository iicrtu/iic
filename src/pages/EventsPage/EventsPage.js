import React from 'react';
import './EventsPage.css';

const EventsPage = () => {
    const events = [
        {
            id: 1,
            badge: 'Upcoming',
            tag: 'SUMMIT',
            title: 'INTERNSHIP FAIR',
            year: '2025',
            description: 'an event organized to connect students with startups, companies, and organizations that are offering internship opportunities. It\'s like a mini job fair, but focused mainly on internships, especially with startups or innovative ventures.',
            location: 'PTP HALL,PNB BUILDING',
            image: true
        },
        {
            id: 2,
            badge: 'Upcoming',
            tag: 'SUMMIT',
            title: 'IDEA SPARK',
            year: '2025',
            description: 'IDEASPARK is typically a startup idea pitching or ideation competition — a platform where students present innovative business ideas and get feedback, mentorship, and sometimes even funding or incubation support.',
            location: 'PTP HALL,PNB BUILDING',
            image: true
        },
        {
            id: 3,
            badge: 'Upcoming',
            tag: 'SUMMIT',
            title: 'LINKEDIN',
            year: '2025',
            description: 'A LinkedIn Session organized by a college E-Cell (Entrepreneurship Cell) is a professional networking and personal branding workshop designed to help students build a strong LinkedIn profile, expand their network, and learn how to use LinkedIn effectively for career or startup opportunities.',
            location: 'PTP HALL,PNB BUILDING',
            image: true
        }
    ];

    return (
        <div className="events-page">
            <section className="events-hero">
                <h1 className="section-title">Our Events</h1>
                <p className="section-description">
                    Join our exciting events, workshops, and competitions designed to fuel your entrepreneurial journey.
                </p>
            </section>

            <section className="events-list-section">
                <div className="events-list-container">
                    {events.map((event) => (
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
                                <button className="know-more-btn">Know More</button>
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

