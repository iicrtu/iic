// Contact Component Constants
import mailIcon from '../assets/email.webp';
import phoneIcon from '../assets/telephone.webp';
import locationIcon from '../assets/gps.webp';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgwjanb';

export const CONTACT_SECTION = {
  title: 'Get In Touch',
  description: 'Have questions or want to join IIC? We\'d love to hear from you!'
};

export const CONTACT_INFO = {
  subtitle: 'Contact Information',
  text: 'Reach out to us through any of these channels.',
  email: {
    label: 'Email',
    value: 'iicrtu@gmail.com',
    icon: mailIcon
  },
  phone: {
    label: 'Phone',
    value: '+002828737338',
    icon: phoneIcon
  },
  location: {
    label: 'Location',
    value: 'PTP HALL,PNB BUILDING',
    icon: locationIcon
  }
};

export const CONTACT_FORM = {
  subtitle: 'Send us a Message',
  text: 'Fill out the form and we\'ll get back to you soon',
  placeholders: {
    name: 'Name',
    email: 'Email',
    message: 'Tell us about your idea'
  },
  buttonText: 'SEND',
  successMessage: 'Thank you for your message! We will get back to you soon.',
  errorMessage: 'Please fill in all fields'
};

export const SOCIAL_SECTION = {
  subtitle: 'Follow Us',
  text: 'Stay updated with our latest events and activities',
  links: [
    {
      name: 'Instagram',
      url: 'https://instagram.com/iic_rtu',
      alt: 'Instagram'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/iic_rtu/',
      alt: 'LinkedIn'
    },
    {
      name: 'WhatsApp',
      url: '#',
      alt: 'WhatsApp'
    }
  ]
};
