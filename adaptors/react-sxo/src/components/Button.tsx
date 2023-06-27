import { type ButtonOptions, getButtonClasses } from '@sxo/ui';
import React from 'react';
import { useStyle } from '../hooks.ts';

export interface ButtonProps extends ButtonOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    size,
    disabled,
    rounded,
    className,
    children,
    ...props
}) => {
    const sxoClasses = getButtonClasses({ variant, size, disabled, rounded });
    const finalClasses = useStyle(`${sxoClasses} ${className || ''}`);

    return React.createElement(
        'button',
        {
            className: finalClasses,
            disabled,
            ...props,
        },
        children,
    );
};
