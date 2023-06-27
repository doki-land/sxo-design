export interface DropdownOptions {
    placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export function getDropdownClasses(options: DropdownOptions = {}) {
    const { placement = 'bottom-left' } = options;

    const container = 'relative inline-block';
    const menu =
        'absolute z-[200] min-w-[160px] py-1 mt-2 bg-white border border-neutral-200 shadow-xl rounded-xl overflow-hidden focus:outline-none';

    const placements = {
        'bottom-left': 'top-full left-0',
        'bottom-right': 'top-full right-0',
        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2',
    };

    return {
        container,
        menu: [menu, placements[placement]].join(' '),
        item: 'flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer',
        itemActive: 'bg-neutral-50 text-neutral-900 font-medium',
        itemDisabled: 'opacity-40 cursor-not-allowed hover:bg-transparent',
        divider: 'my-1 border-t border-neutral-100',
        header: 'px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider',
    };
}
