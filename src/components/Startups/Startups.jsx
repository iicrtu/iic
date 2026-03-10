import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Startups.css";

import {
  STARTUPS_HOME_SECTION,
  STARTUPS_DATA,
  LABELS,
} from "../../constants/startupsConstants";

const StartupCard = ({ name, description, badge, stats, info }) => (
  <div className="startup-card slider-card">

    <div className="startup-badge">{badge}</div>

    <h3 className="startup-name">{name}</h3>

    <p className="startup-description">{description}</p>

    <div className="startup-stats">

      <div className="stat-box">
        <div className="stat-value">{stats.users}</div>
        <div className="stat-label">{LABELS.usersLabel}</div>
      </div>

      <div className="stat-box">
        <div className="stat-value">{stats.growth}</div>
        <div className="stat-label">{LABELS.growthLabel}</div>
      </div>

    </div>

    <div className="startup-info">
      <span>{info.year}</span>
      <span>{info.members}</span>
    </div>

  </div>
);

const Startups = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    const card = slider.querySelector(".startup-card");

    if (!slider || !card) return;

    slider.scrollBy({
      left: -(card.offsetWidth + 20),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    const card = slider.querySelector(".startup-card");

    if (!slider || !card) return;

    slider.scrollBy({
      left: card.offsetWidth + 20,
      behavior: "smooth",
    });
  };

  return (
    <section id="startups" className="startups-section">

      <h2 className="section-title">
        <span className="title-part1">{STARTUPS_HOME_SECTION.titlePart1}</span>{" "}
        <span className="title-part2">{STARTUPS_HOME_SECTION.titlePart2}</span>
      </h2>

      <p className="section-description">
        {STARTUPS_HOME_SECTION.description}
      </p>

      {/* SLIDER WRAPPER */}

      <div className="startups-slider-wrapper">

        {/* LEFT ARROW */}

        <button
          className="slider-btn left"
          onClick={scrollLeft}
        >
          ‹
        </button>

        {/* CARDS */}

        <div className="startups-grid" ref={sliderRef}>
          {STARTUPS_DATA.map((startup) => (
            <StartupCard key={startup.id} {...startup} />
          ))}
        </div>

        {/* RIGHT ARROW */}

        <button
          className="slider-btn right"
          onClick={scrollRight}
        >
          ›
        </button>

      </div>

     

    </section>
  );
};

export default Startups;