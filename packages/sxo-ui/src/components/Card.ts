export interface CardOptions {
  variant?: 'outline' | 'elevated' | 'accent' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function getCardClasses(options: CardOptions = {}) {
  const { variant = 'outline', padding = 'md', interactive = false } = options;

  const base = 'bg-white transition-all duration-300 overflow-hidden';

  const variants = {
    outline: 'border-2 border-primary',
    elevated: 'border-2 border-primary shadow-hard',
    accent: 'border-2 border-accent-vivid shadow-hard',
    ghost: 'border-none bg-neutral-50',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const interactiveClass = interactive
    ? 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none'
    : '';

  return [base, variants[variant], paddings[padding], interactiveClass].join(' ');
}
