export interface PaginationOptions {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost' | 'solid';
    rounded?: boolean;
    disabled?: boolean;
}

export function getPaginationClasses(options: PaginationOptions = {}) {
    const { size = 'md', variant = 'outline', rounded = true, disabled = false } = options;

    const sizes = {
        sm: 'h-8 px-2 text-xs min-w-[32px]',
        md: 'h-9 px-3 text-sm min-w-[36px]',
        lg: 'h-11 px-4 text-base min-w-[44px]',
    };

    const variants = {
        outline:
            'border border-slate-200 bg-white hover:border-primary/50 hover:text-primary text-slate-600',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
        solid: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    };

    const activeClasses = 'border-primary text-primary bg-primary/5 font-semibold z-10 ring-2 ring-primary/10';
    const disabledClasses =
        'opacity-40 cursor-not-allowed pointer-events-none bg-slate-50 text-slate-400 border-slate-200';

    return {
        container: `flex items-center gap-1.5 list-none p-0 m-0 select-none ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`,
        item: `inline-flex items-center justify-center transition-all duration-200 cursor-pointer ${sizes[size]} ${variants[variant]} ${rounded ? 'rounded-lg' : ''}`,
        active: activeClasses,
        disabled: disabledClasses,
        jumper: 'flex items-center gap-2 text-sm text-slate-500 ml-4',
        total: 'text-sm text-slate-500 mr-4',
        ellipsis: 'flex items-center justify-center text-slate-400 h-full min-w-[32px]',
    };
}
