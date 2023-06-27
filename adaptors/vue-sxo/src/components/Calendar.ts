import { defineComponent, h, computed, ref } from 'vue';
import { getCalendarClasses } from '@sxo/ui';

export const Calendar = defineComponent({
    name: 'SxoCalendar',
    props: {
        modelValue: { type: Date, default: () => new Date() },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, attrs }) {
        const styles = computed(() => getCalendarClasses());
        const viewDate = ref(new Date(props.modelValue));

        const monthLabel = computed(() => {
            return viewDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
        });

        const days = computed(() => {
            const year = viewDate.value.getFullYear();
            const month = viewDate.value.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();
            const prevLastDate = new Date(year, month, 0).getDate();

            const result = [];

            // Previous month days
            for (let i = firstDay; i > 0; i--) {
                result.push({
                    date: new Date(year, month - 1, prevLastDate - i + 1),
                    type: 'prev',
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
                    type: 'next',
                });
            }

            return result;
        });

        const isToday = (date: Date) => {
            const today = new Date();
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        };

        const isSelected = (date: Date) => {
            return (
                date.getDate() === props.modelValue.getDate() &&
                date.getMonth() === props.modelValue.getMonth() &&
                date.getFullYear() === props.modelValue.getFullYear()
            );
        };

        const changeMonth = (delta: number) => {
            viewDate.value = new Date(
                viewDate.value.getFullYear(),
                viewDate.value.getMonth() + delta,
                1,
            );
        };

        const selectDate = (date: Date) => {
            emit('update:modelValue', date);
            emit('change', date);
            if (date.getMonth() !== viewDate.value.getMonth()) {
                viewDate.value = new Date(date);
            }
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                h('div', { class: styles.value.header }, [
                    h('div', { class: styles.value.headerTitle }, monthLabel.value),
                    h('div', { class: styles.value.headerActions }, [
                        h(
                            'button',
                            { class: styles.value.headerBtn, onClick: () => changeMonth(-1) },
                            h(
                                'svg',
                                {
                                    viewBox: '0 0 24 24',
                                    class: 'w-5 h-5',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                },
                                [h('polyline', { points: '15 18 9 12 15 6' })],
                            ),
                        ),
                        h(
                            'button',
                            { class: styles.value.headerBtn, onClick: () => changeMonth(1) },
                            h(
                                'svg',
                                {
                                    viewBox: '0 0 24 24',
                                    class: 'w-5 h-5',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                },
                                [h('polyline', { points: '9 18 15 12 9 6' })],
                            ),
                        ),
                    ]),
                ]),
                h('div', { class: styles.value.body }, [
                    h(
                        'div',
                        { class: styles.value.weekRow },
                        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) =>
                            h('div', { class: styles.value.weekDay }, d),
                        ),
                    ),
                    h(
                        'div',
                        { class: styles.value.grid },
                        days.value.map((d) => {
                            const today = isToday(d.date);
                            const selected = isSelected(d.date);
                            return h(
                                'div',
                                {
                                    class: [
                                        styles.value.day,
                                        d.type === 'current'
                                            ? styles.value.dayCurrent
                                            : styles.value.dayOutside,
                                        today && styles.value.dayToday,
                                        selected && !today && styles.value.daySelected,
                                    ],
                                    onClick: () => selectDate(d.date),
                                },
                                [
                                    h('span', { class: styles.value.dayText }, d.date.getDate()),
                                    today &&
                                        h('div', {
                                            class: [styles.value.dayDot, styles.value.dayDotToday],
                                        }),
                                ],
                            );
                        }),
                    ),
                ]),
            ]);
    },
});
