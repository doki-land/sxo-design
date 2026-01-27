import { computed, defineComponent, h, type PropType, mergeProps } from 'vue';
import { getButtonClasses, type ButtonOptions } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Button = defineComponent({
    name: 'SxoButton',
    inheritAttrs: false,
    props: {
        variant: {
            type: String as PropType<ButtonOptions['variant']>,
            default: 'primary',
        },
        size: {
            type: String as PropType<ButtonOptions['size']>,
            default: 'md',
        },
        rounded: {
            type: String as PropType<ButtonOptions['rounded']>,
            default: 'md',
        },
        disabled: Boolean,
        loading: Boolean,
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() =>
            getButtonClasses({
                variant: props.variant,
                size: props.size,
                rounded: props.rounded,
                disabled: props.disabled,
                loading: props.loading,
            }),
        );

        useStyle(() => `${styles.value.container} ${attrs.class || ''}`.trim());

        const onClick = (e: MouseEvent) => {
            if (props.disabled || props.loading) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }
            
            // Manually trigger the onClick from attrs if it exists
            const userHandler = attrs.onClick;
            if (userHandler) {
                if (Array.isArray(userHandler)) {
                    userHandler.forEach((h: Function) => h(e));
                } else {
                    (userHandler as Function)(e);
                }
            }
        };

        return () =>
            h(
                'button',
                {
                    ...attrs,
                    type: 'button',
                    class: [styles.value.container, attrs.class],
                    disabled: props.disabled || props.loading,
                    onClick,
                },
                [
                    props.loading &&
                        h('span', { class: styles.value.spinner }, [
                            h(
                                'svg',
                                {
                                    class: 'animate-spin h-4 w-4',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    fill: 'none',
                                    viewBox: '0 0 24 24',
                                },
                                [
                                    h('circle', {
                                        class: 'opacity-25',
                                        cx: '12',
                                        cy: '12',
                                        r: '10',
                                        stroke: 'currentColor',
                                        strokeWidth: '4',
                                    }),
                                    h('path', {
                                        class: 'opacity-75',
                                        fill: 'currentColor',
                                        d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                                    }),
                                ],
                            ),
                        ]),
                    slots.default?.(),
                ],
            );
    },
});
