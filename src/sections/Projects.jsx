import { FaGithub } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';
import { projects } from '../data/projects';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { TechList } from '../components/TechBadge';
import { Button } from '../components/Button';
import { ProjectVisual } from '../components/ProjectVisual';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          title="Selected projects"
          description="Personal projects I've built. Each one links to the code and, where available, a live version."
        />

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {projects.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} reversed={index % 2 === 1} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index, reversed, featured }) {
  const titleId = `project-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <article aria-labelledby={titleId} className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-0">
      <Reveal className={`lg:col-span-7 lg:row-start-1 ${reversed ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
        <TiltCard max={4} lift={4} className="rounded-[24px]">
          <ProjectVisual project={project} slideDelay={index * 900} />
        </TiltCard>
      </Reveal>

      <Reveal
        delay={0.12}
        className={`relative z-10 lg:col-span-6 lg:row-start-1 ${reversed ? 'lg:col-start-1' : 'lg:col-start-7'}`}
      >
        <div className="glass-strong rounded-[28px] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-mist">
            {featured && <span className="rounded-full bg-iris/15 px-2.5 py-1 font-medium text-iris-soft">Featured</span>}
            {import.meta.env.DEV && project.placeholder && (
              <span className="rounded-full border border-dashed border-warn/50 px-2.5 py-1 text-warn">
                Placeholder: edit src/data/projects.js
              </span>
            )}
          </div>
          <h3 id={titleId} className="mt-3 text-[clamp(1.6rem,3vw,2.1rem)] font-semibold">
            {project.name}
          </h3>
          <p className="mt-3 text-ink/80">{project.description}</p>
          <TechList items={project.tech} className="mt-6" />
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={project.live} size="sm" icon={LuExternalLink} external>
              Live demo
            </Button>
            <Button href={project.github} size="sm" variant="glass" icon={FaGithub} external>
              GitHub
            </Button>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
