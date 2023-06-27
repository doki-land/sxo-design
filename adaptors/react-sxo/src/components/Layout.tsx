import React from 'react';
import { useStyle } from '../hooks.js';

export type Responsive<T> =
    | T
    | {
          base?: T;
          sm?: T;
          md?: T;
          lg?: T;
          xl?: T;
          '2xl'?: T;
      };

function resolveResponsive<T>(prop: Responsive<T> | undefined, prefix: string): string[] {
    if (prop === undefined) return [];
    if (typeof prop !== 'object' || Array.isArray(prop)) {
        return [`${prefix}-${prop}`];
    }
    const result: string[] = [];
    const p = prop as any;
    if (p.base !== undefined) result.push(`${prefix}-${p.base}`);
    if (p.sm !== undefined) result.push(`sm:${prefix}-${p.sm}`);
    if (p.md !== undefined) result.push(`md:${prefix}-${p.md}`);
    if (p.lg !== undefined) result.push(`lg:${prefix}-${p.lg}`);
    if (p.xl !== undefined) result.push(`xl:${prefix}-${p.xl}`);
    if (p['2xl'] !== undefined) result.push(`2xl:${prefix}-${p['2xl']}`);
    return result;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: Responsive<'row' | 'col'>;
    gap?: Responsive<string | number>;
    align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
    justify?: Responsive<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>;
    wrap?: Responsive<boolean>;
}

export const Stack: React.FC<StackProps> = ({
    direction = 'col',
    gap = 4,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className = '',
    children,
    ...props
}) => {
    const classes = [
        'flex',
        ...resolveResponsive(direction, 'flex'),
        ...resolveResponsive(gap, 'gap'),
        ...resolveResponsive(align, 'items'),
        ...resolveResponsive(justify, 'justify'),
        ...(typeof wrap === 'boolean'
            ? [wrap ? 'flex-wrap' : 'flex-nowrap']
            : resolveResponsive(wrap, 'flex').map((v) =>
                  v.includes('true') ? v.replace('-true', '-wrap') : v.replace('-false', '-nowrap'),
              )),
        className,
    ]
        .filter(Boolean)
        .join(' ');

    useStyle(classes);

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: Responsive<number>;
    rows?: Responsive<number>;
    gap?: Responsive<string | number>;
    className?: string;
}

export const Grid: React.FC<GridProps> = ({
    cols = 1,
    rows,
    gap = 4,
    className = '',
    children,
    ...props
}) => {
    const classes = [
        'grid',
        ...resolveResponsive(cols, 'grid-cols'),
        ...resolveResponsive(rows, 'grid-rows'),
        ...resolveResponsive(gap, 'gap'),
        className,
    ]
        .filter(Boolean)
        .join(' ');

    useStyle(classes);

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    center?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
    center = true,
    className = '',
    children,
    ...props
}) => {
    const classes = ['container', center ? 'mx-auto' : '', className].filter(Boolean).join(' ');

    useStyle(classes);

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
