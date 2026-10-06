# Rana Anees — MERN Stack Developer & Software Engineer Portfolio

A personal portfolio built with **React 19**, **Vite 6**, **Tailwind CSS 4** and **Motion** (the library formerly known as Framer Motion). iOS-inspired liquid glass design with hand-tuned light and dark themes, based on the purple "Portfolio Free Design" reference.

## Quick start

Requires **Node.js 18.18+** (Node 20 or 22 recommended).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the production build locally
```

## Editing your content

All text and links live in `src/data/`. You should not need to touch layout code to update the site.

| File | What it controls |
| --- | --- |
| `profile.js` | Name, roles, hero copy, current experience, availability, **email, GitHub, LinkedIn**, photo and CV |
| `experience.js` | Work history timeline (add another object to add a role) |
| `skills.js` | The featured MERN stack, supporting skill groups and the icons on the orbit |
| `services.js` | "What I do" cards |
| `projects.js` | Projects, tech badges, GitHub / live links, screenshots |
| `navigation.js` | Navbar links |

**Things to replace before you deploy**

1. `profile.js` → `email`, `socials.github`, `socials.linkedin` (currently placeholders).
2. `projects.js` → the three projects marked `placeholder: true`. While running `npm run dev` these show a yellow "Placeholder" badge; the badge never appears in the production build.
3. `projects.js` → add `github` and `live` URLs. Empty links render as disabled buttons.
4. Profile photo: `public/images/rana-anees.jpg` (original file, used in the hero portrait and the social preview) and `public/images/rana-anees-avatar.jpg` (a square crop of the same photo for small circles). To change it, replace both files or point `photo` / `avatar` in `profile.js` at new ones. If both are empty, an "RA" monogram is shown.
5. Optional: put your CV in `public/` and set `resumeUrl` to show a "Download CV" button.
6. `index.html` → set `og:url` to your real domain, and make the `og:image` / `twitter:image` URLs absolute (e.g. `https://your-domain.vercel.app/og-image.png`) so link previews work on LinkedIn and X.

**Project screenshots:** add images to `public/projects/` and set `image: '/projects/name.png'` (16:10 works best). Without an image, each project uses a built-in illustrated preview chosen with `visual: 'portfolio' | 'board' | 'weather' | 'api'`.

## Contact form

There is no backend. Submitting the form validates the fields and opens the visitor's email app with the message pre-filled (a `mailto:` link), and the UI says so. To send messages directly from the site, replace the `sendMessage` function in `src/sections/Contact.jsx` with a call to a form service such as Formspree or EmailJS, or a Vercel serverless function.

## Light and dark mode

- The toggle sits in the navbar (desktop and mobile).
- On a first visit the site follows the operating-system setting, and keeps following it until the visitor chooses.
- The choice is saved in `localStorage` under the key `theme`. An inline script in `index.html` applies it before the page paints, so there is no flash of the wrong theme.
- Switching uses a circular reveal from the toggle (View Transitions API) where supported, a colour cross-fade elsewhere, and an instant switch when "reduce motion" is on.
- All colours are tokens in `src/index.css`: edit the `:root[data-theme='dark']` and `:root[data-theme='light']` blocks.

## Liquid glass

The `glass` utility in `src/index.css` layers a translucent blurred fill, a light rim that is brighter on the top-left edge, and a soft specular highlight that follows the mouse (driven by `src/hooks/useLiquidPointer.js`, one throttled listener for the whole page). `glass-strong` is used for the navbar and overlapping cards, and `glass-code` keeps the code widget dark in both themes. `.liquid-morph` is the slowly morphing glass shape behind the hero portrait and the skills logo; it only animates `border-radius` and `transform`, pauses off-screen in the orbit, and stops completely with reduced motion.

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, Button, TiltCard, Reveal, Avatar, ProjectVisual…
  sections/     One file per page section: Hero, About, Experience, Services, Skills, Projects, Contact
  data/         All editable content
  hooks/        useTheme, useLiquidPointer, useActiveSection (navbar indicator), useScrolled
  App.jsx       Page composition
  index.css     Design tokens (Tailwind @theme), glass utilities, keyframes
public/         favicon.svg, og-image.png, images/ (profile photo)
```

## Design notes

- **Dark palette:** Night `#120b1f`, Dusk `#1d1233`, Ink `#f3eefb`, Mist `#a99fbd`, accent Iris `#9d7cff`.
- **Light palette:** Canvas `#f5f3fa`, Surface `#ffffff`, Ink `#1a1230`, Mist `#5d5571`, accent Iris `#6f4cf6` (deeper so text keeps its contrast).
- **Type:** Bricolage Grotesque for headings, Figtree for body text, Caveat for the single hand-written note in the hero.
- **Motion:** one orchestrated hero entrance, floating hero widgets, a liquid sliding theme switch and nav indicator, scroll reveals per section, a scroll-linked timeline line, pointer-tracking tilt on cards. All animation uses transforms and opacity. Visitors with "reduce motion" enabled get a static page (handled by `MotionConfig reducedMotion="user"` plus CSS media queries), and the orbit animation pauses while off-screen.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.

Or from the terminal: `npm i -g vercel` then `vercel` inside the project folder.
