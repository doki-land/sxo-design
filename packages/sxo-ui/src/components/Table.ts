export interface TableOptions {
    size?: 'sm' | 'md' | 'lg';
    hover?: boolean;
    striped?: boolean;
    border?: boolean;
}

export function getTableClasses(options: TableOptions = {}) {
    const { size = 'md', hover = true, striped = false, border = true } = options;

    const sizes = {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
    };

    return {
        container: `w-full overflow-x-auto ${border ? 'border border-neutral-200 rounded-xl' : ''}`,
        table: 'w-full text-left border-collapse',
        thead: 'bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-10',
        th: `font-bold text-neutral-500 uppercase tracking-wider ${sizes[size]}`,
        tr: `border-b border-neutral-100 transition-colors ${hover ? 'hover:bg-neutral-50/50' : ''}`,
        trSelected: 'bg-primary-50/30',
        trStriped: striped ? 'even:bg-neutral-50/30' : '',
        td: `${sizes[size]} text-neutral-700`,
        pagination:
            'flex items-center justify-between px-4 py-3 border-t border-neutral-100 bg-white',
        empty: 'flex flex-col items-center justify-center py-20 text-neutral-300 gap-2',
        loading:
            'absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20',
    };
}
