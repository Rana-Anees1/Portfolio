/** Fixed ambient backdrop: slow-drifting colour fields and a faint dot grid (theme-aware). */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night">
      <div className="absolute inset-0">
        <div className="ambient-blob -left-[20vw] -top-[25vw] size-[70vw] bg-[radial-gradient(circle,var(--blob-1),transparent_62%)]" />
        <div className="ambient-blob -right-[25vw] top-[20vh] size-[65vw] bg-[radial-gradient(circle,var(--blob-2),transparent_60%)]" />
        <div className="ambient-blob -bottom-[30vw] left-[15vw] size-[60vw] bg-[radial-gradient(circle,var(--blob-3),transparent_62%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
