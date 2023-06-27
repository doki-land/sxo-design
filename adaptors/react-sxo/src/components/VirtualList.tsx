import { useVirtualList } from '@sxo/design';
import React, { useState, useRef } from 'react';

export interface VirtualListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight?: number;
    overscan?: number;
    children: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({
    items,
    itemHeight,
    containerHeight = 400,
    overscan = 5,
    children,
}: VirtualListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { getContainerProps, getWrapperProps, getItemProps, getVisibleRange } = useVirtualList({
        itemHeight,
        totalItems: items.length,
        containerHeight,
        overscan,
    });

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const { start, end } = getVisibleRange(scrollTop);
    const visibleItems = items.slice(start, end);

    return (
        <div
            {...(getContainerProps() as any)}
            ref={containerRef}
            onScroll={handleScroll}
            className="sxo-virtual-list"
        >
            <div {...(getWrapperProps() as any)}>
                {visibleItems.map((item, index) => {
                    const actualIndex = start + index;
                    return (
                        <div {...(getItemProps(actualIndex) as any)} key={actualIndex}>
                            {children(item, actualIndex)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
