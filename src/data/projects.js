// Project screenshots (src/assets/projects/<project>/). Vite bundles and fingerprints them.
import procure1 from '../assets/projects/procure-clone/1.jpeg';
import procure2 from '../assets/projects/procure-clone/2.jpeg';
import solar1 from '../assets/projects/solar-energy/1.jpeg';
import solar2 from '../assets/projects/solar-energy/2.jpeg';
import solar3 from '../assets/projects/solar-energy/3.jpeg';
import solar4 from '../assets/projects/solar-energy/4.jpeg';
import solar5 from '../assets/projects/solar-energy/5.jpeg';
import renewable1 from '../assets/projects/northern-renewable-centre/1.jpeg';
import renewable2 from '../assets/projects/northern-renewable-centre/2.jpeg';
import northern1 from '../assets/projects/northern-energy/1.jpeg';
import northern2 from '../assets/projects/northern-energy/2.jpeg';

/**
 * Projects shown in the Projects section.
 *
 * To replace a project, edit its fields:
 *  - name, description, tech
 *  - github / live: full URLs. Leave '' to hide-disable that button.
 *  - images: screenshots shown as an auto-playing slider in the project card
 *            (import them from src/assets/projects/ like the ones above).
 *  - image: a single screenshot path in /public (used only when `images` is empty).
 *           Leave both empty to use the built-in illustrated preview (`visual`).
 *  - visual: 'portfolio' | 'board' | 'weather' | 'api'  (only used without screenshots)
 *  - accent: colour for the preview background
 *  - placeholder: true shows a small "Placeholder" badge in development only (npm run dev),
 *                 so you remember to replace it. It never appears in the production build.
 */
export const projects = [
  {
    name: 'Procure Clone',
    description:
      'The site you are looking at: a responsive, animated portfolio built from small reusable components and plain data files, so content can change without touching layout code.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
    github: '',
    live: '',
    images: [procure1, procure2],
    image: '',
    visual: 'portfolio',
    accent: '#9d7cff',
    placeholder: false,
  },
  {
    name: 'Solar Energy',
    description:
      'A kanban-style task board with draggable cards and status filters. Boards are saved through a Node.js and Express.js API to MongoDB.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    github: '',
    live: '',
    images: [solar1, solar2, solar3, solar4, solar5],
    image: '',
    visual: 'board',
    accent: '#e08cff',
    placeholder: true,
  },
  {
    name: 'Northern Renewable Centre',
    description:
      'A clean weather dashboard: search for a city and see current conditions plus a five-day forecast from a public weather API.',
    tech: ['React', 'JavaScript', 'REST API', 'CSS'],
    github: '',
    live: '',
    images: [renewable1, renewable2],
    image: '',
    visual: 'weather',
    accent: '#7fb4ff',
    placeholder: true,
  },
  {
    name: 'Northern Energy',
    description:
      'A small REST API for creating, tagging and searching notes, with input validation and a MongoDB data layer.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: '',
    live: '',
    images: [northern1, northern2],
    image: '',
    visual: 'api',
    accent: '#6ee7b7',
    placeholder: true,
  },
];
