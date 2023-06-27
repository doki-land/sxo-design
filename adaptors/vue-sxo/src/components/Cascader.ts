import { defineComponent, h, ref, computed, onMounted, onUnmounted, type PropType } from 'vue';
import { getCascaderClasses, type CascaderOptions } from '@sxo/ui';

export interface CascaderOption {
    value: string | number;
    label: string;
    children?: CascaderOption[];
    disabled?: boolean;
}

export const Cascader = defineComponent({
    name: 'SxoCascader',
    props: {
        /** 选中的值数组 */
        modelValue: { type: Array as PropType<(string | number)[]>, default: () => [] },
        /** 选项数据 */
        options: { type: Array as PropType<CascaderOption[]>, default: () => [] },
        /** 占位提示语 */
        placeholder: { type: String, default: 'Please select' },
        /** 尺寸 */
        size: { type: String as PropType<CascaderOptions['size']>, default: 'md' },
        /** 是否圆角 */
        rounded: { type: Boolean, default: true },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const containerRef = ref<HTMLElement | null>(null);
        const selectedPath = ref<(string | number)[]>(props.modelValue);
        const activePath = ref<(string | number)[]>(props.modelValue);

        const classes = computed(() =>
            getCascaderClasses({
                size: props.size,
                rounded: props.rounded,
            }),
        );

        const displayText = computed(() => {
            if (selectedPath.value.length === 0) return '';

            const labels: string[] = [];
            let currentOptions = props.options;

            for (const val of selectedPath.value) {
                const option = currentOptions.find((o) => o.value === val);
                if (option) {
                    labels.push(option.label);
                    currentOptions = option.children || [];
                }
            }
            return labels.join(' / ');
        });

        const menus = computed(() => {
            const result = [props.options];
            let currentOptions = props.options;

            for (const val of activePath.value) {
                const option = currentOptions.find((o) => o.value === val);
                if (option && option.children && option.children.length > 0) {
                    result.push(option.children);
                    currentOptions = option.children;
                } else {
                    break;
                }
            }
            return result;
        });

        const handleOptionClick = (option: CascaderOption, level: number) => {
            if (option.disabled) return;

            const newPath = activePath.value.slice(0, level);
            newPath.push(option.value);
            activePath.value = newPath;

            if (!option.children || option.children.length === 0) {
                selectedPath.value = [...newPath];
                emit('update:modelValue', selectedPath.value);
                emit('change', selectedPath.value);
                isOpen.value = false;
            }
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
                        onClick: () => {
                            isOpen.value = !isOpen.value;
                            if (isOpen.value) activePath.value = [...selectedPath.value];
                        },
                    },
                    [
                        h(
                            'div',
                            { class: classes.value.input },
                            displayText.value || props.placeholder,
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
                    h(
                        'div',
                        { class: classes.value.dropdown },
                        menus.value.map((menu, level) =>
                            h(
                                'div',
                                { class: classes.value.menu },
                                menu.map((option) =>
                                    h(
                                        'div',
                                        {
                                            class: [
                                                classes.value.menuItem,
                                                activePath.value[level] === option.value &&
                                                    classes.value.menuItemActive,
                                                option.disabled && classes.value.menuItemDisabled,
                                            ],
                                            onClick: (e: MouseEvent) => {
                                                e.stopPropagation();
                                                handleOptionClick(option, level);
                                            },
                                        },
                                        [
                                            h('span', option.label),
                                            option.children &&
                                                option.children.length > 0 &&
                                                h('span', { class: classes.value.expandIcon }, '>'),
                                        ],
                                    ),
                                ),
                            ),
                        ),
                    ),
            ]);
    },
});
