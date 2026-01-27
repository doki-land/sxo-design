import { type CardOptions, getCardClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useStyle } from '../hooks';

export const Card = defineComponent({
    name: 'SxoCard',
    props: {
        variant: {
            type: String as () => CardOptions['variant'],
            default: 'default',
        },
        padding: {
            type: String as () => CardOptions['padding'],
            default: 'md',
        },
        interactive: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const classes = computed(() => {
            return getCardClasses({
                variant: props.variant,
                padding: props.padding,
                interactive: props.interactive,
            });
        });

        useStyle(() => classes.value);

        return () =>
            h(
                'div',
                {
                    attrs,
                    class: classes.value,
                    on: listeners,
                },
                slots.default ? slots.default() : [],
            );
    },
});
