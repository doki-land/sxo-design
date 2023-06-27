export interface TimelineOptions {
    mode?: 'left' | 'alternate' | 'right';
}

export function getTimelineClasses(options: TimelineOptions = {}) {
    const { mode = 'left' } = options;

    return {
        container: 'flex flex-col gap-0',
        item: 'relative flex gap-4 pb-8 last:pb-0',
        tail: 'absolute left-[9px] top-[22px] bottom-0 w-[2px] bg-neutral-100 last:hidden',
        dot: 'relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-2 border-white bg-primary-DEFAULT shadow-sm mt-1',
        content: 'flex-1 pt-0.5',
        label: 'text-xs text-neutral-400 mb-1',
        title: 'text-sm font-bold text-neutral-900',
        description: 'text-sm text-neutral-500 mt-1',
    };
}
