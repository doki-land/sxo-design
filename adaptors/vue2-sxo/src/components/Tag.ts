import { defineComponent, h, computed, getCurrentInstance } from 'vue';
import { type TagOptions, getTagClasses } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Tag = defineComponent({
    name: 'SxoTag',
    props: {
        variant: {
            type: String as () => TagOptions['variant'],
            default: 'solid',
        },
        color: {
            type: String as () => TagOptions['color'],
            default: 'primary',
        },
        rounded: {
            type: String as () => TagOptions['rounded'],
            default: 'sm',
        },
        size: {
            type: String as () => TagOptions['size'],
            default: 'md',
        },
        closable: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs, emit }) {
        const classes = computed(() => {
            const sxoClasses = getTagClasses({
                variant: props.variant,
                color: props.color,
                rounded: props.rounded,
                size: props.size,
                closable: props.closable,
            });
            return {
                base: `${sxoClasses.base} ${attrs.class || ''}`.trim(),
                closeIcon: sxoClasses.closeIcon,
            };
        });

        useStyle(() => `${classes.value.base} ${classes.value.closeIcon}`);

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const handleClose = (e: MouseEvent) => {
            e.stopPropagation();
            emit('close');
        };

        return () =>
            h(
                'span',
                {
                    class: classes.value.base,
                    on: listeners,
                    attrs: { ...attrs },
                },
                [
                    slots.default?.(),
                    props.closable &&
                        h(
                            'span',
                            {
                                class: classes.value.closeIcon,
                                on: {
                                    click: handleClose,
                                },
                            },
                            '×',
                        ),
                ],
            );
    },
});
