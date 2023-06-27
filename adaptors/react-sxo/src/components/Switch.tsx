import { useToggle } from '@sxo/design';
import { getSwitchClasses, type SwitchOptions } from '@sxo/ui';
import type React from 'react';
import { useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface SwitchProps extends SwitchOptions {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    onChange,
    size = 'md',
    color = 'primary',
    className = '',
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const currentChecked = isControlled ? controlledChecked : internalChecked;

    const { getToggleProps } = useToggle(currentChecked);
    const classes = getSwitchClasses(currentChecked, {
        size,
        color,
        disabled,
    });

    // 注册样式
    useStyle(`${classes.track} ${classes.thumb} ${className}`);

    const handleToggle = () => {
        if (disabled) return;
        const nextValue = !currentChecked;
        if (!isControlled) {
            setInternalChecked(nextValue);
        }
        onChange?.(nextValue);
    };

    return (
        <div
            {...getToggleProps()}
            className={`${classes.track} ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${className}`.trim()}
            onClick={handleToggle}
        >
            <span className={classes.thumb} />
        </div>
    );
};
