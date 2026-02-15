// Footer Component Constants
import mailIcon from '../assets/email.webp';
import phoneIcon from '../assets/telephone.webp';
import locationIcon from '../assets/gps.webp';
import logoiic from '../assets/logo.png';
import iglogo from '../assets/instagram-icon.png'
import linkedinlogo from '../assets/linkedin-icon.png'

export const FOOTER_BRAND = {
  logo: logoiic,
  title: 'INNOVATION &\nINCUBATION CELL',
  tagline: 'Empowering the next generation of entrepreneurs through innovation, mentorship, and community.'
};

export const FOOTER_QUICK_LINKS = {
  heading: 'QUICK LINKS',
  links: [
    { text: 'HOME', path: '/' },
    { text: 'ABOUT US', path: '/about' },
    // { text: 'EVENTS', path: '/events' },
    // { text: 'STARTUPS', path: '/startups' },
    { text: 'INTERNSHIPS', path: '/internships' },
    { text: 'ANNOUCEMENT', path: '/announcements' }
  ]
};

export const FOOTER_CONTACT_INFO = {
  heading: 'CONTACT INFO',
  items: [
    { text: 'iic.rtuk@gmail.com', type: 'email', icon: mailIcon },
    { text: '+91 95096 69213', type: 'phone', icon: phoneIcon },
    { text: 'PNB Building, RTU', type: 'location', icon: locationIcon }
  ]
};

export const FOOTER_SOCIAL = {
  links: [
    {
      name: 'Instagram',
      icon: iglogo,
      url: 'https://www.instagram.com/iic_rtu/',
      alt: 'Instagram'
    },
    {
      name: 'LinkedIn',
      icon: linkedinlogo,
      url: 'https://in.linkedin.com/company/iic-rtu',
      alt: 'LinkedIn'
    }
  ]
};

export const FOOTER_BOTTOM = {
  copyright: '© 2025 IIC. All rights reserved.',
  legalLinks: [
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
    // { text: 'Cookie Policy', path: '/cookie-policy' }
  ]
};
