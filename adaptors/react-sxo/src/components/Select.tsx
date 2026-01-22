import { useSelect } from '@sxo/design';
import { getSelectClasses, type SelectOptions } from '@sxo/ui';
import React, { useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface SelectProps extends SelectOptions {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    value: controlledValue,
    defaultValue = '',
    onChange,
    placeholder = 'Select an option',
    size = 'md',
    disabled = false,
    children,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const { isOpen, setValue, getTriggerProps, getListboxProps } = useSelect({
        defaultValue: currentValue,
        disabled,
    });

    const classes = getSelectClasses(isOpen, { size, disabled });
    useStyle(`${classes.trigger} ${classes.listbox} ${classes.option} ${className}`);

    const handleSelect = (val: string) => {
        if (disabled) return;
        if (!isControlled) {
            setInternalValue(val);
        }
        setValue(val);
        onChange?.(val);
    };

    return (
        <div className={`relative inline-block w-full ${className}`.trim()}>
            <div
                {...getTriggerProps()}
                className={classes.trigger}
            >
                <span className={currentValue ? 'text-foreground' : 'text-neutral-400'}>
                    {currentValue || placeholder}
                </span>
                <svg
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>

            <div {...getListboxProps()} className={classes.listbox}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<any>, {
                            onSelect: handleSelect,
                            isSelected: currentValue === child.props.value,
                            styleFunction: classes.option,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export interface SelectOptionProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    onSelect?: (value: string) => void;
    isSelected?: boolean;
    // Pass styles from parent
    styleFunction?: ReturnType<typeof getSelectClasses>['option'];
}

export const SelectOption: React.FC<SelectOptionProps> = ({
    value,
    children,
    disabled = false,
    onSelect,
    isSelected = false,
    styleFunction,
}) => {
    // Fallback if used standalone (though typically used within Select)
    const optionClass = styleFunction
        ? styleFunction(isSelected, disabled)
        : getSelectClasses(false).option(isSelected, disabled);

    return (
        <div
            className={optionClass}
            onClick={() => !disabled && onSelect?.(value)}
        >
            {children}
        </div>
    );
};
