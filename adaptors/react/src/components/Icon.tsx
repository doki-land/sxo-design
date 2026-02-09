import { type IconProps as BaseIconProps, Icons } from '@sxo/component-icons';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface IconProps extends Omit<BaseIconProps, 'className'> {
    className?: string;
    style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = '1em',
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    style,
    variant = 'linear',
}) => {
    const iconDef = Icons[name] as any;
    const path = variant === 'solid' && iconDef.solid ? iconDef.solid : iconDef.linear;
    const isSolid = variant === 'solid' && !!iconDef.solid;

    useStyle(className);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isSolid ? color : 'none'}
            stroke={isSolid ? 'none' : color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
        >
            <path d={path} />
        </svg>
    );
};
