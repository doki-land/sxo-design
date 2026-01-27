export function getDescriptionsClasses() {
    return {
        container: 'w-full overflow-hidden',
        header: 'flex items-center justify-between mb-4',
        title: 'text-base font-bold text-neutral-900',
        extra: 'text-sm',
        body: 'grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 border border-neutral-100 rounded-xl p-6 bg-neutral-50/30',
        item: 'flex flex-col',
        label: 'text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1',
        content: 'text-sm text-neutral-700',
    };
}
