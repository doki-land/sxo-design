export function useTooltip(options: { delay?: number; defaultOpen?: boolean } = {}) {
    const id = `sxo-tooltip-${Math.random().toString(36).substr(2, 9)}`;
    let timeout: any = null;

    return {
        getTriggerProps: (onOpen: () => void, onClose: () => void) => ({
            'aria-describedby': id,
            onMouseEnter: () => {
                if (options.delay) {
                    timeout = setTimeout(onOpen, options.delay);
                } else {
                    onOpen();
                }
            },
            onMouseLeave: () => {
                if (timeout) clearTimeout(timeout);
                onClose();
            },
            onFocus: onOpen,
            onBlur: onClose,
        }),
        getTooltipProps: () => ({
            id,
            role: 'tooltip',
        }),
    };
}
