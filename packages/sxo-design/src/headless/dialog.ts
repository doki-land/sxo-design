import type { PopoverOptions } from './types';

export function useDialog(options: PopoverOptions = {}) {
    let isOpen = options.isOpen ?? options.defaultOpen ?? false;
    const id = options.id ?? `sxo-dialog-${Math.random().toString(36).substring(2, 11)}`;

    return {
        isOpen,
        open: () => {
            isOpen = true;
        },
        close: () => {
            isOpen = false;
            options.onClose?.();
        },
        getOverlayProps: () => ({
            id: `${id}-overlay`,
            role: 'presentation',
            onClick: () => {
                isOpen = false;
                options.onClose?.();
            },
            'aria-hidden': true,
        }),
        getDialogProps: () => ({
            id,
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': `${id}-title`,
            'aria-describedby': `${id}-desc`,
        }),
        getContentProps: () => ({
            id,
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': `${id}-title`,
            'aria-describedby': `${id}-desc`,
        }),
        getTitleProps: () => ({
            id: `${id}-title`,
        }),
        getCloseButtonProps: () => ({
            type: 'button' as const,
            'aria-label': 'Close dialog',
            onClick: () => {
                isOpen = false;
                options.onClose?.();
            },
        }),
    };
}
