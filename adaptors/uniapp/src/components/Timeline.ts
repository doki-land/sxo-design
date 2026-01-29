import { getTimelineClasses, type TimelineOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';

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
            h('view', { class: [styles.value.item, attrs.class] }, [
                h('view', { class: styles.value.tail }),
                h('view', {
                    class: styles.value.dot,
                    style: props.color ? { backgroundColor: props.color } : undefined,
                }),
                h('view', { class: styles.value.content }, [
                    (props.label || slots.label) &&
                        h(
                            'view',
                            { class: styles.value.label },
                            slots.label ? slots.label() : props.label,
                        ),
                    (props.title || slots.title) &&
                        h(
                            'view',
                            { class: styles.value.title },
                            slots.title ? slots.title() : props.title,
                        ),
                    (props.description || slots.default) &&
                        h(
                            'view',
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

        return () => h('view', { class: [styles.value.container, attrs.class] }, slots.default?.());
    },
});
