import { type CascaderOptions, getCascaderClasses } from '@sxo/ui';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useStyle } from '../hooks.ts';

export interface CascaderOption {
    value: string | number;
    label: string;
    children?: CascaderOption[];
    disabled?: boolean;
}

export interface CascaderProps extends CascaderOptions {
    value?: (string | number)[];
    defaultValue?: (string | number)[];
    options: CascaderOption[];
    placeholder?: string;
    onChange?: (value: (string | number)[]) => void;
    className?: string;
}

export const Cascader: React.FC<CascaderProps> = ({
    value: controlledValue,
    defaultValue = [],
    options = [],
    placeholder = 'Please select',
    size = 'md',
    rounded = true,
    disabled = false,
    readonly = false,
    onChange,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState<(string | number)[]>(currentValue);
    const containerRef = useRef<HTMLDivElement>(null);

    const classes = getCascaderClasses({
        size,
        rounded,
        disabled,
        readonly,
    });

    useStyle(
        `${classes.container} ${classes.input} ${classes.icon} ${classes.iconOpen} ${classes.dropdown} ${classes.menu} ${classes.menuItem} ${classes.menuItemActive} ${classes.menuItemDisabled} ${className}`,
    );

    const displayText = useMemo(() => {
        if (currentValue.length === 0) return '';

        const labels: string[] = [];
        let currentOptions = options;

        for (const val of currentValue) {
            const option = currentOptions.find((o) => o.value === val);
            if (option) {
                labels.push(option.label);
                currentOptions = option.children || [];
            }
        }
        return labels.join(' / ');
    }, [currentValue, options]);

    const menus = useMemo(() => {
        const result = [options];
        let currentOptions = options;

        for (const val of activePath) {
            const option = currentOptions.find((o) => o.value === val);
            if (option?.children && option.children.length > 0) {
                result.push(option.children);
                currentOptions = option.children;
            } else {
                break;
            }
        }
        return result;
    }, [activePath, options]);

    const handleOptionClick = (option: CascaderOption, level: number) => {
        if (disabled || readonly || option.disabled) return;

        const newPath = activePath.slice(0, level);
        newPath.push(option.value);
        setActivePath(newPath);

        if (!option.children || option.children.length === 0) {
            if (!isControlled) {
                setInternalValue(newPath);
            }
            onChange?.(newPath);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleOpen = () => {
        if (disabled || readonly) return;
        setIsOpen(!isOpen);
        if (!isOpen) {
            setActivePath(currentValue);
        }
    };

    return (
        <div ref={containerRef} className={`relative inline-block w-full ${className}`.trim()}>
            <div className={classes.container} onClick={toggleOpen}>
                <div className={classes.input}>
                    {displayText || <span className="text-neutral-400">{placeholder}</span>}
                </div>
                <svg
                    className={`${classes.icon} ${isOpen ? classes.iconOpen : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>

            {isOpen && (
                <div className={classes.dropdown}>
                    {menus.map((menuOptions, level) => (
                        <div key={level} className={classes.menu}>
                            {menuOptions.map((opt) => {
                                const isActive = activePath[level] === opt.value;
                                const isSelected = currentValue[level] === opt.value;
                                return (
                                    <div
                                        key={opt.value}
                                        className={`${classes.menuItem} ${isActive ? classes.menuItemActive : ''} ${opt.disabled ? classes.menuItemDisabled : ''}`}
                                        onClick={() => handleOptionClick(opt, level)}
                                    >
                                        <span className="flex-1">{opt.label}</span>
                                        {opt.children && opt.children.length > 0 && (
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
