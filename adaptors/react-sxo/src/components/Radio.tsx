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
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    children: React.ReactNode;
    className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    value: controlledValue,
    defaultValue = '',
    onChange,
    name,
    size = 'md',
    color = 'primary',
    children,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const { value, setValue } = useRadioGroup({
        defaultValue: currentValue,
        name,
    });

    const handleChange = (val: string) => {
        if (!isControlled) {
            setInternalValue(val);
        }
        onChange?.(val);
    };

    return (
        <RadioGroupContext.Provider
            value={{ value: currentValue, onChange: handleChange, name, size, color }}
        >
            <div className={`flex flex-col gap-2 ${className}`.trim()}>{children}</div>
        </RadioGroupContext.Provider>
    );
};

export interface RadioProps extends RadioOptions {
    value: string;
    children?: React.ReactNode;
    className?: string;
}

export const Radio: React.FC<RadioProps> = ({
    value: itemValue,
    children,
    className = '',
    ...props
}) => {
    const context = useContext(RadioGroupContext);
    if (!context) throw new Error('Radio must be used within RadioGroup');

    const isSelected = context.value === itemValue;
    const size = props.size || context.size || 'md';
    const color = props.color || context.color || 'primary';

    const classes = getRadioClasses(isSelected, { size, color });
    useStyle([classes.root, classes.inner, className].filter(Boolean).join(' '));

    return (
        <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`.trim()}>
            <div className={classes.root} onClick={() => context.onChange(itemValue)}>
                <input
                    type="radio"
                    name={context.name}
                    value={itemValue}
                    checked={isSelected}
                    className="sr-only"
                    readOnly
                />
                <div className={classes.inner} />
            </div>
            {children && <span className="text-sm select-none">{children}</span>}
        </label>
    );
};
