import React, { useState } from 'react';
import './Announcements.css';
import { ANNOUNCEMENTS_HERO, LABELS } from '../../constants/announcementsConstants';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useAnnouncements } from '../../hooks/useApi';

const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const PER_PAGE = 10;

const Announcements = () => {
    const { data: announcements = [], isLoading: loading } = useAnnouncements();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(announcements.length / PER_PAGE);
    const paged = announcements.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="announcements-page">
            <section className="announcements-hero">
                <div className="stay-updated-badge">
                    <span>{ANNOUNCEMENTS_HERO.badge}</span>
                </div>
                <h1 className="section-title">{ANNOUNCEMENTS_HERO.title}</h1>
                <p className="section-description">
                    {ANNOUNCEMENTS_HERO.description}
                </p>
            </section>

            <section className="announcements-list-section">
                {loading ? (
                    <LoadingSpinner />
                ) : announcements.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>
                        No announcements right now. Check back later!
                    </p>
                ) : (
                    <div className="announcements-list-container">
                        {paged.map((announcement) => (
                            <div key={announcement._id} className="announcement-card">
                                <div className="announcement-header">
                                    <div className="announcement-type-badge">{announcement.year}</div>
                                </div>
                                <div className="announcement-content">
                                    <h2 className="announcement-title">{announcement.title}</h2>
                                    <p className="announcement-description">{announcement.description}</p>
                                    <div className="announcement-dates">
                                        <div className="date-item">
                                            <span className="date-label">{LABELS.postedLabel}</span>
                                            <span className="date-value">{formatDate(announcement.posted)}</span>
                                        </div>
                                        <div className="date-item">
                                            <span className="date-label">{LABELS.deadlineLabel}</span>
                                            <span className="date-value">{formatDate(announcement.deadline)}</span>
                                        </div>
                                    </div>
                                    {announcement.applyLink && (
                                        <a
                                            href={announcement.applyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="explore-more-btn"
                                        >
                                            <span>{LABELS.exploreMoreBtn}</span>
                                            <svg width="23" height="29" viewBox="0 0 23 29" fill="none">
                                                <path d="M8.63 7.25L14.38 14.5L8.63 21.75" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="ann-pagination">
                        <button
                            className="ann-page-btn"
                            disabled={page <= 1}
                            onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            ← Prev
                        </button>
                        <span className="ann-page-info">Page {page} of {totalPages}</span>
                        <button
                            className="ann-page-btn"
                            disabled={page >= totalPages}
                            onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Announcements;