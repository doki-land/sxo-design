import { type ButtonOptions, getButtonClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Button = defineComponent({
    name: 'SxoButton',
    props: {
        variant: {
            type: String as PropType<ButtonOptions['variant']>,
            default: 'primary',
        },
        size: {
            type: String as PropType<ButtonOptions['size']>,
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = computed(() => {
            return getButtonClasses({
                variant: props.variant,
                size: props.size,
                disabled: props.disabled,
            });
        });

        useStyle(() => `${classes.value} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'button',
                {
                    ...attrs,
                    class: [classes.value, attrs.class],
                    disabled: props.disabled,
                },
                slots.default?.(),
            );
    },
});
