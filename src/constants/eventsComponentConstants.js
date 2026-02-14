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
<<<<<<< HEAD
    badge: 'Upcoming',
=======
    tagIcon: ideaIcon,
    badge: 'Competition',
>>>>>>> 059821a (Added sliding what we offer cards and added links)
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
<<<<<<< HEAD
    badge: 'Upcoming',
=======
    tagIcon: partnersIcon,
    badge: 'Workshop',
>>>>>>> 059821a (Added sliding what we offer cards and added links)
    title: 'LINKEDIN',
    year: '2025',
    description:
      'A Session for students guiding them about the potential of linkedIn and how to get best out of it.',
    date: 'March 15-16, 2025',
    location: 'PTP HALL,PNB BUILDING',
  },
];
