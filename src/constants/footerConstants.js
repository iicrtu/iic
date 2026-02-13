// Footer Component Constants
import mailIcon from '../assets/email.webp';
import phoneIcon from '../assets/telephone.webp';
import locationIcon from '../assets/gps.webp';

export const FOOTER_BRAND = {
  logo: 'https://www.figma.com/api/mcp/asset/05a96098-9b9c-46d0-9588-93e5a41c6574',
  title: 'INNOVATION &\nINCUBATION CELL',
  tagline: 'Empowering the next generation of entrepreneurs through innovation, mentorship, and community.'
};

export const FOOTER_QUICK_LINKS = {
  heading: 'QUICK LINKS',
  links: [
    { text: 'HOME', path: '/' },
    { text: 'ABOUT US', path: '/about' },
    { text: 'EVENTS', path: '/events' },
    { text: 'STARTUPS', path: '/startups' },
    { text: 'INTERNSHIPS', path: '/internships' },
    { text: 'ANNOUCEMENT', path: '/announcements' }
  ]
};

export const FOOTER_CONTACT_INFO = {
  heading: 'CONTACT INFO',
  items: [
    { text: 'ecell@college.edu', type: 'email', icon: mailIcon },
    { text: '+91 12345 67890', type: 'phone', icon: phoneIcon },
    { text: 'PNB Building, RTU', type: 'location', icon: locationIcon }
  ]
};

export const FOOTER_SOCIAL = {
  links: [
    {
      name: 'Instagram',
      icon: 'https://www.figma.com/api/mcp/asset/4d8a7702-8be5-414b-b9de-c3ad7f5aaf2c',
      url: '#',
      alt: 'Instagram'
    },
    {
      name: 'LinkedIn',
      icon: 'https://www.figma.com/api/mcp/asset/f2583708-83ba-49e5-bb0e-5f963c1af527',
      url: '#',
      alt: 'LinkedIn'
    }
  ]
};

export const FOOTER_BOTTOM = {
  divider: 'https://www.figma.com/api/mcp/asset/477013f0-02a9-4304-8204-59a013bc5ce5',
  copyright: '© 2025 E-Cell. All rights reserved.',
  legalLinks: [
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
    { text: 'Cookie Policy', path: '/cookie-policy' }
  ]
};
