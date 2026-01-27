import { useAccordion } from '@sxo/design';
import { getAccordionClasses, type AccordionOptions as UIProps } from '@sxo/ui';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { useStyle } from '../hooks.ts';

interface AccordionContextValue {
    expandedItems: string[];
    toggleItem: (id: string) => void;
    getItemProps: ReturnType<typeof useAccordion>['getItemProps'];
    styles: ReturnType<typeof getAccordionClasses>;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends UIProps {
    allowMultiple?: boolean;
    defaultExpanded?: string[];
    children: React.ReactNode;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
    children,
    allowMultiple = false,
    defaultExpanded = [],
    variant = 'bordered',
    className = '',
}) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

    const toggleItem = (itemId: string) => {
        setExpandedItems((prev) => {
            if (prev.includes(itemId)) {
                return prev.filter((id) => id !== itemId);
            } else {
                return allowMultiple ? [...prev, itemId] : [itemId];
            }
        });
    };

    const { getItemProps } = useAccordion({ allowMultiple, defaultExpanded });
    const styles = getAccordionClasses({ variant });

    // 注册样式
    useStyle(
        [
            styles.root,
            styles.trigger,
            styles.triggerText,
            styles.panel,
            styles.item(true),
            styles.item(false),
            styles.icon(true),
            styles.icon(false),
            className,
        ]
            .filter(Boolean)
            .join(' '),
    );

    return (
        <AccordionContext.Provider value={{ expandedItems, toggleItem, getItemProps, styles }}>
            <div className={`${styles.root} ${className}`.trim()}>{children}</div>
        </AccordionContext.Provider>
    );
};

export const AccordionItem: React.FC<{
    value: string;
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ value, title, children, className = '' }) => {
    const ctx = useContext(AccordionContext);
    if (!ctx) throw new Error('AccordionItem must be used within Accordion');

    const isExpanded = ctx.expandedItems.includes(value);
    const { triggerProps, panelProps } = ctx.getItemProps(value, ctx.toggleItem);

    return (
        <div className={`${ctx.styles.item(isExpanded)} ${className}`.trim()}>
            <button {...triggerProps} className={ctx.styles.trigger}>
                <span className={ctx.styles.triggerText}>{title}</span>
                <svg
                    className={ctx.styles.icon(isExpanded)}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div {...panelProps} className={ctx.styles.panel}>
                {children}
            </div>
        </div>
    );
};
