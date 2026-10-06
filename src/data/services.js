import { LuLayers, LuMonitorSmartphone, LuBlocks, LuWrench } from 'react-icons/lu';

export const services = [
  {
    title: 'MERN web applications',
    description: 'Web apps built across the stack: MongoDB for data, Express.js and Node.js on the server, React in the browser.',
    icon: LuLayers,
    tint: 'from-[#9d7cff] to-[#5b3bd6]',
  },
  {
    title: 'Responsive interfaces',
    description: 'React interfaces designed for phones, tablets and large screens rather than just shrinking.',
    icon: LuMonitorSmartphone,
    tint: 'from-[#e08cff] to-[#8a3fd1]',
  },
  {
    title: 'Reusable components',
    description: 'Small, composable pieces that keep a codebase consistent and make new features faster to build.',
    icon: LuBlocks,
    tint: 'from-[#7fb4ff] to-[#4a4fd8]',
  },
  {
    title: 'Maintainable code',
    description: 'Readable structure, clear naming and Git-based workflows that make code easier to work on together.',
    icon: LuWrench,
    tint: 'from-[#c9b8ff] to-[#7553e8]',
  },
];
