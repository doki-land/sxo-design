import { getSearchClasses, type SearchOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref } from 'vue';
import { useStyle } from '../hooks';

export const Search = defineComponent({
    name: 'SxoSearch',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Search...',
        },
        variant: {
            type: String as PropType<SearchOptions['variant']>,
            default: 'outline',
        },
        size: {
            type: String as PropType<SearchOptions['size']>,
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
    emits: ['update:modelValue', 'search', 'clear'],
    setup(props, { emit, attrs }) {
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
            return `${s.container} ${(s as any).input} ${s.icon} ${(s as any).clearButton || s.clear} ${attrs.class || ''}`;
        });

        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            emit('update:modelValue', target.value);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                emit('search', props.modelValue);
            }
        };

        const handleClear = () => {
            emit('update:modelValue', '');
            emit('clear');
            inputRef.value?.focus();
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                // Search Icon
                h(
                    'span',
                    { class: styles.value.icon },
                    h(
                        'svg',
                        {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': '2',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            class: 'w-full h-full',
                        },
                        [
                            h('circle', { cx: '11', cy: '11', r: '8' }),
                            h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
                        ],
                    ),
                ),

                // Input Field
                h('input', {
                    ref: inputRef,
                    type: 'text',
                    class: styles.value.input,
                    placeholder: props.placeholder,
                    value: props.modelValue,
                    onInput: handleInput,
                    onKeydown: handleKeyDown,
                    ...attrs,
                }),

                // Clear Button
                props.modelValue &&
                    h(
                        'span',
                        {
                            class: (styles.value as any).clearButton || styles.value.clear,
                            onClick: handleClear,
                        },
                        [
                            h(
                                'svg',
                                {
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round',
                                    class: 'w-full h-full',
                                },
                                [
                                    h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                    h('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                ],
                            ),
                        ],
                    ),
            ]);
    },
});
