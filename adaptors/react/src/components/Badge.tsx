import { type BadgeOptions, getBadgeClasses } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface BadgeProps extends BadgeOptions, React.HTMLAttributes<HTMLSpanElement> {}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const sxoClasses = getBadgeClasses({ variant, size });
    const combinedClasses = useStyle(`${sxoClasses} ${className}`.trim());

    return (
        <span className={combinedClasses} {...props}>
            {children}
        </span>
    );
};
