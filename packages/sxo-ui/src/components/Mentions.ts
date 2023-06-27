export interface MentionsOptions {
    size?: 'sm' | 'md' | 'lg';
    status?: 'error' | 'warning' | 'success';
}

export function getMentionsClasses(options: MentionsOptions = {}) {
    const { size = 'md', status } = options;

    const sizes = {
        sm: 'min-h-[32px] text-xs px-2 py-1',
        md: 'min-h-[40px] text-sm px-3 py-1.5',
        lg: 'min-h-[48px] text-base px-4 py-2',
    };

    const statuses = {
        error: 'border-error-500 focus-within:ring-error-500/20',
        warning: 'border-warning-500 focus-within:ring-warning-500/20',
        success: 'border-success-500 focus-within:ring-success-500/20',
    };

    return {
        container: `relative inline-flex flex-wrap w-full border border-neutral-200 bg-white rounded-lg transition-all duration-200 hover:border-primary-500 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 ${sizes[size]} ${status ? statuses[status] : ''}`,
        textarea:
            'w-full bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 resize-none min-h-full',
        dropdown:
            'absolute left-0 bottom-full mb-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] py-1 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200',
        item: 'px-3 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-neutral-50 flex items-center gap-2',
        itemActive: 'bg-primary-50 text-primary-600 font-medium',
        avatar: 'w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-500 font-bold',
    };
}
