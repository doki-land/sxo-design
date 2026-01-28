export interface CardOptions {
    variant?: 'outline' | 'elevated' | 'accent' | 'ghost';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    interactive?: boolean;
}

export function getCardClasses(options: CardOptions = {}) {
    const { variant = 'outline', padding = 'md', rounded = 'lg', interactive = false } = options;

    const base =
        'bg-background-primary text-text-primary transition-all duration-300 overflow-hidden border border-neutral-200/60';

    const variants = {
        outline: 'bg-white/80 backdrop-blur-md',
        elevated: 'shadow-sm hover:shadow-md bg-white border-neutral-100',
        accent: 'border-primary/20 shadow-lg shadow-primary/5 bg-gradient-to-br from-white to-primary/5',
        ghost: 'border-none bg-neutral-100/50 backdrop-blur-sm',
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
