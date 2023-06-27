import { defineComponent, h, computed, ref } from 'vue';
import { getRateClasses } from '@sxo/ui';

export const Rate = defineComponent({
    name: 'SxoRate',
    props: {
        modelValue: { type: Number, default: 0 },
        count: { type: Number, default: 5 },
        disabled: { type: Boolean, default: false },
        showText: { type: Boolean, default: false },
        texts: { type: Array as () => string[], default: () => [] },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, attrs }) {
        const hoverValue = ref(0);
        const styles = computed(() => getRateClasses({ disabled: props.disabled }));

        const displayValue = computed(() =>
            hoverValue.value > 0 ? hoverValue.value : props.modelValue,
        );

        const handleClick = (value: number) => {
            if (props.disabled) return;
            emit('update:modelValue', value);
            emit('change', value);
        };

        const handleMouseEnter = (value: number) => {
            if (props.disabled) return;
            hoverValue.value = value;
        };

        const handleMouseLeave = () => {
            if (props.disabled) return;
            hoverValue.value = 0;
        };

        const renderIcon = (isActive: boolean) => {
            return h(
                'svg',
                {
                    class: [
                        styles.value.icon,
                        isActive ? styles.value.iconActive : styles.value.iconInactive,
                    ],
                    viewBox: '0 0 24 24',
                    fill: isActive ? 'currentColor' : 'none',
                    stroke: 'currentColor',
                    'stroke-width': '2',
                },
                [
                    h('polygon', {
                        points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
                    }),
                ],
            );
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                ...Array.from({ length: props.count }).map((_, i) => {
                    const value = i + 1;
                    return h(
                        'div',
                        {
                            class: styles.value.item,
                            onMouseenter: () => handleMouseEnter(value),
                            onMouseleave: handleMouseLeave,
                            onClick: () => handleClick(value),
                        },
                        [renderIcon(value <= displayValue.value)],
                    );
                }),
                props.showText &&
                    h(
                        'span',
                        { class: styles.value.text },
                        props.texts[displayValue.value - 1] || displayValue.value.toString(),
                    ),
            ]);
    },
});
