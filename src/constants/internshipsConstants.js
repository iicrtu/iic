// Internships Page Constants

export const INTERNSHIPS_HERO = {
  title: 'INTERNSHIPS',
  description: 'Explore exciting internship opportunities from top companies. Find your perfect match and kickstart your career!'
};

export const ACTION_BUTTONS = [
  { label: 'DOWNLOAD BROCHURE', type: 'primary' },
  /*{ label: 'DOWNLOAD BROUCHER', type: 'secondary' },*/
  { label: 'RESUME TEMPLATE', type: 'tertiary' },
  /*{ label: 'REGISTER AS COMPANY', type: 'gradient' }*/
];

export const STATS = [
  { value: '10', label: 'companies' },
  { value: '60+', label: 'Positions' },
  { value: '100+', label: 'Applications' },
  { value: '10', label: 'Companies' },

      
];

/**
 * @deprecated Internships are now fetched from the API (GET /api/internships/public).
 * This static data is kept only as a reference / fallback and should NOT be used.
 */
export const INTERNSHIPS_DATA = [];

export const LABELS = {
  moreInfoBtn: 'MORE INFO'
};