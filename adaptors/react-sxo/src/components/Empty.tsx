import { type EmptyOptions, getEmptyClasses } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface EmptyProps extends EmptyOptions, React.HTMLAttributes<HTMLDivElement> {
    description?: React.ReactNode;
    image?: React.ReactNode;
    extra?: React.ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({
    description = 'No Data',
    size = 'md',
    image,
    extra,
    className = '',
    children,
    ...props
}) => {
    const styles = getEmptyClasses({ size });
    const containerClasses = useStyle(
        [styles.container, styles.image, styles.description, styles.extra, className]
            .filter(Boolean)
            .join(' '),
    );

    const renderImage = () => {
        if (image) {
            if (typeof image === 'string') {
                return <img src={image} className={styles.image} alt="empty" />;
            }
            return <div className={styles.image}>{image}</div>;
        }

        return (
            <svg
                viewBox="0 0 100 100"
                className={styles.image}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="20" y="20" width="60" height="60" rx="8" />
                <path d="M20 40h60M40 20v60" />
                <circle cx="50" cy="50" r="10" opacity="0.5" />
            </svg>
        );
    };

    return (
        <div className={containerClasses} {...props}>
            {renderImage()}
            <div className={styles.description}>{children || description}</div>
            {extra && <div className={styles.extra}>{extra}</div>}
        </div>
    );
};
