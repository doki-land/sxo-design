export interface TableOptions {
    size?: 'sm' | 'md' | 'lg';
    hover?: boolean;
    striped?: boolean;
    border?: boolean;
    loading?: boolean;
}

export function getTableClasses(options: TableOptions = {}) {
    const { size = 'md', hover = true, striped = false, border = true, loading = false } = options;

    const sizes = {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
    };

    return {
        container: `w-full overflow-x-auto relative ${border ? 'border border-neutral-200/60 rounded-2xl shadow-sm bg-white' : ''}`,
        table: `w-full text-left border-collapse ${loading ? 'opacity-50 pointer-events-none' : ''}`,
        thead: 'bg-neutral-50/50 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-10',
        th: `font-bold text-neutral-400 text-[11px] uppercase tracking-widest ${sizes[size]}`,
        tr: `border-b border-neutral-50 transition-colors ${hover ? 'hover:bg-neutral-50/30' : ''}`,
        trSelected: 'bg-primary/5',
        trStriped: striped ? 'even:bg-neutral-50/20' : '',
        td: `${sizes[size]} text-neutral-600 font-medium`,
        pagination:
            'flex items-center justify-between px-6 py-4 border-t border-neutral-50 bg-white/50',
        empty: 'flex flex-col items-center justify-center py-24 text-neutral-300 gap-3',
        loading:
            'absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-20 transition-all duration-300',
        spinner: 'animate-spin h-8 w-8 text-primary',
    };
}
