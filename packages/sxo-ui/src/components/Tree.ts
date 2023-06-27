export function getTreeClasses() {
    return {
        container: 'w-full space-y-1 select-none',
        node: 'group',
        content:
            'flex items-center px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer',
        contentActive: 'bg-primary-50 text-primary-DEFAULT font-medium',
        expandIcon: 'w-4 h-4 mr-1 text-neutral-400 transition-transform duration-200',
        expandIconOpen: 'rotate-90',
        label: 'text-sm flex-1 truncate',
        children: 'ml-5 mt-1 space-y-1',
        empty: 'text-xs text-neutral-400 p-2 text-center',
    };
}
