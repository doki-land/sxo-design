import { getTreeSelectClasses, type TreeSelectOptions } from '@sxo/ui';
import { computed, defineComponent, h, onMounted, onUnmounted, type PropType, ref } from 'vue';
import { Tree } from './Tree';

export interface TreeSelectOption {
    id: string | number;
    label: string;
    children?: TreeSelectOption[];
    disabled?: boolean;
}

export const TreeSelect = defineComponent({
    name: 'SxoTreeSelect',
    props: {
        /** 选中的 key */
        modelValue: { type: [String, Number] as PropType<string | number> },
        /** 树节点数据 */
        options: { type: Array as PropType<TreeSelectOption[]>, default: () => [] },
        /** 占位提示语 */
        placeholder: { type: String, default: 'Please select' },
        /** 尺寸 */
        size: { type: String as PropType<TreeSelectOptions['size']>, default: 'md' },
        /** 是否圆角 */
        rounded: { type: Boolean, default: true },
        /** 是否可搜索 */
        searchable: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const containerRef = ref<HTMLElement | null>(null);
        const searchText = ref('');

        const classes = computed(() =>
            getTreeSelectClasses({
                size: props.size,
                rounded: props.rounded,
            }),
        );

        const selectedLabel = computed(() => {
            if (props.modelValue === undefined || props.modelValue === null) return '';

            const findLabel = (options: TreeSelectOption[]): string | null => {
                for (const option of options) {
                    if (option.id === props.modelValue) return option.label;
                    if (option.children) {
                        const label = findLabel(option.children);
                        if (label) return label;
                    }
                }
                return null;
            };

            return findLabel(props.options) || '';
        });

        const handleSelect = (node: any) => {
            if (node.disabled) return;
            emit('update:modelValue', node.id);
            emit('change', node.id);
            isOpen.value = false;
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
                isOpen.value = false;
            }
        };

        onMounted(() => document.addEventListener('click', handleClickOutside));
        onUnmounted(() => document.removeEventListener('click', handleClickOutside));

        return () =>
            h('div', { ref: containerRef, class: 'relative inline-block w-full' }, [
                h(
                    'div',
                    {
                        class: classes.value.container,
                        onClick: () => (isOpen.value = !isOpen.value),
                    },
                    [
                        h(
                            'div',
                            { class: classes.value.input },
                            selectedLabel.value || props.placeholder,
                        ),
                        h(
                            'span',
                            { class: [classes.value.icon, isOpen.value && classes.value.iconOpen] },
                            [
                                h(
                                    'svg',
                                    {
                                        width: '12',
                                        height: '12',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        strokeWidth: '2',
                                    },
                                    [h('path', { d: 'm6 9 6 6 6-6' })],
                                ),
                            ],
                        ),
                    ],
                ),

                isOpen.value &&
                    h('div', { class: classes.value.dropdown }, [
                        props.searchable &&
                            h('div', { class: 'mb-2 p-1 border-b border-neutral-100' }, [
                                h('input', {
                                    class: 'w-full px-3 py-1.5 text-xs border border-neutral-100 rounded-md focus:border-primary-500 outline-none',
                                    placeholder: 'Filter tree...',
                                    value: searchText.value,
                                    onInput: (e: any) => (searchText.value = e.target.value),
                                    onClick: (e: MouseEvent) => e.stopPropagation(),
                                }),
                            ]),
                        h('div', { class: classes.value.treeContainer }, [
                            h(Tree, {
                                data: props.options,
                                selectedKeys:
                                    props.modelValue !== undefined ? [props.modelValue] : [],
                                onSelect: handleSelect,
                                // 简单的搜索逻辑可以通过 Tree 组件的 filter 属性实现（如果 Tree 支持）
                            }),
                        ]),
                    ]),
            ]);
    },
});
