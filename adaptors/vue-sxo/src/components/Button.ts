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
        loading: {
            type: Boolean,
            default: false,
        },
        rounded: {
            type: String as PropType<ButtonOptions['rounded']>,
            default: 'md',
        },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => {
            return getButtonClasses({
                variant: props.variant,
                size: props.size,
                disabled: props.disabled,
                loading: props.loading,
                rounded: props.rounded,
            });
        });

        useStyle(() => `${styles.value.container} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'button',
                {
                    ...attrs,
                    class: [styles.value.container, attrs.class],
                    disabled: props.disabled || props.loading,
                },
                [
                    props.loading
                        ? h(
                              'svg',
                              {
                                  class: styles.value.spinner,
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
                                      'stroke-width': '4',
                                  }),
                                  h('path', {
                                      class: 'opacity-75',
                                      fill: 'currentColor',
                                      d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                                  }),
                              ],
                          )
                        : null,
                    slots.default?.(),
                ],
            );
    },
});
