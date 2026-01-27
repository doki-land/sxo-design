export function useMenu(options: { id?: string; onClose?: () => void; isOpen?: boolean } = {}) {
    let isOpen = options.isOpen ?? false;
    let activeIndex = -1;
    const id = options.id ?? `sxo-menu-${Math.random().toString(36).substring(2, 11)}`;

    return {
        isOpen,
        activeIndex,
        open: () => {
            isOpen = true;
        },
        close: () => {
            isOpen = false;
            activeIndex = -1;
            options.onClose?.();
        },
        getButtonProps: () => ({
            id: `${id}-button`,
            role: 'button',
            'aria-haspopup': 'menu' as const,
            'aria-expanded': isOpen,
            'aria-controls': `${id}-menu`,
            onClick: () => {
                isOpen = !isOpen;
            },
        }),
        getMenuProps: () => ({
            id: `${id}-menu`,
            role: 'menu',
            'aria-labelledby': `${id}-button`,
            hidden: !isOpen,
        }),
        getItemProps: (index: number) => ({
            id: `${id}-item-${index}`,
            role: 'menuitem',
            tabIndex: activeIndex === index ? 0 : -1,
            onClick: () => {
                isOpen = false;
                options.onClose?.();
            },
            onMouseEnter: () => {
                activeIndex = index;
            },
        }),
    };
}
