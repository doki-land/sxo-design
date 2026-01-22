import { getInputClasses, type InputOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface InputProps
    extends InputOptions,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    variant = 'outline',
    size = 'md',
    invalid = false,
    disabled = false,
    prefix,
    suffix,
    className = '',
    ...props
}) => {
    const { container, input, prefix: prefixClass, suffix: suffixClass } = getInputClasses({
        variant,
        size,
        invalid,
        disabled,
    });
    const finalContainerClasses = useStyle(`${container} ${className}`.trim());

    return (
        <div className={finalContainerClasses}>
            {prefix && <div className={prefixClass}>{prefix}</div>}
            <input className={input} disabled={disabled} {...props} />
            {suffix && <div className={suffixClass}>{suffix}</div>}
        </div>
    );
};
