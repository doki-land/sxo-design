export interface DatePickerOptions {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost' | 'bottom-line';
    rounded?: boolean;
}

export function getDatePickerClasses(options: DatePickerOptions = {}) {
    const { size = 'md', variant = 'outline', rounded = true } = options;

    const sizes = {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
    };

    const variants = {
        outline:
            'border border-neutral-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 bg-white',
        ghost: 'border-transparent bg-neutral-100 hover:bg-neutral-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500/20',
        'bottom-line':
            'border-b border-neutral-200 rounded-none focus-within:border-primary-500 px-0 bg-transparent',
    };

    return {
        container: `relative inline-flex items-center w-full transition-all duration-200 ${sizes[size]} ${variants[variant]} ${rounded ? 'rounded-lg' : ''}`,
        input: 'w-full bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 cursor-pointer',
        icon: 'text-neutral-400 ml-2',
        panel: 'absolute top-full left-0 mt-2 p-4 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] min-w-[280px] animate-in fade-in zoom-in-95 duration-200',
        header: 'flex items-center justify-between mb-4',
        headerButton: 'p-1 hover:bg-neutral-100 rounded-md transition-colors text-neutral-500',
        headerTitle: 'text-sm font-semibold text-neutral-900 cursor-pointer hover:text-primary-600',
        grid: 'grid grid-cols-7 gap-1',
        weekday: 'text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center py-2',
        day: 'h-8 w-8 flex items-center justify-center text-xs rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary-50 hover:text-primary-600',
        dayToday: 'border border-primary-200 text-primary-600 font-bold',
        daySelected: 'bg-primary-500 text-white font-bold hover:bg-primary-600 hover:text-white',
        dayOutside: 'text-neutral-300',
        footer: 'mt-4 pt-4 border-t border-neutral-100 flex justify-between items-center',
    };
}
