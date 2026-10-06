import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { LuCalendar, LuCircleCheck, LuClock } from 'react-icons/lu';
import { experience } from '../data/experience';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { TechList } from '../components/TechBadge';

export function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          title="Work experience"
          description="Where I've put the MERN stack to work so far."
        />

        <ol ref={timelineRef} className="relative mt-14 space-y-10 pl-10 sm:pl-14">
          {/* track + scroll-linked progress line */}
          <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-fg/10 sm:left-[15px]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-iris-soft via-iris to-orchid sm:left-[15px]"
          />

          {experience.map((job) => (
            <li key={job.company + job.start} className="relative">
              <TimelineDot />
              <Reveal>
                <TiltCard as="article" max={2.5} lift={4} className="glass rounded-[28px] p-6 sm:p-9">
                  <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="grid size-14 shrink-0 place-items-center rounded-[18px] bg-fg/[0.06] font-display text-2xl font-semibold text-iris-soft ring-1 ring-fg/10"
                      >
                        {job.company.charAt(0)}
                      </span>
                      <div>
                        <h3 className="text-[1.6rem] font-semibold">{job.role}</h3>
                        <p className="text-lg text-iris-soft">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/[0.06] px-3 py-1.5 text-ink/90">
                        <LuCalendar aria-hidden="true" className="size-3.5 text-mist" />
                        <time>{job.start}</time> – <time>{job.end}</time>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/[0.06] px-3 py-1.5 text-ink/90">
                        <LuClock aria-hidden="true" className="size-3.5 text-mist" />
                        {job.duration}
                      </span>
                    </div>
                  </header>

                  <p className="mt-6 max-w-2xl text-lg text-ink/85">{job.summary}</p>

                  <h4 className="mt-8 font-sans text-sm font-semibold text-mist">What I worked on</h4>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-x-8">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 text-ink/85">
                        <LuCircleCheck aria-hidden="true" className="mt-1 size-[18px] shrink-0 text-iris" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <TechList items={job.tech} className="mt-8" />
                </TiltCard>
              </Reveal>
            </li>
          ))}

          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-1 grid size-6 place-items-center rounded-full border border-dashed border-iris/60 bg-night sm:-left-14 sm:size-8"
            />
            <Reveal className="flex flex-col gap-1 rounded-[24px] border border-dashed border-fg/15 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-medium">What's next</p>
              <p className="text-mist">
                Open to new roles.{' '}
                <a href="#contact" className="font-medium text-iris-soft underline-offset-4 hover:underline">
                  Let's talk
                </a>
              </p>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}

function TimelineDot() {
  return (
    <span aria-hidden="true" className="absolute -left-10 top-8 grid size-6 place-items-center rounded-full bg-night ring-1 ring-iris/50 sm:-left-14 sm:size-8">
      <span className="size-2.5 rounded-full bg-iris shadow-[0_0_14px_#9d7cff]" />
    </span>
  );
}
