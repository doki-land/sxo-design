import { type ButtonOptions, getButtonClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useStyle } from '../hooks';

export const Button = defineComponent({
    name: 'SxoButton',
    props: {
        variant: {
            type: String as () => ButtonOptions['variant'],
            default: 'primary',
        },
        size: {
            type: String as () => ButtonOptions['size'],
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

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
                    attrs: {
                        ...attrs,
                        disabled: props.disabled,
                    },
                    class: [classes.value, attrs.class],
                    on: listeners,
                },
                slots.default ? slots.default() : [],
            );
    },
});
