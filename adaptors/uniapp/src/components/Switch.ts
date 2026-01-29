import { useToggle } from '@sxo/design';
import { getSwitchClasses, type SwitchOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref, watch, mergeProps } from 'vue';
import { useStyle } from '../hooks';

export const Switch = defineComponent({
    name: 'SxoSwitch',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<SwitchOptions['size']>,
            default: 'md',
        },
        color: {
            type: String as PropType<SwitchOptions['color']>,
            default: 'primary',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, attrs }) {
        const internalValue = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (val) => {
                internalValue.value = val;
            },
        );

        const { getToggleProps } = useToggle(internalValue.value);

        const classes = computed(() =>
            getSwitchClasses(internalValue.value, {
                size: props.size,
                color: props.color,
                disabled: props.disabled,
            }),
        );

        useStyle(() => `${classes.value.track} ${classes.value.thumb} ${attrs.class || ''}`);

        const handleToggle = (e: MouseEvent) => {
            if (props.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }
            internalValue.value = !internalValue.value;
            emit('update:modelValue', internalValue.value);
            emit('change', internalValue.value);
        };

        return () =>
            h(
                'div',
                mergeProps(getToggleProps(), attrs, {
                    class: classes.value.track,
                    onClick: handleToggle,
                }),
                [h('span', { class: classes.value.thumb })],
            );
    },
});
