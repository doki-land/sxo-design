import { type AlertOptions, getAlertClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Alert = defineComponent({
    name: 'SxoAlert',
    props: {
        type: {
            type: String as PropType<AlertOptions['type']>,
            default: 'info',
        },
        variant: {
            type: String as PropType<AlertOptions['variant']>,
            default: 'subtle',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        closable: {
            type: Boolean,
            default: false,
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
    setup(props, { emit, slots, attrs }) {
        const styles = computed(() =>
            getAlertClasses({
                type: props.type,
                variant: props.variant,
                disabled: props.disabled,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [
                s.container,
                s.icon,
                s.content,
                s.title,
                s.description,
                s.closeButton,
                attrs.class,
            ]
                .filter(Boolean)
                .join(' ');
        });

        const renderIcon = () => {
            if (!props.showIcon) return null;
            if (slots.icon) return h('view', { class: styles.value.icon }, slots.icon());

            // UniApp 中不直接使用 SVG，暂时简单处理
            return h('view', { class: styles.value.icon });
        };

        const handleClose = (e: MouseEvent) => {
            if (props.disabled) return;
            emit('close', e);
        };

        return () =>
            h('view', { class: [styles.value.container, attrs.class] }, [
                renderIcon(),
                h('view', { class: styles.value.content }, [
                    (props.title || slots.title) &&
                        h(
                            'view',
                            { class: styles.value.title },
                            slots.title ? slots.title() : props.title,
                        ),
                    (props.description || slots.default) &&
                        h(
                            'view',
                            { class: styles.value.description },
                            slots.default ? slots.default() : props.description,
                        ),
                ]),
                props.closable &&
                    h(
                        'view',
                        { class: styles.value.closeButton, onClick: handleClose },
                        '×' // 简单替代关闭图标
                    ),
            ]);
    },
});
