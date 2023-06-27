import { type DividerOptions, getDividerClasses } from '@sxo/ui';
import React from 'react';
import { useStyle } from '../hooks.ts';

export interface DividerProps extends DividerOptions, React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
    direction = 'horizontal',
    type = 'solid',
    contentPlacement = 'center',
    className = '',
    children,
    ...props
}) => {
    const styles = getDividerClasses({
        direction,
        type,
        contentPlacement,
    });

    const combinedClasses = useStyle(
        [styles.container, styles.line, styles.lineLeft, styles.lineRight, styles.text, className]
            .filter(Boolean)
            .join(' '),
    );

    if (direction === 'vertical') {
        return <div className={combinedClasses} {...props} />;
    }

    if (!children) {
        return (
            <div
                className={[styles.line, 'my-4', className].filter(Boolean).join(' ')}
                {...props}
            />
        );
    }

    return (
        <div className={combinedClasses} {...props}>
            <div className={`${styles.line} ${styles.lineLeft}`} />
            <span className={styles.text}>{children}</span>
            <div className={`${styles.line} ${styles.lineRight}`} />
        </div>
    );
};
