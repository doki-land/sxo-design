import {
    getProgressClasses,
    getSpinnerClasses,
    type ProgressOptions,
    type SpinnerOptions,
} from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface SpinnerProps
    extends SpinnerOptions,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    color = 'primary',
    className = '',
    ...props
}) => {
    const sxoClasses = getSpinnerClasses({ size, color });
    const finalClasses = useStyle(`${sxoClasses} ${className}`.trim());

    return <div className={finalClasses} {...(props as any)} />;
};

export interface ProgressProps
    extends ProgressOptions,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {}

export const Progress: React.FC<ProgressProps> = ({
    value,
    max = 100,
    color = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const classes = getProgressClasses({ value, max, color, size });
    useStyle(`${classes.root} ${classes.bar}`);

    return (
        <div className={`${classes.root} ${className}`.trim()} {...(props as any)}>
            <div className={classes.bar} style={{ width: `${classes.percentage}%` }} />
        </div>
    );
};
