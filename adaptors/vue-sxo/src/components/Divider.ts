import { defineComponent, h, PropType, computed } from 'vue';
import { getDividerClasses, DividerOptions } from '@sxo/ui';
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
                return h('div', { class: [styles.value.container, attrs.class] });
            }

            const hasContent = slots.default;

            if (!hasContent) {
                return h('div', { class: [styles.value.line, 'my-4', attrs.class] });
            }

            return h('div', { class: [styles.value.container, attrs.class] }, [
                h('div', { class: [styles.value.line, styles.value.lineLeft] }),
                h('span', { class: styles.value.text }, slots.default()),
                h('div', { class: [styles.value.line, styles.value.lineRight] }),
            ]);
        };
    },
});
