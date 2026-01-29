import { type EmptyOptions, getEmptyClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Empty = defineComponent({
    name: 'SxoEmpty',
    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: 'No Data',
        },
        size: {
            type: String as PropType<EmptyOptions['size']>,
            default: 'md',
        },
        image: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() =>
            getEmptyClasses({
                size: props.size,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [s.container, s.image, s.description, s.extra, attrs.class]
                .filter(Boolean)
                .join(' ');
        });

        const renderImage = () => {
            if (slots.image) return h('div', { class: styles.value.image }, slots.image());
            if (props.image)
                return h('img', { src: props.image, class: styles.value.image, alt: 'empty' });

            // Default empty illustration (SVG - Box/Inbox)
            return h(
                'svg',
                {
                    viewBox: '0 0 24 24',
                    class: [styles.value.image, 'opacity-20'],
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '1',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                },
                [
                    h('path', {
                        d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
                    }),
                    h('path', { d: 'm3.3 7 8.7 5 8.7-5' }),
                    h('path', { d: 'M12 22V12' }),
                ],
            );
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                renderImage(),
                h('div', { class: 'flex flex-col gap-1' }, [
                    props.title &&
                        h(
                            'div',
                            { class: 'text-base font-semibold text-neutral-600' },
                            slots.title ? slots.title() : props.title,
                        ),
                    h(
                        'div',
                        { class: styles.value.description },
                        slots.default ? slots.default() : props.description,
                    ),
                ]),
                slots.extra && h('div', { class: styles.value.extra }, slots.extra()),
            ]);
    },
});
