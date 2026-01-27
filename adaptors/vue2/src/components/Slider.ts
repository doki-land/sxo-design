import { getSliderClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, onUnmounted, ref } from 'vue';

export const Slider = defineComponent({
    name: 'SxoSlider',
    props: {
        value: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        step: { type: Number, default: 1 },
        disabled: { type: Boolean, default: false },
    },
    setup(props, { emit, attrs }) {
        const sliderRef = ref<HTMLElement | null>(null);
        const isDragging = ref(false);
        const styles = computed(() => getSliderClasses({ disabled: props.disabled }));

        const percentage = computed(() => {
            return ((props.value - props.min) / (props.max - props.min)) * 100;
        });

        const updateValue = (clientX: number) => {
            if (props.disabled || !sliderRef.value) return;

            const rect = sliderRef.value.getBoundingClientRect();
            let pos = (clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));

            let newValue = props.min + pos * (props.max - props.min);
            newValue = Math.round(newValue / props.step) * props.step;
            newValue = Math.max(props.min, Math.min(props.max, newValue));

            emit('input', newValue);
            emit('change', newValue);
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

        const onMouseDown = (e: MouseEvent) => {
            if (props.disabled) return;
            isDragging.value = true;
            updateValue(e.clientX);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        };

        onUnmounted(() => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        });

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        return () =>
            h(
                'div',
                {
                    ref: 'sliderRef',
                    class: [styles.value.container, attrs.class],
                    on: {
                        mousedown: onMouseDown,
                        ...listeners,
                    },
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
                        style: {
                            left: `${percentage.value}%`,
                            transform: 'translateX(-50%)',
                        },
                    }),
                ],
            );
    },
    // Handle ref in Vue 2 setup
    mounted() {
        (this as any).sliderRef = this.$refs.sliderRef;
    },
});
