import { useDialog, useDraggable } from '@sxo/design';
import { type DialogStylesOptions, getDialogClasses } from '@sxo/ui';
import React, { useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface DialogProps extends DialogStylesOptions {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    isDraggable?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size,
    isCentered,
    isDraggable = false,
}) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // 1. 获取 Headless 逻辑
    const { getDialogProps, getOverlayProps, getCloseButtonProps } = useDialog({
        isOpen,
        onClose,
    });

    const { getDragProps } = useDraggable({
        onDrag: (pos) => {
            setOffset({ x: pos.x, y: pos.y });
        },
    });

    // 2. 获取 UI 样式类
    const styles = getDialogClasses({ size, isCentered });

    // 3. 注册样式到引擎
    useStyle(Object.values(styles).join(' '));

    if (!isOpen) return null;

    return (
        <div className={styles.container}>
            {/* 遮罩层 */}
            <div key="overlay" {...(getOverlayProps() as any)} className={styles.overlay} />

            {/* 内容层 */}
            <div
                key="content"
                {...(getDialogProps() as any)}
                className={styles.content}
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
            >
                {/* 关闭按钮 */}
                <button
                    key="close"
                    {...(getCloseButtonProps() as any)}
                    className={styles.closeButton}
                >
                    ✕
                </button>

                {/* 头部 */}
                <div
                    key="header"
                    className={styles.header}
                    {...(isDraggable ? (getDragProps() as any) : {})}
                >
                    {title && (
                        <h2 key="title" className={styles.title}>
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p key="desc" className={styles.description}>
                            {description}
                        </p>
                    )}
                </div>

                {/* 主体 */}
                <div key="body" className={styles.body}>
                    {children}
                </div>

                {/* 底部 */}
                {footer && (
                    <div key="footer" className={styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
