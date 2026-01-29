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
            if (slots.image) return h('view', { class: styles.value.image }, slots.image());
            if (props.image)
                return h('image', { src: props.image, class: styles.value.image, mode: 'aspectFit' });

            // UniApp 中不直接使用 SVG，暂时简单处理
            return h('view', { class: 'flex items-center justify-center p-4 bg-neutral-50 rounded-full w-20 h-20 mb-4 mx-auto' });
        };

        return () =>
            h('view', { class: [styles.value.container, attrs.class] }, [
                renderImage(),
                h('view', { class: 'flex flex-col gap-1' }, [
                    props.title &&
                        h(
                            'view',
                            { class: 'text-base font-semibold text-neutral-600' },
                            slots.title ? slots.title() : props.title,
                        ),
                    h(
                        'view',
                        { class: styles.value.description },
                        slots.default ? slots.default() : props.description,
                    ),
                ]),
                slots.extra && h('view', { class: styles.value.extra }, slots.extra()),
            ]);
    },
});
