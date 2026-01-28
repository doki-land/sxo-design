import { getMentionsClasses, type MentionsOptions } from '@sxo/ui';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useStyle } from '../hooks.ts';

export interface MentionOption {
    value: string;
    label?: string;
    avatar?: string;
}

export interface MentionsProps extends MentionsOptions {
    value?: string;
    defaultValue?: string;
    options: MentionOption[];
    prefix?: string | string[];
    placeholder?: string;
    onChange?: (value: string) => void;
    onSelect?: (option: MentionOption) => void;
    onSearch?: (text: string) => void;
    className?: string;
}

export const Mentions: React.FC<MentionsProps> = ({
    value: controlledValue,
    defaultValue = '',
    options = [],
    prefix = '@',
    placeholder = '',
    size = 'md',
    status,
    disabled = false,
    readonly = false,
    onChange,
    onSelect,
    onSearch,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const classes = getMentionsClasses({
        size,
        status,
        disabled,
        readonly,
    });

    useStyle(
        `${classes.container} ${classes.textarea} ${classes.dropdown} ${classes.dropdownItem} ${className}`,
    );

    const prefixes = useMemo(() => (Array.isArray(prefix) ? prefix : [prefix]), [prefix]);

    const filteredOptions = useMemo(() => {
        if (!searchText) return options;
        return options.filter((opt) =>
            (opt.label || opt.value).toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [options, searchText]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (disabled || readonly) return;
        const val = e.target.value;
        const pos = e.target.selectionStart || 0;
        setCursorPosition(pos);

        if (!isControlled) {
            setInternalValue(val);
        }
        onChange?.(val);

        const textBeforeCursor = val.substring(0, pos);
        const matchPrefix = prefixes.find((p) => textBeforeCursor.endsWith(p));

        if (matchPrefix) {
            setShowSuggestions(true);
            setSearchText('');
            setSuggestionIndex(0);
            onSearch?.('');
        } else if (showSuggestions) {
            const parts = textBeforeCursor.split(new RegExp(`[${prefixes.join('')}]`));
            const newSearchText = parts[parts.length - 1];
            setSearchText(newSearchText);
            onSearch?.(newSearchText);

            if (textBeforeCursor.includes(' ') || textBeforeCursor.includes('\n')) {
                setShowSuggestions(false);
            }
        }
    };

    const selectOption = (option: MentionOption) => {
        if (disabled || readonly) return;
        const val = currentValue;
        const pos = cursorPosition;
        const textBeforeCursor = val.substring(0, pos);

        const lastPrefixIndex = Math.max(...prefixes.map((p) => textBeforeCursor.lastIndexOf(p)));

        const newVal = `${val.substring(0, lastPrefixIndex + 1) + option.value} ${val.substring(pos)}`;

        if (!isControlled) {
            setInternalValue(newVal);
        }
        onChange?.(newVal);
        onSelect?.(option);
        setShowSuggestions(false);

        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (disabled || readonly) return;
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSuggestionIndex((prev) => (prev + 1) % Math.max(1, filteredOptions.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSuggestionIndex(
                (prev) => (prev - 1 + filteredOptions.length) % Math.max(1, filteredOptions.length),
            );
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredOptions[suggestionIndex]) {
                selectOption(filteredOptions[suggestionIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className={`${classes.container} ${className}`.trim()}>
            <textarea
                ref={textareaRef}
                className={classes.textarea}
                value={currentValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readonly}
                onInput={handleInput as any}
                onKeyDown={handleKeyDown}
            />
            {showSuggestions && filteredOptions.length > 0 && (
                <div className={classes.dropdown}>
                    {filteredOptions.map((opt, i) => (
                        <div
                            key={opt.value}
                            className={`${classes.dropdownItem} ${i === suggestionIndex ? 'bg-neutral-100' : ''}`}
                            onClick={() => selectOption(opt)}
                        >
                            {opt.avatar && (
                                <img
                                    src={opt.avatar}
                                    className="w-5 h-5 rounded-full mr-2"
                                    alt=""
                                />
                            )}
                            <span>{opt.label || opt.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
