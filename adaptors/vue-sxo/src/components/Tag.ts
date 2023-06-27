import { getTagClasses, type TagOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Tag = defineComponent({
    name: 'SxoTag',
    props: {
        variant: {
            type: String as PropType<TagOptions['variant']>,
            default: 'solid',
        },
        color: {
            type: String as PropType<TagOptions['color']>,
            default: 'primary',
        },
        rounded: {
            type: String as PropType<TagOptions['rounded']>,
            default: 'sm',
        },
        size: {
            type: String as PropType<TagOptions['size']>,
            default: 'md',
        },
        closable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
    setup(props, { slots, emit, attrs }) {
        const classes = computed(() =>
            getTagClasses({
                variant: props.variant,
                color: props.color,
                rounded: props.rounded,
                size: props.size,
                closable: props.closable,
            }),
        );

        useStyle(() => `${Object.values(classes.value).join(' ')} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'span',
                {
                    ...attrs,
                    class: [classes.value.base, attrs.class],
                },
                [
                    slots.default?.(),
                    props.closable &&
                        h(
                            'span',
                            {
                                class: classes.value.closeIcon,
                                onClick: (e: MouseEvent) => {
                                    e.stopPropagation();
                                    emit('close');
                                },
                            },
                            '×',
                        ),
                ],
            );
    },
});
