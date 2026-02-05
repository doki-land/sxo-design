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
        'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 select-none active:scale-95 gap-2 outline-none focus:outline-none';

    const variants = {
        primary: 'bg-primary text-white shadow-sm hover:bg-primary/90 active:scale-[0.98]',
        secondary:
            'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 active:scale-[0.98]',
        accent: 'bg-accent-vivid text-white shadow-sm hover:opacity-90 active:scale-[0.98]',
        outline:
            'border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]',
        ghost: 'bg-transparent hover:bg-slate-100/50 text-slate-500 hover:text-slate-900 active:scale-[0.98]',
    };

    const sizes = {
        xs: 'h-7 px-2.5 text-[11px]',
        sm: 'h-8.5 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
    };

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
    };

    const isDisabled = disabled || loading;
    const disabledClass = isDisabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer';

    return {
        container: [
            base,
            variants[variant],
            sizes[size],
            roundedClasses[rounded],
            disabledClass,
        ].join(' '),
        spinner: 'animate-spin h-4 w-4',
    };
}
