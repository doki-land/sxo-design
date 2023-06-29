import { type EmptyOptions, getEmptyClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useStyle } from '../hooks';

export const Empty = defineComponent({
    name: 'SxoEmpty',
    props: {
        description: {
            type: String,
            default: 'No Data',
        },
        size: {
            type: String as () => EmptyOptions['size'],
            default: 'md',
        },
        image: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

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
                return h('img', {
                    attrs: { src: props.image, alt: 'empty' },
                    class: styles.value.image,
                });

            return h(
                'svg',
                {
                    attrs: {
                        viewBox: '0 0 100 100',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '1.5',
                    },
                    class: styles.value.image,
                },
                [
                    h('rect', { attrs: { x: '20', y: '20', width: '60', height: '60', rx: '8' } }),
                    h('path', { attrs: { d: 'M20 40h60M40 20v60' } }),
                    h('circle', { attrs: { cx: '50', cy: '50', r: '10', opacity: '0.5' } }),
                ],
            );
        };

        return () =>
            h(
                'div',
                {
                    class: [styles.value.container, attrs.class],
                    attrs,
                    on: listeners,
                },
                [
                    renderImage(),
                    h(
                        'div',
                        { class: styles.value.description },
                        slots.default ? slots.default() : props.description,
                    ),
                    slots.extra && h('div', { class: styles.value.extra }, slots.extra()),
                ],
            );
    },
});
