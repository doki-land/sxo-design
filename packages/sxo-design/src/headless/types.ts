export interface PopoverOptions {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
    id?: string;
}

export interface DisclosureState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}
