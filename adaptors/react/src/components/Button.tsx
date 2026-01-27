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
    loading,
    className,
    children,
    ...props
}) => {
    const { container, spinner } = getButtonClasses({ variant, size, disabled, loading, rounded });
    const finalClasses = useStyle(`${container} ${className || ''}`);

    return React.createElement(
        'button',
        {
            className: finalClasses,
            disabled: disabled || loading,
            ...props,
        },
        [
            loading &&
                React.createElement(
                    'svg',
                    {
                        key: 'spinner',
                        className: spinner,
                        xmlns: 'http://www.w3.org/2000/svg',
                        fill: 'none',
                        viewBox: '0 0 24 24',
                    },
                    React.createElement('circle', {
                        className: 'opacity-25',
                        cx: '12',
                        cy: '12',
                        r: '10',
                        stroke: 'currentColor',
                        strokeWidth: '4',
                    }),
                    React.createElement('path', {
                        className: 'opacity-75',
                        fill: 'currentColor',
                        d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                    }),
                ),
            children,
        ],
    );
};
