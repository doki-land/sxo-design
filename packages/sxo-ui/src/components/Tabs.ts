export interface TabsOptions {
    variant?: 'line' | 'pill';
    size?: 'sm' | 'md' | 'lg';
}

export function getTabsClasses(options: TabsOptions = {}) {
    const { variant = 'line', size = 'md' } = options;

    const sizes = {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
    };

    const listBase = 'flex items-center';
    const listVariants = {
        line: 'border-b border-neutral-200 gap-4',
        pill: 'bg-neutral-100 p-1 rounded-lg gap-1',
    };

    const tabBase =
        'cursor-pointer transition-all duration-200 focus:outline-none whitespace-nowrap';
    const tabVariants = {
        line: {
            active: 'border-b-2 border-primary text-primary font-medium -mb-px',
            inactive: 'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700',
        },
        pill: {
            active: 'bg-white text-primary font-medium shadow-sm rounded-md',
            inactive: 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50 rounded-md',
        },
    };

    return {
        list: `${listBase} ${listVariants[variant]}`,
        tab: (isActive: boolean) =>
            `${tabBase} ${sizes[size]} ${isActive ? tabVariants[variant].active : tabVariants[variant].inactive}`,
        panel: 'mt-4 animate-in fade-in duration-300',
    };
}
