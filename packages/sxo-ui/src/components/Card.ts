export interface CardOptions {
    variant?: 'outline' | 'elevated' | 'accent' | 'ghost';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    interactive?: boolean;
}

export function getCardClasses(options: CardOptions = {}) {
    const { variant = 'outline', padding = 'md', rounded = 'xl', interactive = false } = options;

    const base =
        'bg-white text-slate-900 transition-all duration-300 overflow-hidden border border-slate-200/60';

    const variants = {
        outline: 'bg-white',
        elevated: 'shadow-sm hover:shadow-md bg-white border-slate-100',
        accent: 'border-primary/20 shadow-lg shadow-primary/5 bg-gradient-to-br from-white to-primary/5',
        ghost: 'border-none bg-slate-50/50 backdrop-blur-sm',
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
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
        '2xl': 'rounded-[2rem]',
        '3xl': 'rounded-[3rem]',
        full: 'rounded-full',
    };

    const interactiveClass = interactive
        ? 'cursor-pointer hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99]'
        : '';

    return [base, variants[variant], paddings[padding], roundeds[rounded], interactiveClass].join(
        ' ',
    );
}
