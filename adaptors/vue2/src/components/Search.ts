import { getSearchClasses, type SearchOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, ref } from 'vue';
import { useStyle } from '../hooks';

export const Search = defineComponent({
    name: 'SxoSearch',
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Search...',
        },
        variant: {
            type: String as () => SearchOptions['variant'],
            default: 'outline',
        },
        size: {
            type: String as () => SearchOptions['size'],
            default: 'md',
        },
        rounded: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const inputRef = ref<HTMLInputElement | null>(null);

        const styles = computed(() =>
            getSearchClasses({
                variant: props.variant,
                size: props.size,
                rounded: props.rounded,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return `${s.container} ${s.input} ${s.icon} ${s.clear} ${attrs.class || ''}`;
        });

        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            emit('input', target.value);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                emit('search', props.value);
            }
        };

        const handleClear = () => {
            emit('input', '');
            emit('clear');
            inputRef.value?.focus();
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                // Search Icon
                h('span', { class: styles.value.icon }, [
                    h(
                        'svg',
                        {
                            attrs: {
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                            },
                            class: 'w-full h-full',
                        },
                        [
                            h('circle', { attrs: { cx: '11', cy: '11', r: '8' } }),
                            h('line', {
                                attrs: { x1: '21', y1: '21', x2: '16.65', y2: '16.65' },
                            }),
                        ],
                    ),
                ]),

                // Input Field
                h('input', {
                    ref: 'inputRef',
                    attrs: {
                        ...attrs,
                        type: 'text',
                        placeholder: props.placeholder,
                    },
                    domProps: {
                        value: props.value,
                    },
                    class: styles.value.input,
                    on: {
                        ...listeners,
                        input: handleInput,
                        keydown: handleKeyDown,
                    },
                }),

                // Clear Button
                props.value &&
                    h(
                        'span',
                        {
                            class: styles.value.clear,
                            on: {
                                click: handleClear,
                            },
                        },
                        [
                            h(
                                'svg',
                                {
                                    attrs: {
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                    },
                                    class: 'w-full h-full',
                                },
                                [
                                    h('line', { attrs: { x1: '18', y1: '6', x2: '6', y2: '18' } }),
                                    h('line', { attrs: { x1: '6', y1: '6', x2: '18', y2: '18' } }),
                                ],
                            ),
                        ],
                    ),
            ]);
    },
});
