export interface PopoverOptions {
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export function getPopoverClasses(options: PopoverOptions = {}) {
    const { placement = 'top' } = options;

    const container = 'relative inline-block';
    const content =
        'absolute z-[200] bg-white border border-neutral-200 shadow-xl rounded-xl p-4 min-w-[200px] focus:outline-none transition-all duration-200';

    const placements = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrow = 'absolute w-2 h-2 bg-white border border-neutral-200 rotate-45';
    const arrowPlacements = {
        top: 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0',
        bottom: 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0',
        left: 'right-[-5px] top-1/2 -translate-y-1/2 border-b-0 border-l-0',
        right: 'left-[-5px] top-1/2 -translate-y-1/2 border-t-0 border-r-0',
    };

    return {
        container,
        content: [content, placements[placement]].join(' '),
        arrow: [arrow, arrowPlacements[placement]].join(' '),
        title: 'text-sm font-bold text-neutral-900 mb-1',
        description: 'text-sm text-neutral-500 leading-relaxed',
    };
}
