export interface CascaderOptions {
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
}

export function getCascaderClasses(options: CascaderOptions = {}) {
    const { size = 'md', rounded = true } = options;

    const sizes = {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
    };

    return {
        container: `relative inline-flex items-center w-full transition-all duration-200 border border-neutral-200 bg-white cursor-pointer hover:border-primary-500 ${sizes[size]} ${rounded ? 'rounded-lg' : ''}`,
        input: 'w-full bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap',
        icon: 'text-neutral-400 ml-2 transition-transform duration-200',
        iconOpen: 'rotate-180',
        dropdown:
            'absolute top-full left-0 mt-2 flex bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-200',
        menu: 'min-w-[160px] max-h-[280px] overflow-y-auto border-r border-neutral-100 last:border-r-0 py-1',
        menuItem:
            'flex items-center justify-between px-3 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-neutral-50 transition-colors',
        menuItemActive: 'text-primary-600 font-medium bg-primary-50/50',
        menuItemDisabled: 'opacity-40 cursor-not-allowed pointer-events-none',
        expandIcon: 'text-[10px] text-neutral-400',
    };
}
