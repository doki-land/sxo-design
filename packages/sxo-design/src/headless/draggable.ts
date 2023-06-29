/**
 * 拖拽逻辑
 */
export function useDraggable(options: { onDrag?: (pos: { x: number; y: number }) => void } = {}) {
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        const event = 'touches' in e ? e.touches[0] : e;
        startPos = {
            x: event.clientX - currentPos.x,
            y: event.clientY - currentPos.y,
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const event = 'touches' in e ? e.touches[0] : e;
        currentPos = {
            x: event.clientX - startPos.x,
            y: event.clientY - startPos.y,
        };
        options.onDrag?.(currentPos);
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
    };

    return {
        getDragProps: () => ({
            onMouseDown: handleMouseDown,
            onTouchStart: handleMouseDown,
            style: { cursor: 'move', userSelect: 'none' as const },
        }),
        position: currentPos,
    };
}
