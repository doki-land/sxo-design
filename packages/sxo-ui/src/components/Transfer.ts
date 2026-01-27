export interface TransferOptions {
    size?: 'sm' | 'md' | 'lg';
}

export function getTransferClasses(options: TransferOptions = {}) {
    const { size = 'md' } = options;

    const sizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return {
        container: `flex items-center gap-4 ${sizes[size]}`,
        list: 'flex flex-col w-64 h-80 border border-neutral-200 rounded-xl bg-white overflow-hidden shadow-sm',
        header: 'flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/50',
        headerTitle: 'font-semibold text-neutral-900',
        headerCount: 'text-xs text-neutral-400 font-normal',
        search: 'p-2 border-b border-neutral-100',
        body: 'flex-1 overflow-y-auto p-1',
        item: 'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-neutral-50 group',
        itemSelected: 'bg-primary-50/50',
        itemDisabled: 'opacity-40 cursor-not-allowed grayscale',
        itemLabel: 'flex-1 text-neutral-700 group-hover:text-primary-600 transition-colors',
        actions: 'flex flex-col gap-2',
        actionButton:
            'flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:border-primary-500 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm',
        footer: 'px-4 py-2 border-t border-neutral-100 text-xs text-neutral-400 bg-neutral-50/50',
        empty: 'flex flex-col items-center justify-center h-full text-neutral-300 gap-2',
    };
}
