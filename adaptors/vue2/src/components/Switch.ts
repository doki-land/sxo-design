import { getSwitchClasses, type SwitchOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, ref, watch } from 'vue';
import { useStyle } from '../hooks';

export const Switch = defineComponent({
    name: 'SxoSwitch',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as () => SwitchOptions['size'],
            default: 'md',
        },
        color: {
            type: String as () => SwitchOptions['color'],
            default: 'primary',
        },
    },
    setup(props, { emit, attrs }) {
        const internalValue = ref(props.value);

        watch(
            () => props.value,
            (val) => {
                internalValue.value = val;
            },
        );

        const classes = computed(() => {
            return getSwitchClasses(internalValue.value, {
                size: props.size,
                color: props.color,
                disabled: props.disabled,
            });
        });

        useStyle(() => `${classes.value.track} ${classes.value.thumb} ${attrs.class || ''}`);

        const handleToggle = () => {
            if (props.disabled) return;
            internalValue.value = !internalValue.value;
            emit('input', internalValue.value);
            emit('change', internalValue.value);
        };

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        return () =>
            h(
                'div',
                {
                    class: `${classes.value.track} ${
                        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${attrs.class || ''}`.trim(),
                    on: {
                        click: handleToggle,
                        ...listeners,
                    },
                },
                [h('span', { class: classes.value.thumb })],
            );
    },
});
