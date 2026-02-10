import React from 'react';
import { Link } from 'react-router-dom';
import './Startups.css';
import {
  STARTUPS_HOME_SECTION,
  STARTUPS_DATA,
  LABELS,
} from '../../constants/startupsConstants';

const StartupCard = ({ name, description, badge, stats, info }) => (
  <div className="startup-card">
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
      <span>{info.funding}</span>
    </div>
  </div>
);

const Startups = () => {
  return (
    <section id="startups" className="startups-section">
      <h2 className="section-title">
        <span className="title-part1">{STARTUPS_HOME_SECTION.titlePart1}</span>
        <span className="title-part2">{STARTUPS_HOME_SECTION.titlePart2}</span>
      </h2>
      <p className="section-description">
        {STARTUPS_HOME_SECTION.description}
      </p>
      <div className="startups-grid">
        {STARTUPS_DATA.map((startup) => (
          <StartupCard key={startup.id} {...startup} />
        ))}
      </div>
      <Link to={STARTUPS_HOME_SECTION.viewAllLink} className="view-all-btn">
        {STARTUPS_HOME_SECTION.viewAllButtonText}
      </Link>
    </section>
  );
};

export default Startups;

