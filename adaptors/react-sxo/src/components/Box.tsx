import React from 'react';
import { useStyle } from '../hooks.ts';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    className?: string;
    p?: string | number;
    padding?: string | number;
    m?: string | number;
    margin?: string | number;
    bg?: string;
    text?: string;
    rounded?: string;
    shadow?: string;
    w?: string | number;
    h?: string | number;
    display?: string;
    flex?: string | number | boolean;
    grid?: string | number | boolean;
}

/**
 * Box 组件是 SXO 的原子组件
 * 它允许你直接在 className 中使用 sxo-engine 的原子类
 */
export const Box: React.FC<BoxProps> = ({
    as: Component = 'div',
    className = '',
    children,
    ...props
}) => {
    const utilityMap: Record<string, string> = {
        p: 'p',
        padding: 'p',
        m: 'm',
        margin: 'm',
        bg: 'bg',
        text: 'text',
        rounded: 'rounded',
        shadow: 'shadow',
        w: 'w',
        h: 'h',
        display: '',
        flex: 'flex',
        grid: 'grid',
    };

    const classes = [className];
    const filteredProps: Record<string, any> = {};

    for (const [key, value] of Object.entries(props)) {
        if (key in utilityMap) {
            const prefix = utilityMap[key];
            if (prefix) {
                classes.push(`${prefix}-${value}`);
            } else {
                classes.push(String(value));
            }
        } else {
            filteredProps[key] = value;
        }
    }

    const finalClasses = useStyle(classes.filter(Boolean).join(' '));
    const Comp = Component as any;

    return (
        <Comp className={finalClasses} {...filteredProps}>
            {children}
        </Comp>
    );
};
