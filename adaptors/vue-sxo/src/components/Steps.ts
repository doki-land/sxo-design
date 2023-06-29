import { getStepsClasses, type StepsOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';

export const Step = defineComponent({
    name: 'SxoStep',
    props: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        status: { type: String as PropType<'pending' | 'process' | 'completed' | 'error'> },
        index: { type: Number },
        current: { type: Number },
        isLast: { type: Boolean, default: false },
        direction: { type: String as PropType<StepsOptions['direction']>, default: 'horizontal' },
    },
    setup(props, { slots }) {
        const stepStatus = computed(() => {
            if (props.status) return props.status;
            if (props.index! < props.current!) return 'completed';
            if (props.index! === props.current!) return 'process';
            return 'pending';
        });

        const styles = computed(() => getStepsClasses({ direction: props.direction }));

        const renderIcon = () => {
            const status = stepStatus.value;
            const iconClass = [
                styles.value.icon,
                status === 'pending' && styles.value.iconPending,
                status === 'process' && styles.value.iconProcess,
                status === 'completed' && styles.value.iconCompleted,
            ].join(' ');

            if (status === 'completed') {
                return h('div', { class: iconClass }, [
                    h(
                        'svg',
                        {
                            viewBox: '0 0 24 24',
                            class: 'w-5 h-5',
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': '3',
                        },
                        [h('polyline', { points: '20 6 9 17 4 12' })],
                    ),
                ]);
            }

            return h('div', { class: iconClass }, (props.index! + 1).toString());
        };

        return () =>
            h('div', { class: styles.value.item }, [
                h('div', { class: styles.value.head }, [
                    h('div', { class: styles.value.iconContainer }, [renderIcon()]),
                    !props.isLast &&
                        props.direction === 'horizontal' &&
                        h('div', {
                            class: [
                                styles.value.line,
                                stepStatus.value === 'completed'
                                    ? styles.value.lineCompleted
                                    : styles.value.linePending,
                            ],
                        }),
                ]),
                h('div', { class: styles.value.content }, [
                    h(
                        'div',
                        {
                            class: [
                                styles.value.title,
                                stepStatus.value === 'pending' && styles.value.titlePending,
                                stepStatus.value === 'process' && styles.value.titleProcess,
                                stepStatus.value === 'completed' && styles.value.titleCompleted,
                            ],
                        },
                        slots.title ? slots.title() : props.title,
                    ),
                    (props.description || slots.description) &&
                        h(
                            'div',
                            { class: styles.value.description },
                            slots.description ? slots.description() : props.description,
                        ),
                ]),
                !props.isLast &&
                    props.direction === 'vertical' &&
                    h('div', {
                        class: [
                            styles.value.line,
                            stepStatus.value === 'completed'
                                ? styles.value.lineCompleted
                                : styles.value.linePending,
                        ],
                    }),
            ]);
    },
});

export const Steps = defineComponent({
    name: 'SxoSteps',
    props: {
        current: { type: Number, default: 0 },
        direction: { type: String as PropType<StepsOptions['direction']>, default: 'horizontal' },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getStepsClasses({ direction: props.direction }));

        return () => {
            const children = slots.default ? slots.default() : [];
            // Filter out non-component children if any
            const steps = children.flatMap((child: any) => {
                if (child.type?.name === 'SxoStep') return child;
                if (Array.isArray(child.children)) return child.children;
                return child;
            });

            return h(
                'div',
                { class: [styles.value.container, attrs.class] },
                steps.map((step: any, index: number) => {
                    return h(step, {
                        index,
                        current: props.current,
                        direction: props.direction,
                        isLast: index === steps.length - 1,
                    });
                }),
            );
        };
    },
});
