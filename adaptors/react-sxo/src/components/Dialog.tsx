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

    return React.createElement('div', { className: styles.container }, [
        // 遮罩层
        React.createElement('div', {
            key: 'overlay',
            ...getOverlayProps(),
            className: styles.overlay,
        }),

        // 内容层
        React.createElement(
            'div',
            {
                key: 'content',
                ...getDialogProps(),
                className: styles.content,
                style: {
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                },
            },
            [
                // 关闭按钮
                React.createElement(
                    'button',
                    {
                        key: 'close',
                        ...getCloseButtonProps(),
                        className: styles.closeButton,
                    },
                    '✕',
                ),

                // 头部
                React.createElement(
                    'div',
                    {
                        key: 'header',
                        className: styles.header,
                        ...(isDraggable ? getDragProps() : {}),
                    },
                    [
                        title &&
                            React.createElement(
                                'h2',
                                { key: 'title', className: styles.title },
                                title,
                            ),
                        description &&
                            React.createElement(
                                'p',
                                { key: 'desc', className: styles.description },
                                description,
                            ),
                    ],
                ),

                // 内容
                React.createElement('div', { key: 'body', className: 'dialog-body' }, children),

                // 底部
                footer &&
                    React.createElement('div', { key: 'footer', className: styles.footer }, footer),
            ],
        ),
    ]);
};
