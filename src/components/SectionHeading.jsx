import { Reveal } from './Reveal';

export function SectionHeading({ id, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      <h2 id={id} className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold text-ink">
        {title}
      </h2>
      {description && <p className="max-w-xl text-lg text-mist">{description}</p>}
    </Reveal>
  );
}
