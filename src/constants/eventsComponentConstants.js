// Events Component Constants (for Home page)
import graduationHatIcon from '../assets/graduation-hat.png';
import ideaIcon from '../assets/idea.png';
import partnersIcon from '../assets/partners.png';

export const EVENTS_SECTION = {
  title: 'Our Events',
  description:
    'Join our exciting events, workshops, and competitions designed to fuel your entrepreneurial journey.',
  viewAllButtonText: 'View All Events',
  viewAllLink: '/events',
};

export const EVENTS_DATA = [
  {
    id: 'internship-fair',
    tag: 'SUMMIT',
    tagIcon: graduationHatIcon,
    badge: 'Summit',
    title: 'INTERNSHIP FAIR',
    year: '2025',
    description:
      'Annual flagship event featuring industry leaders, workshops, and networking opportunities.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL,PNB BUILDING',
  },
  {
    id: 'idea-spark',
    tag: 'COMPETITION',
    tagIcon: ideaIcon,
    badge: 'Competition',
    title: 'IDEA SPARK',
    year: '2025',
    description:
      'A startup pitching competition where students present their business ideas to investors.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL,PNB BUILDING',
  },
  {
    id: 'linkedin',
    tag: 'WORKSHOP',
    tagIcon: partnersIcon,
    badge: 'Workshop',
    title: 'LINKEDIN',
    year: '2025',
    description:
      'A Session for students guiding them about the potential of linkedIn and how to get best out of it.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL,PNB BUILDING',
  },
  // {
  //   id: 'startup-school',
  //   tag: 'WORKSHOP',
  //   tagIcon: partnersIcon,
  //   badge: 'Workshop',
  //   title: 'STARTUP SCHOOL',
  //   year: '2025',
  //   description:
  //     'A startup pitching workshop where students learn to present their business ideas to investors.',
  //   date: 'Nov 12-14, 2025',
  //   location: 'PTP HALL,PNB BUILDING',
  // }
];
