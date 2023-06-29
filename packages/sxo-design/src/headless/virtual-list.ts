/**
 * 虚拟列表逻辑：优化大数据量渲染
 */
export function useVirtualList(options: {
    itemHeight: number;
    totalItems: number;
    containerHeight: number;
    overscan?: number;
}) {
    const overscan = options.overscan ?? 5;
    let scrollTop = 0;

    const calculateRange = (top: number) => {
        const start = Math.floor(top / options.itemHeight);
        const end = Math.ceil((top + options.containerHeight) / options.itemHeight);

        return {
            start: Math.max(0, start - overscan),
            end: Math.min(options.totalItems, end + overscan),
        };
    };

    return {
        getContainerProps: () => ({
            style: {
                height: `${options.containerHeight}px`,
                overflow: 'auto',
                position: 'relative' as const,
            },
            onScroll: (e: any) => {
                scrollTop = e.target.scrollTop;
            },
        }),
        getWrapperProps: () => ({
            style: {
                height: `${options.totalItems * options.itemHeight}px`,
                position: 'relative' as const,
            },
        }),
        getItemProps: (index: number) => ({
            style: {
                position: 'absolute' as const,
                top: 0,
                left: 0,
                width: '100%',
                height: `${options.itemHeight}px`,
                transform: `translateY(${index * options.itemHeight}px)`,
            },
        }),
        getVisibleRange: (top: number = scrollTop) => calculateRange(top),
    };
}
