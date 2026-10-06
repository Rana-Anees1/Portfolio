import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { Stagger } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="pb-[clamp(5rem,12vw,8.5rem)]">
      <div className="shell">
        <SectionHeading
          id="services-title"
          title="What I do"
          description="The kind of work I enjoy most and can help a team with."
        />

        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map(({ title, description, icon: Icon, tint }) => (
            <TiltCard
              as="li"
              reveal
              key={title}
              className="glass flex flex-col gap-6 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8"
            >
              <span
                aria-hidden="true"
                className={`relative grid size-20 shrink-0 place-items-center rounded-[24px] bg-gradient-to-br ${tint} shadow-[inset_0_2px_0_rgb(255_255_255/0.35),inset_0_-6px_14px_rgb(0_0_0/0.25),0_18px_30px_-12px_rgb(124_77_255/0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105`}
              >
                <Icon className="size-9 text-white drop-shadow-[0_4px_8px_rgb(0_0_0/0.3)]" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-mist">{description}</p>
              </div>
            </TiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
