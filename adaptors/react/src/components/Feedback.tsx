import { getProgressClasses, getSpinnerClasses, type ProgressOptions, type SpinnerOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface SpinnerProps extends SpinnerOptions, React.HTMLAttributes<HTMLDivElement> {}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary', className = '', ...props }) => {
    const sxoClasses = getSpinnerClasses({ size, color });
    const finalClasses = useStyle(`${sxoClasses} ${className}`.trim());

    return <div className={finalClasses} {...props} />;
};

export interface ProgressProps extends ProgressOptions, React.HTMLAttributes<HTMLDivElement> {}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, color = 'primary', size = 'md', className = '', ...props }) => {
    const classes = getProgressClasses({ value, max, color, size });
    useStyle(`${classes.root} ${classes.bar}`);

    return (
        <div className={`${classes.root} ${className}`.trim()} {...props}>
            <div
                className={classes.bar}
                style={{ width: `${classes.percentage}%` }}
            />
        </div>
    );
};
