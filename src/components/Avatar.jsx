import { profile } from '../data/profile';

const sizes = {
  sm: 'size-10 rounded-[14px] text-sm',
  md: 'size-14 rounded-[18px] text-lg',
  lg: 'size-20 rounded-[24px] text-2xl sm:size-24 sm:rounded-[28px] sm:text-3xl',
  xl: 'size-24 rounded-[30px] text-3xl sm:size-32 sm:rounded-[38px]',
};

/**
 * Square profile picture inside a thin liquid-glass frame.
 * Uses the square crop (profile.avatar), falls back to profile.photo, then to initials.
 * The photo is only cropped (object-cover), never stretched or filtered.
 */
export function Avatar({ size = 'md', className = '', alt }) {
  const src = profile.avatar || profile.photo;
  const frame = `glass relative shrink-0 p-[3px] ${sizes[size]} ${className}`;

  if (src) {
    return (
      <span className={frame}>
        <img
          src={src}
          alt={alt ?? profile.name}
          width="400"
          height="400"
          decoding="async"
          className="size-full rounded-[inherit] object-cover object-[50%_30%]"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden bg-[radial-gradient(120%_120%_at_20%_10%,#c9b8ff_0%,#8b5cff_45%,#3b1f7a_100%)] font-display font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_12px_30px_-10px_rgb(124_77_255/0.7)] ${sizes[size]} ${className}`}
      role="img"
      aria-label={profile.name}
    >
      <span aria-hidden="true">{profile.initials}</span>
      <span aria-hidden="true" className="absolute inset-x-2 top-1 h-1/3 rounded-full bg-white/25 blur-md" />
    </span>
  );
}
