// Events Page Constants

import logo from "../assets/logo.webp";

import linkedin from "../assets/linkedin.webp";
import ideasp from "../assets/ideasp.webp";
import intern from "../assets/intern.webp";
export const EVENTS_HERO = {
  title: 'Our Events',
  description:
    'Join our exciting events, workshops, and competitions designed to fuel your entrepreneurial journey.',
};

export const EVENTS_DATA = [
  {
    id: 1,
    featured: false,
    tag: 'SUMMIT',
    title: 'INTERNSHIP FAIR',
    badge: 'Upcoming',
    year: '2025',
    description:
      'An event organized to connect students with startups, companies, and organizations that are offering internship opportunities. It\'s like a mini job fair, but focused mainly on internships, especially with startups or innovative ventures.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL, PNB BUILDING',
    image: intern,
  },
  {
    id: 2,
    featured: false,
    tags: ['WORKSHOP', 'COMPETITION'],
    badge: 'Completed',
    title: 'IDEA SPARK',
    year: '2025',
    description:
      'IDEASPARK is typically a startup idea pitching or ideation competition — a platform where students present innovative business ideas and get feedback, mentorship, and sometimes even funding or incubation support.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL, PNB BUILDING',
    image: ideasp,
  },
  {
    id: 3,
    featured: false,
    badge: 'Upcoming',
    tag: 'WORKSHOP',
    title: 'LINKEDIN SESSION',
    year: '2025',
    description:
      'A LinkedIn Session organized by a college E-Cell (Entrepreneurship Cell) is a professional networking and personal branding workshop designed to help students build a strong LinkedIn profile, expand their network, and learn how to use LinkedIn effectively for career or startup opportunities.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL, PNB BUILDING',
    image: linkedin,
  },
  {
    id: 'startup-school',
    tag: 'WORKSHOP',
    badge: 'Completed',
    title: 'STARTUP SCHOOL',
    year: '2025',
    description:
      'A startup pitching workshop where students learn to present their business ideas to investors.',
    date: 'Nov 12-14, 2025',
    location: 'PTP HALL, PNB BUILDING',
    image: logo,
  },
];

export const LABELS = {
  knowMoreBtn: 'Know More',
};
