import { getSearchClasses, type SearchOptions } from '@sxo/ui';
import React, { useRef } from 'react';
import { useStyle } from '../hooks.ts';

export interface SearchProps
    extends SearchOptions,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    loading?: boolean;
}

export const Search: React.FC<SearchProps> = ({
    value = '',
    onChange,
    onSearch,
    onClear,
    variant = 'outline',
    size = 'md',
    rounded = true,
    loading = false,
    placeholder = 'Search...',
    className = '',
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const styles = getSearchClasses({ variant, size, rounded });

    const containerClasses = useStyle(
        `${styles.container} ${styles.input} ${styles.icon} ${styles.clear} ${className}`,
    );

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch?.(value);
        }
    };

    const handleClear = () => {
        onChange?.('');
        onClear?.();
        inputRef.current?.focus();
    };

    return (
        <div className={containerClasses}>
            {/* Search Icon */}
            <span className={styles.icon}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>

            {/* Input Field */}
            <input
                ref={inputRef}
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                {...props}
            />

            {/* Clear Button */}
            {value && (
                <span className={styles.clear} onClick={handleClear}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </span>
            )}
        </div>
    );
};
