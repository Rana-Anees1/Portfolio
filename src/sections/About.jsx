import { LuUser, LuTarget, LuLayers, LuBriefcase, LuSparkles } from 'react-icons/lu';
import { profile } from '../data/profile';
import { Avatar } from '../components/Avatar';
import { Reveal, Stagger, RevealItem } from '../components/Reveal';

const facts = [
  { icon: LuUser, label: 'Role', value: `${profile.role} and ${profile.secondaryRole}`, tint: 'bg-[#7c4dff]' },
  { icon: LuLayers, label: 'Main stack', value: 'MongoDB, Express.js, React, Node.js', tint: 'bg-[#4a7bf0]' },
  { icon: LuTarget, label: 'Focus', value: 'Web apps and responsive UI', tint: 'bg-[#c05bf0]' },
  { icon: LuBriefcase, label: 'Experience', value: `${profile.currentExperience.duration} at ${profile.currentExperience.company}`, tint: 'bg-[#5b3bd6]' },
  { icon: LuSparkles, label: 'Currently', value: profile.availability, tint: 'bg-[#2fb47c]' },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 id="about-title" className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
              About me
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-[36rem] space-y-5 text-lg leading-relaxed text-ink/85">
            <p>
              I'm a MERN stack developer and software engineer. I build web applications with MongoDB, Express.js, React
              and Node.js, and I especially enjoy the front of the stack: the part people actually see and touch.
            </p>
            <p>
              At {profile.currentExperience.company} I spent six months working on existing web projects as part of a
              development team, breaking interfaces into reusable React components, making them responsive and keeping
              the code readable for the next developer. It showed me how much good structure and clear communication
              matter on real codebases.
            </p>
            <p className="text-mist">
              I'm still learning every week, and I like it that way. Right now I'm looking for a team where I can keep
              building thoughtful interfaces and grow as an engineer.
            </p>
          </Reveal>
        </div>

        {/* iOS contact-card style: photo header + grouped list */}
        <Reveal delay={0.15} className="glass h-fit overflow-hidden rounded-[28px] lg:mt-3">
          <div className="flex items-center gap-4 border-b border-fg/[0.07] px-5 py-5 sm:px-6">
            <Avatar size="md" className="size-16! rounded-full!" alt="" />
            <div>
              <p className="font-display text-xl font-semibold leading-tight text-ink">{profile.name}</p>
              <p className="text-[0.95rem] text-mist">
                {profile.role} <span aria-hidden="true">/</span> {profile.secondaryRole}
              </p>
            </div>
          </div>
          <Stagger as="dl" stagger={0.07} className="divide-y divide-fg/[0.07]">
            {facts.map(({ icon: Icon, label, value, tint }) => (
              <RevealItem key={label} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <span className={`grid size-9 shrink-0 place-items-center rounded-[11px] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] ${tint}`}>
                  <Icon aria-hidden="true" className="size-[18px]" />
                </span>
                <dt className="w-28 shrink-0 text-mist">{label}</dt>
                <dd className="min-w-0 flex-1 text-right font-medium text-ink sm:text-left">{value}</dd>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
