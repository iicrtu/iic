import React, { useRef, useState, useEffect } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import "./Events.css";

import {
  EVENTS_SECTION,
  EVENTS_DATA,
} from "../../constants/eventsComponentConstants";

const EventCard = ({
  tag,
  tagIcon,
  badge,
  title,
  year,
  description,
  date,
  location,
}) => (
  <div className="event-card">
    <div className="event-card-header">
      {tagIcon ? (
        <div className="event-tag-icon-circle">
          <img
            src={tagIcon}
            alt={tag}
            className="event-tag-icon"
            loading="lazy"
            width="24"
            height="24"
          />
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
  const sliderRef = useRef(null);

  const [isLeftInactive, setIsLeftInactive] = useState(true);
  const [isRightInactive, setIsRightInactive] = useState(false);

  const checkScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsLeftInactive(slider.scrollLeft <= 0);

    setIsRightInactive(
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5
    );
  };

  useEffect(() => {
    checkScroll();

    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (isLeftInactive) return;

    const slider = sliderRef.current;
    const card = slider.firstElementChild;

    slider.scrollBy({
      left: -(card.offsetWidth + 20),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (isRightInactive) return;

    const slider = sliderRef.current;
    const card = slider.firstElementChild;

    slider.scrollBy({
      left: card.offsetWidth + 20,
      behavior: "smooth",
    });
  };

  return (
    <section id="events" className="events-section">
      <h2 className="section-title">
        <span className="title-part1">{EVENTS_SECTION.titlePart1}</span>{" "}
        <span className="title-part2">{EVENTS_SECTION.titlePart2}</span>
      </h2>

      <p className="section-description">{EVENTS_SECTION.description}</p>

      <div className="events-slider-wrapper">

        <button
          className={`slider-btn left ${isLeftInactive ? "inactive" : ""}`}
          onClick={scrollLeft}
        >
          ‹
        </button>

        <div className="events-grid" ref={sliderRef}>
          {EVENTS_DATA.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <button
          className={`slider-btn right ${isRightInactive ? "inactive" : ""}`}
          onClick={scrollRight}
        >
          ›
        </button>

      </div>
    </section>
  );
};

export default Events;