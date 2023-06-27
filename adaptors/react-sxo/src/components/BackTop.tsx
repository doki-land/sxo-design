import { getBackTopClasses } from '@sxo/ui';
import React, { useEffect, useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface BackTopProps {
    visibilityHeight?: number;
    right?: number;
    bottom?: number;
    className?: string;
    children?: React.ReactNode;
}

export const BackTop: React.FC<BackTopProps> = ({
    visibilityHeight = 400,
    right = 40,
    bottom = 40,
    className = '',
    children,
}) => {
    const [visible, setVisible] = useState(false);
    const styles = getBackTopClasses();

    useStyle([styles.container, styles.icon, className].filter(Boolean).join(' '));

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setVisible(scrollTop >= visibilityHeight);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibilityHeight]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

    return (
        <div
            className={`${styles.container} ${className}`.trim()}
            style={{ right: `${right}px`, bottom: `${bottom}px` }}
            onClick={scrollToTop}
        >
            {children || (
                <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            )}
        </div>
    );
};
