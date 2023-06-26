export interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function getButtonClasses(options: ButtonOptions = {}) {
  const { variant = 'primary', size = 'md', disabled = false, rounded = 'md' } = options;

  const base =
    'inline-flex items-center justify-center font-bold transition duration-200 select-none uppercase tracking-widest';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-accent-vivid shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-neutral-800 shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none',
    accent:
      'bg-accent-vivid text-white hover:bg-accent-neon hover:text-black shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline:
      'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none',
    ghost: 'bg-transparent hover:bg-neutral-100 text-primary',
  };

  const sizes = {
    xs: 'h-8 px-3 text-[10px]',
    sm: 'h-10 px-4 text-xs',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
    xl: 'h-16 px-10 text-lg',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const disabledClass = disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer';

  return [base, variants[variant], sizes[size], roundedClasses[rounded], disabledClass].join(' ');
}
