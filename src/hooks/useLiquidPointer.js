import { useEffect } from 'react';

/**
 * One delegated, rAF-throttled pointer listener for the whole page.
 * It writes the pointer position (as %) into --mx / --my on the glass surface
 * under the cursor, which moves that surface's specular highlight.
 * Mouse only, so touch devices do no extra work.
 */
export function useLiquidPointer() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frame = 0;
    let lastEvent = null;

    const update = () => {
      frame = 0;
      const event = lastEvent;
      const target = event?.target instanceof Element ? event.target.closest('.glass') : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    const onMove = (event) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
