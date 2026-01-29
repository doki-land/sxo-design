import { useDialog, useDraggable } from '@sxo/design';
import { type DialogStylesOptions, getDialogClasses } from '@sxo/ui';
import { defineComponent, h, type PropType, reactive, mergeProps, computed } from 'vue';
import { useStyle } from '../hooks';

export const Dialog = defineComponent({
    name: 'SxoDialog',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: undefined,
        },
        isOpen: {
            type: Boolean,
            default: false,
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
    emits: ['close', 'update:modelValue'],
    setup(props, { slots, emit, attrs }) {
        const offset = reactive({ x: 0, y: 0 });

        const isOpened = computed(() => props.modelValue !== undefined ? props.modelValue : props.isOpen);

        // 1. 获取 Headless 逻辑
        const { getDialogProps, getOverlayProps, getCloseButtonProps } = useDialog({
            isOpen: isOpened.value,
            onClose: () => {
                emit('close');
                emit('update:modelValue', false);
            },
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
            if (!isOpened.value) return null;

            return h('div', mergeProps(attrs, { class: styles.container }), [
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

                        // 主体内容
                        h('div', { class: styles.body }, slots.default?.()),

                        // 底部操作栏
                        slots.footer
                            ? h('div', { class: styles.footer }, slots.footer?.())
                            : null,
                    ],
                ),
            ]);
        };
    },
});
