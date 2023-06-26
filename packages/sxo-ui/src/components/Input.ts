export interface InputOptions {
  variant?: 'outline' | 'bottom-line' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
}

export function getInputClasses(options: InputOptions = {}) {
  const { variant = 'outline', size = 'md', invalid = false } = options;

  const base =
    'flex w-full transition-all duration-200 bg-transparent px-4 py-2 text-sm placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30';

  const variants = {
    outline: 'border-2 border-primary focus:border-accent-vivid focus:shadow-hard',
    'bottom-line': 'border-b-2 border-primary rounded-none focus:border-accent-vivid',
    ghost: 'border-none bg-neutral-100 focus:bg-white focus:shadow-hard',
  };

  const sizes = {
    sm: 'h-10 text-xs',
    md: 'h-12 text-sm',
    lg: 'h-14 text-base',
  };

  const stateClass = invalid
    ? 'border-accent-vivid text-accent-vivid placeholder:text-accent-vivid/50'
    : 'text-primary';

  return [base, variants[variant], sizes[size], stateClass].join(' ');
}
