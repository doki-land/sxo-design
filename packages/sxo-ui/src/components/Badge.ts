export interface BadgeOptions {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'neon';
  size?: 'sm' | 'md';
}

export function getBadgeClasses(options: BadgeOptions = {}) {
  const { variant = 'primary', size = 'md' } = options;

  const base =
    'inline-flex items-center font-bold uppercase tracking-widest transition-colors select-none';

  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent-vivid text-white',
    neon: 'bg-accent-neon text-black',
    outline: 'border-2 border-primary text-primary',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[8px]',
    md: 'px-2.5 py-1 text-[10px]',
  };

  return [base, variants[variant], sizes[size]].join(' ');
}
