export interface TagOptions {
  variant?: 'solid' | 'outline' | 'hub';
  color?: 'primary' | 'secondary' | 'neutral';
  rounded?: 'none' | 'sm' | 'md' | 'full';
}

export function getTagClasses(options: TagOptions = {}) {
  const { variant = 'solid', color = 'primary', rounded = 'sm' } = options;

  const base = 'inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wider';

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    full: 'rounded-full',
  };

  const variants = {
    solid: {
      primary: 'bg-primary text-neutral-0',
      secondary: 'bg-secondary text-neutral-0',
      neutral: 'bg-neutral-200 text-neutral-800',
    },
    outline: {
      primary: 'border border-primary text-primary',
      secondary: 'border border-secondary text-secondary',
      neutral: 'border border-neutral-300 text-neutral-600',
    },
    hub: {
      primary: 'bg-primary text-background-primary rounded-sm', // The iconic Hub tag style
      secondary: 'bg-neutral-800 text-neutral-0 rounded-sm',
      neutral: 'bg-neutral-200 text-neutral-800 rounded-sm',
    },
  };

  return [base, roundedClasses[rounded], variants[variant][color]].join(' ');
}
