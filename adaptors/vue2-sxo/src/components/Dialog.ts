import { useDialog, useDraggable } from '@sxo/design';
import { type DialogStylesOptions, getDialogClasses } from '@sxo/ui';
import { defineComponent, getCurrentInstance, h, type PropType, reactive } from 'vue';
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
    setup(props, { slots, emit, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
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

            return h(
                'div',
                {
                    class: `${styles.container} ${attrs.class || ''}`.trim(),
                    on: listeners,
                },
                [
                    // 遮罩层
                    h('div', {
                        attrs: {
                            id: (getOverlayProps() as any).id,
                            role: (getOverlayProps() as any).role,
                        },
                        on: {
                            click: getOverlayProps().onClick,
                        },
                        class: styles.overlay,
                    }),

                    // 内容层
                    h(
                        'div',
                        {
                            attrs: {
                                id: (getDialogProps() as any).id,
                                role: (getDialogProps() as any).role,
                                'aria-modal': (getDialogProps() as any)['aria-modal'],
                                'aria-labelledby': (getDialogProps() as any)['aria-labelledby'],
                                'aria-describedby': (getDialogProps() as any)['aria-describedby'],
                            },
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
                                    attrs: {
                                        'aria-label': (getCloseButtonProps() as any)['aria-label'],
                                    },
                                    on: {
                                        click: getCloseButtonProps().onClick,
                                    },
                                    class: styles.closeButton,
                                },
                                [
                                    h('span', { class: 'sr-only' }, 'Close'),
                                    h(
                                        'svg',
                                        {
                                            attrs: {
                                                width: '16',
                                                height: '16',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                'stroke-width': '2',
                                            },
                                        },
                                        [h('path', { attrs: { d: 'M18 6L6 18M6 6l12 12' } })],
                                    ),
                                ],
                            ),

                            // 头部 (支持拖拽)
                            h(
                                'div',
                                {
                                    class: styles.header,
                                    on: props.isDraggable
                                        ? {
                                              mousedown: getDragProps().onMouseDown,
                                              touchstart: getDragProps().onMouseDown,
                                          }
                                        : {},
                                },
                                [
                                    props.title
                                        ? h('h2', { class: styles.title }, props.title)
                                        : null,
                                    props.description
                                        ? h('p', { class: styles.description }, props.description)
                                        : null,
                                ],
                            ),

                            // 内容
                            h('div', { class: 'dialog-body' }, [
                                slots.default ? slots.default() : [],
                            ]),

                            // 底部
                            slots.footer
                                ? h('div', { class: styles.footer }, [slots.footer()])
                                : null,
                        ],
                    ),
                ],
            );
        };
    },
});
