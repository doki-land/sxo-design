export interface ButtonOptions {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    loading?: boolean;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function getButtonClasses(options: ButtonOptions = {}) {
    const {
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        rounded = 'md',
    } = options;

    const base =
        'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 select-none active:scale-95 gap-2';

    const variants = {
        primary: 'bg-primary text-white shadow-sm hover:opacity-90 active:scale-95',
        secondary:
            'bg-background-primary text-text-primary border border-neutral-200 shadow-sm hover:bg-background-secondary active:scale-95',
        accent: 'bg-accent-vivid text-white shadow-sm hover:opacity-90 active:scale-95',
        outline:
            'border border-neutral-200 bg-transparent text-text-primary hover:bg-background-secondary active:scale-95',
        ghost: 'bg-transparent hover:bg-background-secondary text-text-muted hover:text-text-primary active:scale-95',
    };

    const sizes = {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
    };

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    const isDisabled = disabled || loading;
    const disabledClass = isDisabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer';

    return {
        container: [base, variants[variant], sizes[size], roundedClasses[rounded], disabledClass].join(
            ' ',
        ),
        spinner: 'animate-spin h-4 w-4',
    };
}
