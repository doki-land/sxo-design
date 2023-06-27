import { useMenu } from '@sxo/design';
import { getMenuClasses, type MenuOptions } from '@sxo/ui';
import type React from 'react';
import { useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface MenuItem {
    id: string;
    label: string;
    onClick?: () => void;
}

export interface MenuProps extends MenuOptions {
    label: React.ReactNode;
    items: MenuItem[];
    className?: string;
}

export const Menu: React.FC<MenuProps> = ({
    label,
    items,
    variant = 'default',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { getMenuProps, getItemProps, getButtonProps } = useMenu({
        isOpen,
        id: 'sxo-menu',
    });

    const styles = getMenuClasses({ variant });

    // 注册样式
    useStyle(`${Object.values(styles).join(' ')} ${className}`);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className={`${styles.container} ${className}`.trim()}>
            <button {...getButtonProps()} className={styles.button} onClick={handleToggle}>
                {label}
            </button>

            {isOpen && (
                <div {...getMenuProps()} className={styles.items}>
                    <div className={styles.section}>
                        {items.map((item) => (
                            <button
                                key={item.id}
                                {...getItemProps(item.id)}
                                className={styles.item}
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
