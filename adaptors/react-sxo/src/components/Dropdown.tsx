import { getDropdownClasses, type DropdownOptions as UIProps } from '@sxo/ui';
import React, { useState, useRef, useEffect } from 'react';
import { useStyle } from '../hooks.ts';

export interface DropdownItemProps {
    disabled?: boolean;
    active?: boolean;
    divider?: boolean;
    header?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    disabled = false,
    active = false,
    divider = false,
    header = '',
    children,
    className = '',
    onClick,
}) => {
    const styles = getDropdownClasses();

    if (divider) return <div className={styles.divider} />;
    if (header) return <div className={styles.header}>{header}</div>;

    return (
        <div
            className={[
                styles.item,
                active && styles.itemActive,
                disabled && styles.itemDisabled,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            onClick={(e) => {
                if (disabled) return;
                onClick?.(e);
            }}
        >
            {children}
        </div>
    );
};

export interface DropdownProps extends UIProps {
    trigger?: 'click' | 'hover';
    overlay: React.ReactNode;
    children: React.ReactElement;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger = 'click',
    placement = 'bottom-left',
    overlay,
    children,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const styles = getDropdownClasses({ placement });

    useStyle(
        [
            styles.container,
            styles.menu,
            styles.item,
            styles.itemActive,
            styles.itemDisabled,
            styles.divider,
            styles.header,
            className,
        ]
            .filter(Boolean)
            .join(' '),
    );

    const toggle = () => setIsOpen((prev) => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        if (trigger === 'click') {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    close();
                }
            };
            window.addEventListener('click', handleClickOutside);
            return () => window.removeEventListener('click', handleClickOutside);
        }
    }, [trigger]);

    const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};
    if (trigger === 'hover') {
        triggerProps.onMouseEnter = open;
        triggerProps.onMouseLeave = close;
    } else {
        triggerProps.onClick = (e) => {
            e.stopPropagation();
            toggle();
        };
    }

    return (
        <div
            ref={dropdownRef}
            className={`${styles.container} ${className}`.trim()}
            {...triggerProps}
        >
            {children}
            {isOpen && (
                <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
                    {overlay}
                </div>
            )}
        </div>
    );
};
