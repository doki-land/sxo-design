import { defineComponent, h, ref, computed, onMounted, onUnmounted, type PropType } from 'vue';
import { getDatePickerClasses, type DatePickerOptions } from '@sxo/ui';

export const DatePicker = defineComponent({
    name: 'SxoDatePicker',
    props: {
        /** 绑定值 */
        modelValue: { type: [Date, String, Number] as PropType<Date | string | number> },
        /** 占位提示语 */
        placeholder: { type: String, default: 'Select date' },
        /** 尺寸 */
        size: { type: String as PropType<DatePickerOptions['size']>, default: 'md' },
        /** 变体样式 */
        variant: { type: String as PropType<DatePickerOptions['variant']>, default: 'outline' },
        /** 是否圆角 */
        rounded: { type: Boolean, default: true },
        /** 格式化字符串 */
        format: { type: String, default: 'YYYY-MM-DD' },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const containerRef = ref<HTMLElement | null>(null);
        const viewDate = ref(props.modelValue ? new Date(props.modelValue) : new Date());

        const classes = computed(() =>
            getDatePickerClasses({
                size: props.size,
                variant: props.variant,
                rounded: props.rounded,
            }),
        );

        const formattedValue = computed(() => {
            if (!props.modelValue) return '';
            const date = new Date(props.modelValue);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        });

        const days = computed(() => {
            const year = viewDate.value.getFullYear();
            const month = viewDate.value.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            const prevMonthLastDate = new Date(year, month, 0).getDate();
            const result = [];

            // Prev month days
            for (let i = firstDay; i > 0; i--) {
                result.push({
                    date: new Date(year, month - 1, prevMonthLastDate - i + 1),
                    type: 'outside',
                });
            }

            // Current month days
            for (let i = 1; i <= lastDate; i++) {
                result.push({
                    date: new Date(year, month, i),
                    type: 'current',
                });
            }

            // Next month days
            const remaining = 42 - result.length;
            for (let i = 1; i <= remaining; i++) {
                result.push({
                    date: new Date(year, month + 1, i),
                    type: 'outside',
                });
            }

            return result;
        });

        const selectDate = (date: Date) => {
            emit('update:modelValue', date);
            emit('change', date);
            isOpen.value = false;
        };

        const isSelected = (date: Date) => {
            if (!props.modelValue) return false;
            const d = new Date(props.modelValue);
            return (
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            );
        };

        const isToday = (date: Date) => {
            const now = new Date();
            return (
                now.getFullYear() === date.getFullYear() &&
                now.getMonth() === date.getMonth() &&
                now.getDate() === date.getDate()
            );
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
                        h('input', {
                            class: classes.value.input,
                            placeholder: props.placeholder,
                            value: formattedValue.value,
                            readOnly: true,
                        }),
                        h('span', { class: classes.value.icon }, [
                            h(
                                'svg',
                                {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                },
                                [
                                    h('rect', {
                                        x: '3',
                                        y: '4',
                                        width: '18',
                                        height: '18',
                                        rx: '2',
                                        ry: '2',
                                    }),
                                    h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
                                    h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
                                    h('line', { x1: '3', y1: '10', x2: '21', y2: '10' }),
                                ],
                            ),
                        ]),
                    ],
                ),

                isOpen.value &&
                    h('div', { class: classes.value.panel }, [
                        h('div', { class: classes.value.header }, [
                            h(
                                'button',
                                {
                                    class: classes.value.headerButton,
                                    onClick: () =>
                                        (viewDate.value = new Date(
                                            viewDate.value.getFullYear(),
                                            viewDate.value.getMonth() - 1,
                                            1,
                                        )),
                                },
                                '<',
                            ),
                            h(
                                'span',
                                { class: classes.value.headerTitle },
                                `${viewDate.value.getFullYear()} - ${viewDate.value.getMonth() + 1}`,
                            ),
                            h(
                                'button',
                                {
                                    class: classes.value.headerButton,
                                    onClick: () =>
                                        (viewDate.value = new Date(
                                            viewDate.value.getFullYear(),
                                            viewDate.value.getMonth() + 1,
                                            1,
                                        )),
                                },
                                '>',
                            ),
                        ]),
                        h('div', { class: classes.value.grid }, [
                            ...['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) =>
                                h('div', { class: classes.value.weekday }, day),
                            ),
                            ...days.value.map((item) =>
                                h(
                                    'div',
                                    {
                                        class: [
                                            classes.value.day,
                                            item.type === 'outside' && classes.value.dayOutside,
                                            isSelected(item.date) && classes.value.daySelected,
                                            isToday(item.date) &&
                                                !isSelected(item.date) &&
                                                classes.value.dayToday,
                                        ],
                                        onClick: () => selectDate(item.date),
                                    },
                                    item.date.getDate(),
                                ),
                            ),
                        ]),
                    ]),
            ]);
    },
});
