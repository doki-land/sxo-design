export interface DropdownOptions {
    placement?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center';
    disabled?: boolean;
}

export function getDropdownClasses(options: DropdownOptions = {}) {
    const { placement = 'bottom-left', disabled = false } = options;

    const container = 'relative inline-block';
    const menu =
        'absolute z-[200] min-w-[180px] py-2 mt-1.5 bg-neutral-0 border border-neutral-100 shadow-md rounded-lg overflow-hidden focus:outline-none';

    const placements = {
        'bottom-left': 'top-full left-0',
        'bottom-right': 'top-full right-0',
        'bottom-center': 'top-full left-1/2 -translate-x-1/2',
        'top-left': 'bottom-full left-0 mb-1.5',
        'top-right': 'bottom-full right-0 mb-1.5',
        'top-center': 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    };

    const disabledClass = disabled ? 'opacity-50 pointer-events-none' : '';

    return {
        container: [container, disabledClass].join(' '),
        menu: [menu, placements[placement]].join(' '),
        item: 'flex items-center w-full px-4 py-3 text-[15px] text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer leading-tight',
        itemActive: 'bg-neutral-50 text-primary font-medium',
        itemDisabled: 'opacity-40 cursor-not-allowed hover:bg-transparent',
        divider: 'my-1.5 border-t border-neutral-100',
        header: 'px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider',
    };
}
