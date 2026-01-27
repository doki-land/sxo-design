export interface StepsOptions {
    direction?: 'horizontal' | 'vertical';
}

export function getStepsClasses(options: StepsOptions = {}) {
    const { direction = 'horizontal' } = options;

    const container = direction === 'horizontal' ? 'flex w-full' : 'flex flex-col';

    return {
        container,
        item: ['flex flex-1 group', direction === 'horizontal' ? 'items-center' : 'flex-col'].join(
            ' ',
        ),
        head: 'flex items-center',
        line: [
            'flex-1 transition-colors duration-300',
            direction === 'horizontal' ? 'h-[1px] mx-4' : 'w-[1px] h-full ml-[15px] my-2',
        ].join(' '),
        linePending: 'bg-neutral-200',
        lineCompleted: 'bg-primary-DEFAULT',
        icon: [
            'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300',
            'group-last:hidden',
        ].join(' '),
        iconContainer: 'relative flex items-center justify-center w-8 h-8',
        iconPending: 'border-neutral-300 text-neutral-400 bg-white',
        iconProcess: 'border-primary-DEFAULT text-white bg-primary-DEFAULT shadow-md',
        iconCompleted: 'border-primary-DEFAULT text-primary-DEFAULT bg-white',
        content:
            direction === 'horizontal'
                ? 'mt-2 flex flex-col'
                : 'ml-4 flex flex-col pb-8 group-last:pb-0',
        title: 'text-sm font-bold transition-colors duration-300',
        titlePending: 'text-neutral-400',
        titleProcess: 'text-neutral-900',
        titleCompleted: 'text-neutral-500',
        description: 'text-xs text-neutral-400 mt-1',
    };
}
