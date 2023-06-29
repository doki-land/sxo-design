import { getMentionsClasses, type MentionsOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref } from 'vue';

export interface MentionOption {
    value: string;
    label?: string;
    avatar?: string;
}

export const Mentions = defineComponent({
    name: 'SxoMentions',
    props: {
        /** 输入框内容 */
        modelValue: { type: String, default: '' },
        /** 选项列表 */
        options: { type: Array as PropType<MentionOption[]>, default: () => [] },
        /** 触发前缀 */
        prefix: { type: [String, Array] as PropType<string | string[]>, default: '@' },
        /** 占位提示语 */
        placeholder: { type: String, default: '' },
        /** 尺寸 */
        size: { type: String as PropType<MentionsOptions['size']>, default: 'md' },
        /** 状态 */
        status: { type: String as PropType<MentionsOptions['status']> },
    },
    emits: ['update:modelValue', 'select', 'search'],
    setup(props, { emit }) {
        const showSuggestions = ref(false);
        const suggestionIndex = ref(0);
        const searchText = ref('');
        const textareaRef = ref<HTMLTextAreaElement | null>(null);
        const cursorPosition = ref(0);

        const classes = computed(() =>
            getMentionsClasses({
                size: props.size,
                status: props.status,
            }),
        );

        const prefixes = computed(() =>
            Array.isArray(props.prefix) ? props.prefix : [props.prefix],
        );

        const filteredOptions = computed(() => {
            if (!searchText.value) return props.options;
            return props.options.filter((opt) =>
                (opt.label || opt.value).toLowerCase().includes(searchText.value.toLowerCase()),
            );
        });

        const handleInput = (e: Event) => {
            const target = e.target as HTMLTextAreaElement;
            const val = target.value;
            const pos = target.selectionStart;
            cursorPosition.value = pos;
            emit('update:modelValue', val);

            const textBeforeCursor = val.substring(0, pos);
            const _lastChar = textBeforeCursor[textBeforeCursor.length - 1];

            const matchPrefix = prefixes.value.find((p) => textBeforeCursor.endsWith(p));

            if (matchPrefix) {
                showSuggestions.value = true;
                searchText.value = '';
                suggestionIndex.value = 0;
            } else if (showSuggestions.value) {
                // 继续搜索
                const parts = textBeforeCursor.split(new RegExp(`[${prefixes.value.join('')}]`));
                searchText.value = parts[parts.length - 1];
                if (textBeforeCursor.includes(' ') || textBeforeCursor.includes('\n')) {
                    showSuggestions.value = false;
                }
            }
        };

        const selectOption = (option: MentionOption) => {
            const val = props.modelValue;
            const pos = cursorPosition.value;
            const textBeforeCursor = val.substring(0, pos);

            const lastPrefixIndex = Math.max(
                ...prefixes.value.map((p) => textBeforeCursor.lastIndexOf(p)),
            );

            const newVal = `${val.substring(0, lastPrefixIndex + 1) + option.value} ${val.substring(pos)}`;

            emit('update:modelValue', newVal);
            emit('select', option);
            showSuggestions.value = false;

            if (textareaRef.value) {
                textareaRef.value.focus();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!showSuggestions.value) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                suggestionIndex.value = (suggestionIndex.value + 1) % filteredOptions.value.length;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                suggestionIndex.value =
                    (suggestionIndex.value - 1 + filteredOptions.value.length) %
                    filteredOptions.value.length;
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredOptions.value[suggestionIndex.value]) {
                    selectOption(filteredOptions.value[suggestionIndex.value]);
                }
            } else if (e.key === 'Escape') {
                showSuggestions.value = false;
            }
        };

        return () =>
            h('div', { class: classes.value.container }, [
                h('textarea', {
                    ref: textareaRef,
                    class: classes.value.textarea,
                    value: props.modelValue,
                    placeholder: props.placeholder,
                    onInput: handleInput,
                    onKeydown: handleKeyDown,
                    onBlur: () => setTimeout(() => (showSuggestions.value = false), 200),
                }),
                showSuggestions.value &&
                    filteredOptions.value.length > 0 &&
                    h(
                        'div',
                        { class: classes.value.dropdown },
                        filteredOptions.value.map((opt, i) =>
                            h(
                                'div',
                                {
                                    class: [
                                        classes.value.item,
                                        i === suggestionIndex.value && classes.value.itemActive,
                                    ],
                                    onMouseover: () => (suggestionIndex.value = i),
                                    onClick: () => selectOption(opt),
                                },
                                [
                                    opt.avatar
                                        ? h('img', { src: opt.avatar, class: classes.value.avatar })
                                        : h(
                                              'div',
                                              { class: classes.value.avatar },
                                              (opt.label || opt.value)[0].toUpperCase(),
                                          ),
                                    h('span', opt.label || opt.value),
                                ],
                            ),
                        ),
                    ),
            ]);
    },
});
