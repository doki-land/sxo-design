import { defineComponent, h, computed } from 'vue';
import { getDescriptionsClasses } from '@sxo/ui';

export const DescriptionsItem = defineComponent({
    name: 'SxoDescriptionsItem',
    props: {
        label: { type: String, default: '' },
    },
    setup(props, { slots }) {
        const styles = computed(() => getDescriptionsClasses());

        return () =>
            h('div', { class: styles.value.item }, [
                h('div', { class: styles.value.label }, slots.label ? slots.label() : props.label),
                h('div', { class: styles.value.content }, slots.default?.()),
            ]);
    },
});

export const Descriptions = defineComponent({
    name: 'SxoDescriptions',
    props: {
        title: { type: String, default: '' },
        extra: { type: String, default: '' },
        column: { type: Number, default: 3 },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getDescriptionsClasses());

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                (props.title || slots.title || props.extra || slots.extra) &&
                    h('div', { class: styles.value.header }, [
                        h(
                            'div',
                            { class: styles.value.title },
                            slots.title ? slots.title() : props.title,
                        ),
                        h(
                            'div',
                            { class: styles.value.extra },
                            slots.extra ? slots.extra() : props.extra,
                        ),
                    ]),
                h(
                    'div',
                    {
                        class: styles.value.body,
                        style: {
                            gridTemplateColumns: `repeat(${props.column}, minmax(0, 1fr))`,
                        },
                    },
                    slots.default?.(),
                ),
            ]);
    },
});
