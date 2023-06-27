import { defineComponent, h, computed, ref, onMounted, onUnmounted } from 'vue';
import { getSliderClasses } from '@sxo/ui';

export const Slider = defineComponent({
    name: 'SxoSlider',
    props: {
        modelValue: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        step: { type: Number, default: 1 },
        disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, attrs }) {
        const sliderRef = ref<HTMLElement | null>(null);
        const isDragging = ref(false);
        const styles = computed(() => getSliderClasses({ disabled: props.disabled }));

        const percentage = computed(() => {
            return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
        });

        const updateValue = (clientX: number) => {
            if (props.disabled || !sliderRef.value) return;

            const rect = sliderRef.value.getBoundingClientRect();
            let pos = (clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));

            let value = props.min + pos * (props.max - props.min);
            value = Math.round(value / props.step) * props.step;
            value = Math.max(props.min, Math.min(props.max, value));

            emit('update:modelValue', value);
            emit('change', value);
        };

        const onMouseDown = (e: MouseEvent) => {
            if (props.disabled) return;
            isDragging.value = true;
            updateValue(e.clientX);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging.value) {
                updateValue(e.clientX);
            }
        };

        const onMouseUp = () => {
            isDragging.value = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        onUnmounted(() => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        });

        return () =>
            h(
                'div',
                {
                    ref: sliderRef,
                    class: [styles.value.container, attrs.class],
                    onMousedown: onMouseDown,
                },
                [
                    h('div', { class: styles.value.track }, [
                        h('div', {
                            class: styles.value.range,
                            style: { width: `${percentage.value}%` },
                        }),
                    ]),
                    h('div', {
                        class: styles.value.handle,
                        style: { left: `${percentage.value}%`, transform: 'translateX(-50%)' },
                    }),
                ],
            );
    },
});
