import { type DividerOptions, getDividerClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Divider = defineComponent({
    name: 'SxoDivider',
    props: {
        direction: {
            type: String as PropType<DividerOptions['direction']>,
            default: 'horizontal',
        },
        type: {
            type: String as PropType<DividerOptions['type']>,
            default: 'solid',
        },
        contentPlacement: {
            type: String as PropType<DividerOptions['contentPlacement']>,
            default: 'center',
        },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() =>
            getDividerClasses({
                direction: props.direction,
                type: props.type,
                contentPlacement: props.contentPlacement,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [s.container, s.line, s.lineLeft, s.lineRight, s.text, attrs.class]
                .filter(Boolean)
                .join(' ');
        });

        return () => {
            if (props.direction === 'vertical') {
                return h('view', { class: [styles.value.container, attrs.class] });
            }

            const hasContent = slots.default;

            if (!hasContent) {
                return h('view', { class: [styles.value.line, 'my-4', attrs.class] });
            }

            return h('view', { class: [styles.value.container, attrs.class] }, [
                h('view', { class: [styles.value.line, styles.value.lineLeft] }),
                h(
                    'text',
                    { class: styles.value.text },
                    (slots.default ? slots.default() : null) as any,
                ),
                h('view', { class: [styles.value.line, styles.value.lineRight] }),
            ]);
        };
    },
});
