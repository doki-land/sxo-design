import { defineComponent, h, PropType, computed, ref } from 'vue';
import { getPopconfirmClasses, PopconfirmOptions } from '@sxo/ui';
import { Button as SxoButton } from './Button';

export const Popconfirm = defineComponent({
    name: 'SxoPopconfirm',
    props: {
        title: { type: String, default: '' },
        type: { type: String as PropType<PopconfirmOptions['type']>, default: 'warning' },
        confirmText: { type: String, default: 'Confirm' },
        cancelText: { type: String, default: 'Cancel' },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit, slots, attrs }) {
        const visible = ref(false);
        const styles = computed(() => getPopconfirmClasses({ type: props.type }));

        const handleConfirm = () => {
            visible.value = false;
            emit('confirm');
        };

        const handleCancel = () => {
            visible.value = false;
            emit('cancel');
        };

        return () =>
            h('div', { class: 'relative inline-block' }, [
                h('div', { onClick: () => (visible.value = !visible.value) }, slots.default?.()),
                visible.value &&
                    h(
                        'div',
                        {
                            class: [
                                styles.value.container,
                                'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
                                attrs.class,
                            ],
                        },
                        [
                            h('div', { class: styles.value.header }, [
                                h('div', { class: styles.value.icon }, [
                                    h(
                                        'svg',
                                        {
                                            viewBox: '0 0 24 24',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': '2',
                                        },
                                        [
                                            h('path', {
                                                d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
                                            }),
                                            h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
                                            h('line', {
                                                x1: '12',
                                                y1: '17',
                                                x2: '12.01',
                                                y2: '17',
                                            }),
                                        ],
                                    ),
                                ]),
                                h(
                                    'div',
                                    { class: styles.value.title },
                                    slots.title ? slots.title() : props.title,
                                ),
                            ]),
                            h('div', { class: styles.value.footer }, [
                                h(
                                    SxoButton,
                                    { size: 'xs', variant: 'ghost', onClick: handleCancel },
                                    () => props.cancelText,
                                ),
                                h(
                                    SxoButton,
                                    {
                                        size: 'xs',
                                        variant: props.type === 'error' ? 'error' : 'primary',
                                        onClick: handleConfirm,
                                    },
                                    () => props.confirmText,
                                ),
                            ]),
                        ],
                    ),
            ]);
    },
});
