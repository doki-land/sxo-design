import { type DatePickerOptions, getDatePickerClasses } from '@sxo/ui';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useStyle } from '../hooks.ts';

export interface DatePickerProps extends DatePickerOptions {
    value?: Date | string | number;
    defaultValue?: Date | string | number;
    placeholder?: string;
    format?: string;
    onChange?: (date: Date) => void;
    className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    value: controlledValue,
    defaultValue,
    placeholder = 'Select date',
    size = 'md',
    variant = 'outline',
    rounded = true,
    format = 'YYYY-MM-DD',
    disabled = false,
    readonly = false,
    onChange,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    );
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? (controlledValue ? new Date(controlledValue) : undefined) : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(currentValue || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const classes = getDatePickerClasses({
        size,
        variant,
        rounded,
        disabled,
        readonly,
    });

    useStyle(`${classes.container} ${classes.input} ${classes.icon} ${classes.panel} ${classes.header} ${classes.grid} ${classes.day} ${classes.dayOutside} ${classes.daySelected} ${classes.dayToday} ${className}`);

    const formattedValue = useMemo(() => {
        if (!currentValue) return '';
        const y = currentValue.getFullYear();
        const m = String(currentValue.getMonth() + 1).padStart(2, '0');
        const d = String(currentValue.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }, [currentValue]);

    const days = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const prevMonthLastDate = new Date(year, month, 0).getDate();
        const result = [];

        // Prev month days
        for (let i = firstDay; i > 0; i--) {
            result.push({
                date: new Date(year, month - 1, prevMonthLastDate - i + 1),
                type: 'outside',
            });
        }

        // Current month days
        for (let i = 1; i <= lastDate; i++) {
            result.push({
                date: new Date(year, month, i),
                type: 'current',
            });
        }

        // Next month days
        const remaining = 42 - result.length;
        for (let i = 1; i <= remaining; i++) {
            result.push({
                date: new Date(year, month + 1, i),
                type: 'outside',
            });
        }

        return result;
    }, [viewDate]);

    const selectDate = (date: Date) => {
        if (disabled || readonly) return;
        if (!isControlled) {
            setInternalValue(date);
        }
        onChange?.(date);
        setIsOpen(false);
    };

    const isSelected = (date: Date) => {
        if (!currentValue) return false;
        return (
            currentValue.getFullYear() === date.getFullYear() &&
            currentValue.getMonth() === date.getMonth() &&
            currentValue.getDate() === date.getDate()
        );
    };

    const isToday = (date: Date) => {
        const now = new Date();
        return (
            now.getFullYear() === date.getFullYear() &&
            now.getMonth() === date.getMonth() &&
            now.getDate() === date.getDate()
        );
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
    };

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    return (
        <div ref={containerRef} className={`relative inline-block w-full ${className}`.trim()}>
            <div className={classes.container} onClick={toggleOpen}>
                <div className={classes.input}>
                    {formattedValue || <span className="text-neutral-400">{placeholder}</span>}
                </div>
                <svg
                    className={classes.icon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </div>

            {isOpen && (
                <div className={classes.panel}>
                    <div className={classes.header}>
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-neutral-100 rounded">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <span className="font-medium">
                            {viewDate.getFullYear()} - {String(viewDate.getMonth() + 1).padStart(2, '0')}
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-neutral-100 rounded">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                    <div className={classes.grid}>
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                            <div key={d} className="text-center text-xs text-neutral-400 py-1">
                                {d}
                            </div>
                        ))}
                        {days.map((item, i) => (
                            <div
                                key={i}
                                className={`${classes.day} ${item.type === 'outside' ? classes.dayOutside : ''} ${isSelected(item.date) ? classes.daySelected : ''} ${isToday(item.date) ? classes.dayToday : ''}`}
                                onClick={() => selectDate(item.date)}
                            >
                                {item.date.getDate()}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
