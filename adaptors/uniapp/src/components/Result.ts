import { getResultClasses, type ResultOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Result = defineComponent({
    name: 'SxoResult',
    props: {
        status: { type: String as PropType<ResultOptions['status']>, default: 'info' },
        title: { type: String, default: '' },
        subTitle: { type: String, default: '' },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getResultClasses({ status: props.status }));

        useStyle(() => {
            const s = styles.value;
            return `${s.container} ${s.icon} ${s.title} ${s.subTitle} ${s.extra} ${
                attrs.class || ''
            }`;
        });

        const renderIcon = () => {
            if (slots.icon) return h('div', { class: styles.value.icon }, slots.icon());

            const icons = {
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
                '404': h('div', { class: 'text-6xl font-black opacity-20' }, '404'),
                '500': h('div', { class: 'text-6xl font-black opacity-20' }, '500'),
                '403': h('div', { class: 'text-6xl font-black opacity-20' }, '403'),
            };

            return h('div', { class: styles.value.icon }, icons[props.status || 'info']);
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                renderIcon(),
                h('div', { class: styles.value.title }, slots.title ? slots.title() : props.title),
                h(
                    'div',
                    { class: styles.value.subTitle },
                    slots.subTitle ? slots.subTitle() : props.subTitle,
                ),
                slots.extra && h('div', { class: styles.value.extra }, slots.extra()),
                slots.default?.(),
            ]);
    },
});
