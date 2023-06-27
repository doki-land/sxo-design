import { getInputClasses, type InputOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface InputProps
    extends InputOptions,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {}

export const Input: React.FC<InputProps> = ({
    variant = 'outline',
    size = 'md',
    invalid = false,
    className = '',
    ...props
}) => {
    const sxoClasses = getInputClasses({ variant, size, invalid });
    const combinedClasses = useStyle(`${sxoClasses} ${className}`.trim());

    return <input className={combinedClasses} {...props} />;
};
