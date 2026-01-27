import { useTooltip } from '@sxo/design';
import { getTooltipClasses, type TooltipOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, ref } from 'vue';
import { useStyle } from '../hooks';

export const Tooltip = defineComponent({
    name: 'SxoTooltip',
    props: {
        content: {
            type: [String, Object] as any,
            required: true,
        },
        delay: {
            type: Number,
            default: 200,
        },
        variant: {
            type: String as () => TooltipOptions['variant'],
            default: 'dark',
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const isOpen = ref(false);

        const { getTriggerProps, getTooltipProps } = useTooltip({
            delay: props.delay,
            defaultOpen: isOpen.value,
        });

        const styles = computed(() => getTooltipClasses({ variant: props.variant }));

        useStyle(() => `${styles.value.content} ${attrs.class || ''}`);

        const triggerProps = getTriggerProps(
            () => {
                isOpen.value = true;
            },
            () => {
                isOpen.value = false;
            },
        );

        return () => {
            const tooltipProps = getTooltipProps();
            return h('div', { class: 'relative inline-block' }, [
                h(
                    'div',
                    {
                        attrs: {
                            'aria-describedby': triggerProps['aria-describedby'],
                        },
                        on: {
                            mouseenter: triggerProps.onMouseEnter,
                            mouseleave: triggerProps.onMouseLeave,
                            focus: triggerProps.onFocus,
                            blur: triggerProps.onBlur,
                            ...listeners,
                        },
                    },
                    slots.default?.(),
                ),
                isOpen.value
                    ? h(
                          'div',
                          {
                              attrs: {
                                  id: tooltipProps.id,
                                  role: tooltipProps.role,
                              },
                              class: `${styles.value.content} ${
                                  attrs.class || ''
                              } bottom-full left-1/2 -translate-x-1/2 mb-2`.trim(),
                          },
                          slots.content ? slots.content() : props.content,
                      )
                    : null,
            ]);
        };
    },
});
