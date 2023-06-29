export interface Toast {
    id: string;
    title?: string;
    description?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function useToastManager() {
    let toasts: Toast[] = [];
    const listeners = new Set<(toasts: Toast[]) => void>();

    const notify = () => {
        for (const l of listeners) {
            l([...toasts]);
        }
    };

    return {
        add: (toast: Omit<Toast, 'id'>) => {
            const id = `sxo-toast-${Math.random().toString(36).substr(2, 9)}`;
            const newToast = { ...toast, id };
            toasts = [...toasts, newToast];
            notify();

            if (toast.duration !== 0) {
                setTimeout(() => {
                    toasts = toasts.filter((t) => t.id !== id);
                    notify();
                }, toast.duration || 3000);
            }

            return id;
        },
        remove: (id: string) => {
            toasts = toasts.filter((t) => t.id !== id);
            notify();
        },
        subscribe: (l: (toasts: Toast[]) => void) => {
            listeners.add(l);
            return () => {
                listeners.delete(l);
            };
        },
    };
}
