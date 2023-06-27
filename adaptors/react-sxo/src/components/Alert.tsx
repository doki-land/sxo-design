import { getAlertClasses, type AlertOptions } from '@sxo/ui';
import React from 'react';
import { useStyle } from '../hooks.ts';

export interface AlertProps extends AlertOptions, React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    closable?: boolean;
    showIcon?: boolean;
    onClose?: (e: React.MouseEvent) => void;
    icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
    type = 'info',
    variant = 'subtle',
    title,
    description,
    closable = false,
    showIcon = true,
    onClose,
    icon,
    className = '',
    children,
    ...props
}) => {
    const styles = getAlertClasses({ type, variant });
    const combinedClasses = useStyle(
        [
            styles.container,
            styles.icon,
            styles.content,
            styles.title,
            styles.description,
            styles.closeButton,
            className,
        ]
            .filter(Boolean)
            .join(' '),
    );

    const renderIcon = () => {
        if (!showIcon) return null;
        if (icon) return <div className={styles.icon}>{icon}</div>;

        const iconMap = {
            info: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            ),
            success: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
            warning: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            ),
            error: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            ),
        };

        return <div className={styles.icon}>{iconMap[type]}</div>;
    };

    return (
        <div className={combinedClasses} {...props}>
            {renderIcon()}
            <div className={styles.content}>
                {title && <div className={styles.title}>{title}</div>}
                {(description || children) && (
                    <div className={styles.description}>{description || children}</div>
                )}
            </div>
            {closable && (
                <div className={styles.closeButton} onClick={onClose}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
            )}
        </div>
    );
};
