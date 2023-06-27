import { defineComponent, h, computed } from 'vue';
import { getStatisticClasses } from '@sxo/ui';

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
            h('div', { class: [styles.value.container, attrs.class] }, [
                h('div', { class: styles.value.label }, slots.title ? slots.title() : props.title),
                h('div', { class: styles.value.content }, [
                    (props.prefix || slots.prefix) &&
                        h(
                            'span',
                            { class: styles.value.prefix },
                            slots.prefix ? slots.prefix() : props.prefix,
                        ),
                    h('span', { class: styles.value.value }, formattedValue.value),
                    (props.suffix || slots.suffix) &&
                        h(
                            'span',
                            { class: styles.value.suffix },
                            slots.suffix ? slots.suffix() : props.suffix,
                        ),
                ]),
            ]);
    },
});
