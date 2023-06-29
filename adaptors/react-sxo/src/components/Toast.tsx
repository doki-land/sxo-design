import { type Toast, useToastManager } from '@sxo/design';
import { getToastClasses } from '@sxo/ui';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext<ReturnType<typeof useToastManager> | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [manager] = useState(() => useToastManager());
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const unsubscribe = manager.subscribe((newToasts) => {
            setToasts(newToasts);
        });
        return () => {
            unsubscribe();
        };
    }, [manager]);

    return (
        <ToastContext.Provider value={manager}>
            {children}
            {typeof document !== 'undefined' &&
                createPortal(
                    <div className="sxo-toast-root">{renderToasts(toasts, manager)}</div>,
                    document.body,
                )}
        </ToastContext.Provider>
    );
};

function renderToasts(toasts: Toast[], manager: any) {
    const positions = [
        'top',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ] as const;

    return positions.map((pos) => {
        const filtered = toasts.filter((t) => (t.position || 'top-right') === pos);
        if (filtered.length === 0) return null;

        const classes = getToastClasses({ position: pos });

        return (
            <div className={classes.container} key={pos}>
                {filtered.map((toast) => (
                    <div key={toast.id} className={getToastClasses({ type: toast.type }).item}>
                        {/* Icon */}
                        <div className="w-5 h-5 flex-shrink-0">{renderIcon(toast.type)}</div>
                        {/* Content */}
                        <div className="flex-grow flex flex-col">
                            {toast.title && <div className="text-sm font-bold">{toast.title}</div>}
                            {toast.description && (
                                <div className="text-xs opacity-80">{toast.description}</div>
                            )}
                        </div>
                        {/* Close Button */}
                        <button
                            className="opacity-50 hover:opacity-100"
                            onClick={() => manager.remove(toast.id)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        );
    });
}

function renderIcon(type: string = 'info') {
    const colors = {
        info: 'currentColor',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
    };
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={(colors as any)[type] || colors.info}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
