import { type CardOptions, getCardClasses } from '@sxo/ui';
import React from 'react';
import { useStyle } from '../hooks.ts';

export interface CardProps extends CardOptions, React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    variant,
    padding,
    interactive,
    rounded,
    className,
    children,
    ...props
}) => {
    const sxoClasses = getCardClasses({ variant, padding, interactive, rounded });
    const finalClasses = useStyle(`${sxoClasses} ${className || ''}`);

    return React.createElement(
        'div',
        {
            className: finalClasses,
            ...props,
        },
        children,
    );
};
