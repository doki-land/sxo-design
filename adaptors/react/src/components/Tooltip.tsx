import { useTooltip } from '@sxo/design';
import { getTooltipClasses, type TooltipOptions as UIProps } from '@sxo/ui';
import React, { useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface TooltipProps extends UIProps {
    content: React.ReactNode;
    children: React.ReactElement;
    delay?: number;
    className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    delay = 200,
    variant = 'dark',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { getTriggerProps, getTooltipProps } = useTooltip({
        delay,
        defaultOpen: isOpen,
    });

    const styles = getTooltipClasses({ variant });

    // 注册样式
    useStyle(`${styles.content} ${className}`);

    const triggerProps = getTriggerProps(
        () => setIsOpen(true),
        () => setIsOpen(false),
    );

    return (
        <div className="relative inline-block">
            {React.cloneElement(children, triggerProps)}

            {isOpen && (
                <div
                    {...getTooltipProps()}
                    className={`${styles.content} ${className} bottom-full left-1/2 -translate-x-1/2 mb-2`.trim()}
                >
                    {content}
                </div>
            )}
        </div>
    );
};
