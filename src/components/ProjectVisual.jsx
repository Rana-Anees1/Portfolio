import { LuSun, LuCloudSun, LuSearch } from 'react-icons/lu';
import { ProjectSlider } from './ProjectSlider';

/**
 * Preview area of a project card.
 * - `project.images`: screenshots shown in an auto-playing slider inside the browser-window frame.
 * - `project.image`: a single screenshot.
 * - neither: an illustrated, purely decorative preview (hidden from assistive technology).
 */
export function ProjectVisual({ project, slideDelay = 0 }) {
  const { accent } = project;
  const hasSlides = Array.isArray(project.images) && project.images.length > 0;

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-fg/10 bg-dusk"
      style={{ '--accent': accent }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(120% 90% at 85% 0%, ${accent}55, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${accent}26, transparent 60%)`,
        }}
      />

      {!hasSlides && project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          loading="lazy"
          className="absolute inset-[6%] h-[88%] w-[88%] rounded-xl object-cover object-top shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <div
          aria-hidden={hasSlides ? undefined : 'true'}
          className={`absolute bottom-0 flex flex-col ${hasSlides ? 'inset-x-[4%] top-[8%]' : 'inset-x-[7%] top-[9%]'} overflow-hidden rounded-t-2xl border border-b-0 border-fg/10 bg-[var(--mock-bg)] shadow-[0_-20px_60px_-24px_rgb(30_15_70/0.45)] transition-transform duration-700 ease-[var(--ease-ios)] group-hover:-translate-y-2`}
        >
          <div aria-hidden="true" className="flex items-center gap-2 border-b border-fg/[0.07] px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff6b6b]/80" />
            <span className="size-2.5 rounded-full bg-[#ffd166]/80" />
            <span className="size-2.5 rounded-full bg-[#6ee7b7]/80" />
            <span className="ml-3 h-4 w-1/3 rounded-full bg-fg/[0.06]" />
          </div>
          {hasSlides ? (
            <div className="min-h-0 flex-1">
              <ProjectSlider images={project.images} name={project.name} delay={slideDelay} />
            </div>
          ) : (
            <div className="min-h-0 flex-1 p-[5%]">{renderScene(project.visual)}</div>
          )}
        </div>
      )}
    </div>
  );
}

function renderScene(visual) {
  switch (visual) {
    case 'board':
      return <BoardScene />;
    case 'weather':
      return <WeatherScene />;
    case 'api':
      return <ApiScene />;
    default:
      return <PortfolioScene />;
  }
}

const Bar = ({ className = '' }) => <div className={`h-2 rounded-full bg-fg/10 ${className}`} />;

function PortfolioScene() {
  return (
    <div className="flex h-full flex-col gap-[6%]">
      <div className="mx-auto flex w-2/3 items-center justify-between rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-1.5">
        <span className="size-3 rounded bg-[var(--accent)]" />
        <div className="flex gap-2">
          <Bar className="w-6" />
          <Bar className="w-6" />
          <Bar className="w-6" />
        </div>
      </div>
      <div className="flex flex-1 items-start gap-[6%]">
        <div className="flex flex-1 flex-col gap-2.5 pt-[4%]">
          <div className="size-8 rounded-xl bg-[var(--accent)]/70" />
          <div className="h-4 w-4/5 rounded-full bg-fg/25" />
          <div className="h-4 w-3/5 rounded-full bg-fg/25" />
          <Bar className="w-11/12" />
          <Bar className="w-3/4" />
          <div className="mt-1 flex gap-2">
            <div className="h-5 w-16 rounded-full bg-fg/70" />
            <div className="h-5 w-16 rounded-full border border-fg/15" />
          </div>
        </div>
        <div className="relative grid aspect-square w-[34%] place-items-center">
          <div className="absolute inset-0 rounded-full border border-fg/10" />
          <div className="absolute inset-[18%] rounded-full border border-fg/10" />
          <div className="size-[30%] rounded-2xl bg-[var(--accent)] shadow-[0_0_40px_var(--accent)]" />
        </div>
      </div>
    </div>
  );
}

function BoardScene() {
  const columns = [3, 2, 2];
  return (
    <div className="grid h-full grid-cols-3 gap-[4%]">
      {columns.map((count, col) => (
        <div key={col} className="flex flex-col gap-2 rounded-xl bg-fg/[0.035] p-2">
          <div className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${col === 0 ? 'bg-[var(--accent)]' : col === 1 ? 'bg-[#ffd166]' : 'bg-[#6ee7b7]'}`} />
            <Bar className="w-1/2" />
          </div>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1.5 rounded-lg border border-fg/[0.07] bg-fg/[0.05] p-2 ${
                col === 1 && i === 0 ? '-rotate-3 border-[var(--accent)]/50 shadow-lg' : ''
              }`}
            >
              <Bar className="w-5/6 bg-fg/20" />
              <Bar className="w-1/2" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function WeatherScene() {
  const days = [62, 46, 74, 56, 40];
  return (
    <div className="flex h-full flex-col gap-[5%]">
      <div className="flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-1.5 text-fg/40">
        <LuSearch className="size-3" />
        <Bar className="w-1/4" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-[clamp(1.5rem,5vw,2.75rem)] font-semibold leading-none text-fg/90">24°</div>
          <Bar className="mt-2 w-20" />
        </div>
        <LuSun className="size-[clamp(2rem,7vw,3.5rem)] text-[#ffd166]" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-5 items-end gap-2">
        {days.map((height, i) => (
          <div key={i} className="flex h-full flex-col items-center justify-end gap-1.5">
            <LuCloudSun className="size-3 shrink-0 text-fg/40" />
            <div className="w-full shrink-0 rounded-md bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)]" style={{ height: `${height}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiScene() {
  const routes = [
    ['GET', '/notes'],
    ['POST', '/notes'],
    ['PATCH', '/notes/:id'],
    ['DELETE', '/notes/:id'],
  ];
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-[5%] font-mono text-[clamp(0.5rem,1.3vw,0.75rem)]">
      <ul className="flex flex-col gap-2">
        {routes.map(([method, path], i) => (
          <li
            key={method + path}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${i === 1 ? 'bg-fg/[0.07] ring-1 ring-[var(--accent)]/40' : ''}`}
          >
            <span className="font-semibold text-[var(--accent)]">{method}</span>
            <span className="truncate text-fg/55">{path}</span>
          </li>
        ))}
      </ul>
      <pre className="overflow-hidden rounded-xl bg-fg/[0.05] p-3 leading-relaxed text-fg/60">
        <span className="text-fg/35">{'{'}</span>
        {'\n  '}
        <span className="text-iris-soft">"title"</span>: <span className="text-mint">"Ideas"</span>,
        {'\n  '}
        <span className="text-iris-soft">"tags"</span>: [<span className="text-mint">"ui"</span>],
        {'\n  '}
        <span className="text-iris-soft">"pinned"</span>: <span className="text-warn">true</span>
        {'\n'}
        <span className="text-fg/35">{'}'}</span>
      </pre>
    </div>
  );
}
