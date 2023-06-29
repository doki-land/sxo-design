import { getTagClasses, type TagOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface TagProps extends TagOptions, Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    children?: React.ReactNode;
    onClose?: () => void;
}

export const Tag: React.FC<TagProps> = ({
    variant = 'solid',
    color = 'primary',
    rounded = 'sm',
    size = 'md',
    closable = false,
    className = '',
    children,
    onClose,
    ...props
}) => {
    const sxoClasses = getTagClasses({ variant, color, rounded, size, closable });
    const finalClasses = useStyle(`${sxoClasses.base} ${className}`.trim());

    return (
        <span className={finalClasses} {...props}>
            {children}
            {closable && (
                <span
                    className={sxoClasses.closeIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose?.();
                    }}
                >
                    ×
                </span>
            )}
        </span>
    );
};
