import { motion } from 'motion/react';

const variants = {
  primary:
    'bg-ink text-night shadow-[0_10px_30px_-12px_rgb(201_184_255/0.7)] hover:shadow-[0_14px_36px_-10px_rgb(157_124_255/0.85)]',
  glass: 'glass text-ink hover:border-fg/20 hover:bg-fg/10',
};

const sizes = {
  md: 'h-12 px-6 text-[0.95rem]',
  sm: 'h-10 px-4 text-sm',
};

/**
 * Link-styled button. Without an `href` it renders a disabled control,
 * which is how empty project links appear until they are filled in.
 */
export function Button({ href, variant = 'primary', size = 'md', icon: Icon, external, className = '', children, ...rest }) {
  const classes = `inline-flex shrink-0 select-none whitespace-nowrap items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,box-shadow] duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (!href) {
    return (
      <span aria-disabled="true" title="Link coming soon" className={`${classes} cursor-not-allowed opacity-45`}>
        {Icon && <Icon aria-hidden="true" className="size-4" />}
        {children}
      </span>
    );
  }

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <motion.a
      href={href}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...externalProps}
      {...rest}
    >
      {Icon && <Icon aria-hidden="true" className="size-4" />}
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </motion.a>
  );
}

export function IconLink({ href, label, icon: Icon, className = '' }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={`glass grid size-11 place-items-center rounded-full text-mist transition-colors duration-300 hover:border-fg/20 hover:text-ink ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
    >
      <Icon aria-hidden="true" className="size-[18px]" />
    </motion.a>
  );
}
