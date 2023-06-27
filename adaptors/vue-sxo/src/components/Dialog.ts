import { useDialog, useDraggable } from '@sxo/design';
import { type DialogStylesOptions, getDialogClasses } from '@sxo/ui';
import { defineComponent, h, reactive, ref, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Dialog = defineComponent({
    name: 'SxoDialog',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        title: String,
        description: String,
        size: {
            type: String as PropType<DialogStylesOptions['size']>,
            default: 'md',
        },
        isCentered: {
            type: Boolean,
            default: false,
        },
        isDraggable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
    setup(props, { slots, emit }) {
        const offset = reactive({ x: 0, y: 0 });

        // 1. 获取 Headless 逻辑
        const { getDialogProps, getOverlayProps, getCloseButtonProps } = useDialog({
            isOpen: props.isOpen,
            onClose: () => emit('close'),
        });

        const { getDragProps } = useDraggable({
            onDrag: (pos) => {
                offset.x = pos.x;
                offset.y = pos.y;
            },
        });

        // 2. 获取 UI 样式类
        const styles = getDialogClasses({
            size: props.size,
            isCentered: props.isCentered,
        });

        // 3. 注册样式到引擎
        useStyle(() => Object.values(styles).join(' '));

        return () => {
            if (!props.isOpen) return null;

            return h('div', { class: styles.container }, [
                // 遮罩层
                h('div', {
                    ...getOverlayProps(),
                    class: styles.overlay,
                }),

                // 内容层
                h(
                    'div',
                    {
                        ...getDialogProps(),
                        class: styles.content,
                        style: {
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        },
                    },
                    [
                        // 关闭按钮
                        h(
                            'button',
                            {
                                ...getCloseButtonProps(),
                                class: styles.closeButton,
                            },
                            '✕',
                        ),

                        // 头部 (支持拖拽)
                        h(
                            'div',
                            {
                                class: styles.header,
                                ...(props.isDraggable ? getDragProps() : {}),
                            },
                            [
                                props.title ? h('h2', { class: styles.title }, props.title) : null,
                                props.description
                                    ? h('p', { class: styles.description }, props.description)
                                    : null,
                            ],
                        ),

                        // 内容
                        h('div', { class: 'dialog-body' }, slots.default?.()),

                        // 底部
                        slots.footer ? h('div', { class: styles.footer }, slots.footer()) : null,
                    ],
                ),
            ]);
        };
    },
});
