import { getAvatarClasses, type AvatarOptions as UIProps } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface AvatarProps extends UIProps {
    src?: string;
    alt?: string;
    fallback?: string;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    fallback,
    size = 'md',
    shape = 'circle',
    className = '',
}) => {
    const styles = getAvatarClasses({ size, shape });
    useStyle([styles.root, styles.image, styles.fallback, className].filter(Boolean).join(' '));

    return (
        <div className={`${styles.root} ${className}`.trim()}>
            {src ? (
                <img src={src} alt={alt} className={styles.image} />
            ) : (
                <span className={styles.fallback}>{fallback || alt?.charAt(0) || '?'}</span>
            )}
        </div>
    );
};
