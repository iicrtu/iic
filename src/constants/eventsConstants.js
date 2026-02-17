// Events Page Constants

import logo from "../assets/logo.png";

import linkedin from "../assets/linkedin.jpeg";
import ideasp from "../assets/ideasp.jpeg";
import intern from "../assets/intern.jpeg";
export const EVENTS_HERO = {
  title: 'Our Events',
  description:
    'Join our exciting events, workshops, and competitions designed to fuel your entrepreneurial journey.',
};

export const EVENTS_DATA = [
  {
    id: 1,
    featured: false,
    badge: '',
    tag: 'SUMMIT',
    title: 'INTERNSHIP FAIR',
    badge: 'Upcoming',
    year: '2025',
    description:
      'an event organized to connect students with startups, companies, and organizations that are offering internship opportunities. It\'s like a mini job fair, but focused mainly on internships, especially with startups or innovative ventures.',
    location: 'PTP HALL,PNB BUILDING',
    image:intern,
    
  },
  {
    id: 2,
    featured: false,
    tags: ['WORKSHOP', 'COMPETETION'],
    badge: 'Completed',
    title: 'IDEA SPARK',
    year: '2025',
    description:
      'IDEASPARK is typically a startup idea pitching or ideation competition — a platform where students present innovative business ideas and get feedback, mentorship, and sometimes even funding or incubation support.',
    location: 'PTP HALL,PNB BUILDING',
    image:ideasp,
    
  },
  {
    id: 3,
    featured: false,
    badge: 'Upcoming',
    tag: 'SUMMIT',
    title: 'LINKEDIN',
    year: '2025',
    description:
      'A LinkedIn Session organized by a college E-Cell (Entrepreneurship Cell) is a professional networking and personal branding workshop designed to help students build a strong LinkedIn profile, expand their network, and learn how to use LinkedIn effectively for career or startup opportunities.',
    location: 'PTP HALL,PNB BUILDING',
    image:linkedin,
 
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
    location: 'PTP HALL,PNB BUILDING',
    image:logo,
  }
 
];

export const LABELS = {
  knowMoreBtn: 'Know More',
};
