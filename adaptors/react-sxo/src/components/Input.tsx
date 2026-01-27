import { getInputClasses, type InputOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface InputProps
    extends InputOptions,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    readonly?: boolean;
}

export const Input: React.FC<InputProps> = ({
    variant = 'outline',
    size = 'md',
    invalid = false,
    disabled = false,
    readonly = false,
    prefix,
    suffix,
    className = '',
    onChange,
    onInput,
    ...props
}) => {
    const { container, input, prefix: prefixClass, suffix: suffixClass } = getInputClasses({
        variant,
        size,
        invalid,
        disabled,
        readonly,
    });
    const finalContainerClasses = useStyle(`${container} ${className}`.trim());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || readonly) return;
        onChange?.(e);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (disabled || readonly) return;
        onInput?.(e);
    };

    return (
        <div className={finalContainerClasses}>
            {prefix && <div className={prefixClass}>{prefix}</div>}
            <input
                className={input}
                disabled={disabled}
                readOnly={readonly}
                onChange={handleChange}
                onInput={handleInput}
                {...props}
            />
            {suffix && <div className={suffixClass}>{suffix}</div>}
        </div>
    );
};
