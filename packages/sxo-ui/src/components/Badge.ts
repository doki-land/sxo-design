export interface BadgeOptions {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'neon';
    size?: 'sm' | 'md';
}

export function getBadgeClasses(options: BadgeOptions = {}) {
    const { variant = 'primary', size = 'md' } = options;

    const base =
        'inline-flex items-center font-black uppercase tracking-[0.1em] transition-all duration-300 select-none rounded-md';

    const variants = {
        primary: 'bg-primary text-primary-foreground shadow-sm',
        secondary: 'bg-background-secondary text-text-muted',
        accent: 'bg-accent-vivid text-white shadow-md shadow-accent-vivid/20',
        neon: 'bg-accent-neon text-black font-black shadow-[0_0_15px_rgba(var(--sxo-color-accent-neon-rgb),0.4)]',
        success: 'bg-success text-success-foreground',
        error: 'bg-error text-error-foreground',
        outline: 'border-2 border-neutral-100 text-text-muted hover:border-neutral-200',
    };

    const sizes = {
        sm: 'px-2.5 py-1 text-[10px]',
        md: 'px-3 py-1 text-[11px]',
    };

    return [base, variants[variant], sizes[size]].join(' ');
}
