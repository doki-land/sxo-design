import { type ResultOptions, getResultClasses } from '@sxo/ui';
import React from 'react';
import { useStyle } from '../hooks.ts';

export interface ResultProps extends ResultOptions, React.HTMLAttributes<HTMLDivElement> {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    extra?: React.ReactNode;
    icon?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({
    status = 'info',
    title,
    subTitle,
    extra,
    icon,
    className = '',
    children,
    ...props
}) => {
    const styles = getResultClasses({ status });
    const containerClasses = useStyle(`${styles.container} ${className}`.trim());

    const renderIcon = () => {
        if (icon) return <div className={styles.icon}>{icon}</div>;

        const iconMap: Record<string, React.ReactNode> = {
            success: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
            error: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            ),
            info: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            ),
            warning: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            ),
            '404': <div className="text-6xl font-black opacity-20">404</div>,
            '500': <div className="text-6xl font-black opacity-20">500</div>,
            '403': <div className="text-6xl font-black opacity-20">403</div>,
        };

        return <div className={styles.icon}>{iconMap[status] || iconMap.info}</div>;
    };

    return (
        <div className={containerClasses} {...props}>
            {renderIcon()}
            {title && <div className={styles.title}>{title}</div>}
            {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
            {children}
        </div>
    );
};
