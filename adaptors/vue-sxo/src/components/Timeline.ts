import { defineComponent, h, PropType, computed } from 'vue';
import { getTimelineClasses, TimelineOptions } from '@sxo/ui';

export const TimelineItem = defineComponent({
    name: 'SxoTimelineItem',
    props: {
        label: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        color: { type: String, default: '' },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getTimelineClasses());

        return () =>
            h('div', { class: [styles.value.item, attrs.class] }, [
                h('div', { class: styles.value.tail }),
                h('div', {
                    class: styles.value.dot,
                    style: props.color ? { backgroundColor: props.color } : undefined,
                }),
                h('div', { class: styles.value.content }, [
                    (props.label || slots.label) &&
                        h(
                            'div',
                            { class: styles.value.label },
                            slots.label ? slots.label() : props.label,
                        ),
                    (props.title || slots.title) &&
                        h(
                            'div',
                            { class: styles.value.title },
                            slots.title ? slots.title() : props.title,
                        ),
                    (props.description || slots.default) &&
                        h(
                            'div',
                            { class: styles.value.description },
                            slots.default ? slots.default() : props.description,
                        ),
                ]),
            ]);
    },
});

export const Timeline = defineComponent({
    name: 'SxoTimeline',
    props: {
        mode: { type: String as PropType<TimelineOptions['mode']>, default: 'left' },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getTimelineClasses({ mode: props.mode }));

        return () => h('div', { class: [styles.value.container, attrs.class] }, slots.default?.());
    },
});
