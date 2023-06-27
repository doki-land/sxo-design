export interface TagOptions {
    variant?: 'solid' | 'outline' | 'subtle';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
    rounded?: 'none' | 'sm' | 'md' | 'full';
    size?: 'sm' | 'md' | 'lg';
    closable?: boolean;
}

export function getTagClasses(options: TagOptions = {}) {
    const {
        variant = 'solid',
        color = 'primary',
        rounded = 'sm',
        size = 'md',
        closable = false,
    } = options;

    const base = 'inline-flex items-center transition-all duration-300 gap-1.5';

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-lg',
        full: 'rounded-full',
    };

    const sizeClasses = {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };

    const variants = {
        solid: {
            primary: 'bg-primary-500 text-white shadow-sm',
            secondary: 'bg-neutral-800 text-white shadow-sm',
            success: 'bg-success-500 text-white shadow-sm',
            warning: 'bg-warning-500 text-white shadow-sm',
            error: 'bg-error-500 text-white shadow-sm',
            neutral: 'bg-neutral-200 text-neutral-800 shadow-sm',
        },
        outline: {
            primary: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
            secondary: 'border border-neutral-800 text-neutral-800 hover:bg-neutral-50',
            success: 'border border-success-500 text-success-500 hover:bg-success-50',
            warning: 'border border-warning-500 text-warning-500 hover:bg-warning-50',
            error: 'border border-error-500 text-error-500 hover:bg-error-50',
            neutral: 'border border-neutral-300 text-neutral-600 hover:bg-neutral-50',
        },
        subtle: {
            primary: 'bg-primary-50 text-primary-600 border border-primary-100',
            secondary: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
            success: 'bg-success-50 text-success-600 border border-success-100',
            warning: 'bg-warning-50 text-warning-600 border border-warning-100',
            error: 'bg-error-50 text-error-600 border border-error-100',
            neutral: 'bg-neutral-50 text-neutral-500 border border-neutral-100',
        },
    };

    const closeIcon = 'cursor-pointer hover:opacity-70 transition-opacity ml-0.5';

    return {
        base: `${base} ${roundedClasses[rounded]} ${sizeClasses[size]} ${variants[variant][color]}`,
        closeIcon,
    };
}
