import { type BreadcrumbOptions, getBreadcrumbClasses } from '@sxo/ui';
import React, { createContext, useContext } from 'react';
import { useStyle } from '../hooks.ts';

const BreadcrumbContext = createContext<{ disabled: boolean }>({ disabled: false });

export interface BreadcrumbItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    current?: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
    href,
    current = false,
    className = '',
    children,
    onClick,
    ...props
}) => {
    const { disabled } = useContext(BreadcrumbContext);
    const styles = getBreadcrumbClasses({ disabled });
    const itemClasses = useStyle(
        [styles.item, current ? styles.current : styles.link, className].filter(Boolean).join(' '),
    );

    return (
        <div className={itemClasses}>
            {href && !current ? (
                <a 
                    href={disabled ? undefined : href} 
                    className={current ? styles.current : styles.link} 
                    onClick={(e) => {
                        if (disabled) {
                            e.preventDefault();
                            return;
                        }
                        onClick?.(e);
                    }}
                    {...props}
                >
                    {children}
                </a>
            ) : (
                <span className={current ? styles.current : styles.link} {...(props as any)}>
                    {children}
                </span>
            )}
        </div>
    );
};

export interface BreadcrumbProps extends BreadcrumbOptions, React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    separator = '/',
    disabled = false,
    className = '',
    children,
    ...props
}) => {
    const styles = getBreadcrumbClasses({ separator, disabled });
    const containerClasses = useStyle(
        [styles.container, styles.separator, className].filter(Boolean).join(' '),
    );

    const childrenArray = React.Children.toArray(children);
    const items = childrenArray.reduce((acc: React.ReactNode[], child, index) => {
        acc.push(child);
        if (index < childrenArray.length - 1) {
            acc.push(
                <span key={`sep-${index}`} className={styles.separator}>
                    {separator}
                </span>,
            );
        }
        return acc;
    }, []);

    return (
        <BreadcrumbContext.Provider value={{ disabled }}>
            <nav className={containerClasses} aria-label="Breadcrumb" {...props}>
                {items}
            </nav>
        </BreadcrumbContext.Provider>
    );
};
