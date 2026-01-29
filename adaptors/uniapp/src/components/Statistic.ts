import { getStatisticClasses } from '@sxo/ui';
import { computed, defineComponent, h } from 'vue';

export const Statistic = defineComponent({
    name: 'SxoStatistic',
    props: {
        title: { type: String, default: '' },
        value: { type: [String, Number], default: '' },
        prefix: { type: String, default: '' },
        suffix: { type: String, default: '' },
        precision: { type: Number, default: 0 },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getStatisticClasses());

        const formattedValue = computed(() => {
            if (typeof props.value === 'number') {
                return props.value.toFixed(props.precision);
            }
            return props.value;
        });

        return () =>
            h('view', { class: [styles.value.container, attrs.class] }, [
                h('view', { class: styles.value.label }, slots.title ? slots.title() : props.title),
                h('view', { class: styles.value.content }, [
                    (props.prefix || slots.prefix) &&
                        h(
                            'text',
                            { class: styles.value.prefix },
                            slots.prefix ? slots.prefix() : props.prefix,
                        ),
                    h('text', { class: styles.value.value }, formattedValue.value),
                    (props.suffix || slots.suffix) &&
                        h(
                            'text',
                            { class: styles.value.suffix },
                            slots.suffix ? slots.suffix() : props.suffix,
                        ),
                ]),
            ]);
    },
});
