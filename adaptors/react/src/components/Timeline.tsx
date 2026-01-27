import { getTimelineClasses, type TimelineOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    label?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    color?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
    label,
    title,
    description,
    color,
    className = '',
    children,
    ...props
}) => {
    const styles = getTimelineClasses();
    const itemClasses = useStyle(`${styles.item} ${className}`.trim());

    return (
        <div className={itemClasses} {...props}>
            <div className={styles.tail} />
            <div className={styles.dot} style={color ? { backgroundColor: color } : undefined} />
            <div className={styles.content}>
                {label && <div className={styles.label}>{label}</div>}
                {title && <div className={styles.title}>{title}</div>}
                {(description || children) && (
                    <div className={styles.description}>{description || children}</div>
                )}
            </div>
        </div>
    );
};

export interface TimelineProps extends TimelineOptions, React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Timeline: React.FC<TimelineProps> = ({
    mode = 'left',
    className = '',
    children,
    ...props
}) => {
    const styles = getTimelineClasses({ mode });
    const containerClasses = useStyle(`${styles.container} ${className}`.trim());

    return (
        <div className={containerClasses} {...props}>
            {children}
        </div>
    );
};
