import { defineComponent, h, PropType, computed } from 'vue';
import { getAlertClasses, AlertOptions } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Alert = defineComponent({
    name: 'SxoAlert',
    props: {
        type: {
            type: String as PropType<AlertOptions['type']>,
            default: 'info',
        },
        variant: {
            type: String as PropType<AlertOptions['variant']>,
            default: 'subtle',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        closable: {
            type: Boolean,
            default: false,
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['close'],
    setup(props, { emit, slots, attrs }) {
        const styles = computed(() =>
            getAlertClasses({
                type: props.type,
                variant: props.variant,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [
                s.container,
                s.icon,
                s.content,
                s.title,
                s.description,
                s.closeButton,
                attrs.class,
            ]
                .filter(Boolean)
                .join(' ');
        });

        const renderIcon = () => {
            if (!props.showIcon) return null;
            if (slots.icon) return h('div', { class: styles.value.icon }, slots.icon());

            // Default icons based on type
            const icons = {
                info: h(
                    'svg',
                    {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                    },
                    [
                        h('circle', { cx: '12', cy: '12', r: '10' }),
                        h('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
                        h('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' }),
                    ],
                ),
                success: h(
                    'svg',
                    {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                    },
                    [
                        h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
                        h('polyline', { points: '22 4 12 14.01 9 11.01' }),
                    ],
                ),
                warning: h(
                    'svg',
                    {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                    },
                    [
                        h('path', {
                            d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
                        }),
                        h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
                        h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' }),
                    ],
                ),
                error: h(
                    'svg',
                    {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                    },
                    [
                        h('circle', { cx: '12', cy: '12', r: '10' }),
                        h('line', { x1: '15', y1: '9', x2: '9', y2: '15' }),
                        h('line', { x1: '9', y1: '9', x2: '15', y2: '15' }),
                    ],
                ),
            };

            return h('div', { class: styles.value.icon }, icons[props.type || 'info']);
        };

        const handleClose = (e: MouseEvent) => {
            emit('close', e);
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                renderIcon(),
                h('div', { class: styles.value.content }, [
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
                props.closable &&
                    h(
                        'div',
                        { class: styles.value.closeButton, onClick: handleClose },
                        h(
                            'svg',
                            {
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                                class: 'w-4 h-4',
                            },
                            [
                                h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                h('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                            ],
                        ),
                    ),
            ]);
    },
});
