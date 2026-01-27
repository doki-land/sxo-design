export interface TreeSelectOptions {
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
}

export function getTreeSelectClasses(options: TreeSelectOptions = {}) {
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
            'absolute top-full left-0 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] p-2 animate-in fade-in zoom-in-95 duration-200',
        treeContainer: 'max-h-[300px] overflow-y-auto',
        empty: 'py-8 text-center text-neutral-400 text-sm',
    };
}
