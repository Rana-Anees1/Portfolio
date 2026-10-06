import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPython,
} from 'react-icons/si';

const skill = {
  mongodb: { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D', letter: 'M', role: 'Database' },
  express: { name: 'Express.js', icon: SiExpress, color: 'var(--ink)', letter: 'E', role: 'Server framework' },
  react: { name: 'React', icon: SiReact, color: '#3FB8DC', letter: 'R', role: 'User interface' },
  node: { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', letter: 'N', role: 'JavaScript runtime' },
  javascript: { name: 'JavaScript', icon: SiJavascript, color: '#E8C400' },
  html: { name: 'HTML', icon: SiHtml5, color: '#E8643A' },
  css: { name: 'CSS', icon: SiCss, color: '#5A8DEE' },
  tailwind: { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  git: { name: 'Git', icon: SiGit, color: '#F05032' },
  github: { name: 'GitHub', icon: SiGithub, color: 'var(--ink)' },
  python: { name: 'Python', icon: SiPython, color: '#5B9BD5' },
};

/** The four MERN technologies, shown as the featured group in the Skills section. */
export const mernStack = [skill.mongodb, skill.express, skill.react, skill.node];

/**
 * Supporting groups. They describe what each set of tools is for without claiming a skill level.
 */
export const skillGroups = [
  {
    title: 'Frontend',
    description: 'Markup, styling and the language everything else is written in.',
    items: [skill.javascript, skill.html, skill.css, skill.tailwind],
  },
  {
    title: 'Workflow and more',
    description: 'Version control, collaboration and general-purpose scripting.',
    items: [skill.git, skill.github, skill.python],
  },
];

// Icons shown on the two orbit rings in the Skills section.
export const orbitInner = mernStack;
export const orbitOuter = [skill.javascript, skill.html, skill.css, skill.tailwind, skill.git, skill.github];
