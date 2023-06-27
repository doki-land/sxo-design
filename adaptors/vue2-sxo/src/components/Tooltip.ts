import { useTooltip } from '@sxo/design';
import { getTooltipClasses, type TooltipOptions } from '@sxo/ui';
import { computed, defineComponent, h, ref, getCurrentInstance } from 'vue';
import { useStyle } from '../hooks';

export const Tooltip = defineComponent({
    name: 'SxoTooltip',
    props: {
        content: {
            type: [String, Object] as () => string | any,
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

        return () =>
            h('div', { class: 'relative inline-block' }, [
                h(
                    'div',
                    {
                        attrs: { ...triggerProps.attrs },
                        on: { ...triggerProps.on, ...listeners },
                    },
                    slots.default?.(),
                ),
                isOpen.value
                    ? h(
                          'div',
                          {
                              attrs: { ...getTooltipProps().attrs },
                              class: `${styles.value.content} ${
                                  attrs.class || ''
                              } bottom-full left-1/2 -translate-x-1/2 mb-2`.trim(),
                          },
                          slots.content ? slots.content() : props.content,
                      )
                    : null,
            ]);
    },
});
