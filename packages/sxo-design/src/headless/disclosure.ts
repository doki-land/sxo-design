import type { PopoverOptions } from './types';

export function useDisclosure(options: PopoverOptions = {}) {
    let isOpen = options.isOpen ?? options.defaultOpen ?? false;
    const id = options.id ?? `sxo-disclosure-${Math.random().toString(36).substr(2, 9)}`;

    return {
        isOpen,
        open: () => {
            isOpen = true;
        },
        close: () => {
            isOpen = false;
            options.onClose?.();
        },
        toggle: () => {
            isOpen = !isOpen;
            if (!isOpen) options.onClose?.();
        },
        getButtonProps: () => ({
            id: `${id}-button`,
            'aria-expanded': isOpen,
            'aria-controls': `${id}-panel`,
            onClick: () => {
                isOpen = !isOpen;
                if (!isOpen) options.onClose?.();
            },
        }),
        getPanelProps: () => ({
            id: `${id}-panel`,
            hidden: !isOpen,
            style: { display: isOpen ? 'block' : 'none' },
        }),
    };
}
