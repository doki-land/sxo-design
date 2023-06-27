export interface InputOptions {
    variant?: 'outline' | 'bottom-line' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
}

export function getInputClasses(options: InputOptions = {}) {
    const { size = 'md', variant = 'outline', invalid = false } = options;

    const base =
        'w-full transition-all duration-200 outline-none font-normal placeholder:text-text-muted bg-transparent';

    const variants = {
        outline:
            'bg-background-primary border border-neutral-200 rounded-md px-3 focus:border-primary focus:shadow-hard-accent',
        'bottom-line':
            'bg-transparent border-t-0 border-x-0 border-b border-neutral-200 rounded-none px-0 focus:border-primary',
        ghost: 'bg-secondary border border-transparent rounded-md px-3 focus:bg-background-primary focus:border-neutral-200',
    };

    const sizes = {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
    };

    const stateClass = invalid
        ? 'border-error text-error focus:border-error placeholder:text-error/50'
        : 'text-text-primary';

    return [base, variants[variant], sizes[size], stateClass].join(' ');
}
