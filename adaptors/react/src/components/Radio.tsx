import { useRadioGroup } from '@sxo/design';
import { getRadioClasses, type RadioOptions } from '@sxo/ui';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { useStyle } from '../hooks.ts';

interface RadioGroupContextValue {
    value: string;
    onChange: (value: string) => void;
    name: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    value: controlledValue,
    defaultValue = '',
    onChange,
    name: propName,
    size = 'md',
    color = 'primary',
    disabled = false,
    children,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const { name } = useRadioGroup({
        defaultValue: currentValue,
        name: propName,
    });

    const handleChange = (val: string) => {
        if (disabled) return;
        if (!isControlled) {
            setInternalValue(val);
        }
        onChange?.(val);
    };

    return (
        <RadioGroupContext.Provider
            value={{ value: currentValue, onChange: handleChange, name, size, color, disabled }}
        >
            <div className={`flex flex-col gap-2 ${className}`.trim()}>{children}</div>
        </RadioGroupContext.Provider>
    );
};

export interface RadioProps extends RadioOptions {
    value: string;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Radio: React.FC<RadioProps> = ({
    value: itemValue,
    children,
    className = '',
    disabled: propDisabled = false,
    ...props
}) => {
    const context = useContext(RadioGroupContext);
    if (!context) throw new Error('Radio must be used within RadioGroup');

    const isSelected = context.value === itemValue;
    const size = props.size || context.size || 'md';
    const color = props.color || context.color || 'primary';
    const disabled = propDisabled || context.disabled || false;

    const classes = getRadioClasses(isSelected, { size, color, disabled });
    useStyle(
        [classes.root, classes.inner, classes.label, classes.text, className]
            .filter(Boolean)
            .join(' '),
    );

    return (
        <label className={`${classes.label} ${className}`.trim()}>
            <div className={classes.root} onClick={() => !disabled && context.onChange(itemValue)}>
                <input
                    type="radio"
                    name={context.name}
                    value={itemValue}
                    checked={isSelected}
                    disabled={disabled}
                    className="sr-only"
                    readOnly
                />
                <div className={classes.inner} />
            </div>
            {children && <span className={classes.text}>{children}</span>}
        </label>
    );
};
