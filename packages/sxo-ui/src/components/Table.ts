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
        container: `w-full overflow-x-auto relative ${border ? 'border border-slate-200/60 rounded-2xl shadow-sm bg-white' : ''}`,
        table: `w-full text-left border-collapse ${loading ? 'opacity-50 pointer-events-none' : ''}`,
        thead: 'bg-slate-50/50 border-b border-slate-200 sticky top-0 z-10',
        th: `font-semibold text-slate-500 text-xs tracking-tight ${sizes[size]}`,
        tr: `border-b border-slate-100 transition-colors ${hover ? 'hover:bg-slate-50/50' : ''}`,
        trSelected: 'bg-primary/5',
        trStriped: striped ? 'even:bg-slate-50/20' : '',
        td: `text-sm text-slate-700 leading-relaxed ${sizes[size]}`,
        pagination: 'mt-6 flex items-center justify-between px-2 text-slate-500',
        empty: 'flex flex-col items-center justify-center py-24 text-neutral-300 gap-3',
        loading:
            'absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-20 transition-all duration-300',
        spinner: 'animate-spin h-8 w-8 text-primary',
    };
}
