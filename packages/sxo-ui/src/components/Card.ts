export interface CardOptions {
    variant?: 'outline' | 'elevated' | 'accent' | 'ghost';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    interactive?: boolean;
}

export function getCardClasses(options: CardOptions = {}) {
    const { variant = 'outline', padding = 'md', rounded = 'lg', interactive = false } = options;

    const base =
        'bg-background-primary text-text-primary transition-all duration-300 overflow-hidden border border-neutral-200 hover:shadow-md';

    const variants = {
        outline: 'border-neutral-200 bg-background-primary/80 backdrop-blur-md',
        elevated: 'border-neutral-200 shadow-md bg-background-primary',
        accent: 'border-primary/10 shadow-lg bg-gradient-to-br from-background-primary to-neutral-50',
        ghost: 'border-none bg-neutral-50/50 backdrop-blur-sm',
    };

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
    };

    const roundeds = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
    };

    const interactiveClass = interactive
        ? 'cursor-pointer hover:border-neutral-300 hover:shadow-md active:scale-[0.99]'
        : '';

    return [base, variants[variant], paddings[padding], roundeds[rounded], interactiveClass].join(
        ' ',
    );
}
