export interface DividerOptions {
    direction?: 'horizontal' | 'vertical';
    type?: 'solid' | 'dashed' | 'dotted';
    contentPlacement?: 'left' | 'center' | 'right';
}

export function getDividerClasses(options: DividerOptions = {}) {
    const { direction = 'horizontal', type = 'solid', contentPlacement = 'center' } = options;

    const base = 'bg-neutral-200';

    if (direction === 'vertical') {
        return {
            container: [
                base,
                'inline-block w-[1px] h-[1em] mx-2 align-middle',
                type === 'dashed'
                    ? 'border-l border-dashed'
                    : type === 'dotted'
                      ? 'border-l border-dotted'
                      : '',
            ].join(' '),
            text: '',
        };
    }

    const horizontalBase = 'flex items-center my-4';
    const lineBase = [
        'flex-1 h-[1px]',
        base,
        type === 'dashed'
            ? 'bg-transparent border-t border-dashed'
            : type === 'dotted'
              ? 'bg-transparent border-t border-dotted'
              : '',
    ].join(' ');

    return {
        container: horizontalBase,
        lineLeft: contentPlacement === 'left' ? 'w-8' : 'flex-1',
        lineRight: contentPlacement === 'right' ? 'w-8' : 'flex-1',
        line: lineBase,
        text: 'px-4 text-sm text-neutral-500 font-medium whitespace-nowrap',
    };
}
