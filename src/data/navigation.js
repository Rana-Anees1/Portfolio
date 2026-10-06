export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// Sections observed for the active-link indicator ("home" clears it at the top).
export const observedSections = ['home', ...navItems.map((item) => item.id)];
