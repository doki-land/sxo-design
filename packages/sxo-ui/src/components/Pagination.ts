export interface PaginationOptions {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost' | 'solid';
    rounded?: boolean;
}

export function getPaginationClasses(options: PaginationOptions = {}) {
    const { size = 'md', variant = 'outline', rounded = true } = options;

    const sizes = {
        sm: 'h-8 px-2 text-xs min-w-[32px]',
        md: 'h-10 px-3 text-sm min-w-[40px]',
        lg: 'h-12 px-4 text-base min-w-[48px]',
    };

    const variants = {
        outline:
            'border border-neutral-200 bg-white hover:border-primary-500 hover:text-primary-600 text-neutral-600',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-600',
        solid: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800',
    };

    const activeClasses = 'border-primary-500 text-primary-600 bg-primary-50 font-medium z-10';
    const disabledClasses =
        'opacity-50 cursor-not-allowed pointer-events-none bg-neutral-50 text-neutral-400 border-neutral-200';

    return {
        container: 'flex items-center gap-1 list-none p-0 m-0 select-none',
        item: `inline-flex items-center justify-center transition-all duration-200 cursor-pointer ${sizes[size]} ${variants[variant]} ${rounded ? 'rounded-lg' : ''}`,
        active: activeClasses,
        disabled: disabledClasses,
        jumper: 'flex items-center gap-2 text-sm text-neutral-500 ml-4',
        total: 'text-sm text-neutral-500 mr-4',
        ellipsis: 'flex items-center justify-center text-neutral-400 h-full min-w-[32px]',
    };
}
