import { type DropdownOptions, getDropdownClasses } from '@sxo/ui';
import { computed, defineComponent, h, onMounted, onUnmounted, type PropType, ref } from 'vue';
import { useStyle } from '../hooks';

export const DropdownItem = defineComponent({
    name: 'SxoDropdownItem',
    props: {
        disabled: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
        divider: { type: Boolean, default: false },
        header: { type: String, default: '' },
    },
    setup(props, { slots, attrs }) {
        const styles = computed(() => getDropdownClasses());

        return () => {
            if (props.divider) return h('div', { class: styles.value.divider });
            if (props.header) return h('div', { class: styles.value.header }, props.header);

            return h(
                'div',
                {
                    class: [
                        styles.value.item,
                        props.active && styles.value.itemActive,
                        props.disabled && styles.value.itemDisabled,
                        attrs.class,
                    ],
                    onClick: (_e: MouseEvent) => {
                        if (props.disabled) return;
                        // Emit or handle click
                    },
                },
                slots.default?.(),
            );
        };
    },
});

export const Dropdown = defineComponent({
    name: 'SxoDropdown',
    props: {
        placement: {
            type: String as PropType<DropdownOptions['placement']>,
            default: 'bottom-left',
        },
        trigger: { type: String as PropType<'click' | 'hover'>, default: 'click' },
    },
    setup(props, { slots, attrs }) {
        const isOpen = ref(false);
        const dropdownRef = ref<HTMLElement | null>(null);
        const styles = computed(() => getDropdownClasses({ placement: props.placement }));

        useStyle(() => {
            const s = styles.value;
            return [
                s.container,
                s.menu,
                s.item,
                s.itemActive,
                s.itemDisabled,
                s.divider,
                s.header,
                attrs.class,
            ]
                .filter(Boolean)
                .join(' ');
        });

        const toggle = () => (isOpen.value = !isOpen.value);
        const open = () => (isOpen.value = true);
        const close = () => (isOpen.value = false);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
                close();
            }
        };

        onMounted(() => {
            if (props.trigger === 'click') {
                window.addEventListener('click', handleClickOutside);
            }
        });

        onUnmounted(() => {
            if (props.trigger === 'click') {
                window.removeEventListener('click', handleClickOutside);
            }
        });

        const triggerEvents = computed(() => {
            if (props.trigger === 'hover') {
                return {
                    onMouseenter: open,
                    onMouseleave: close,
                };
            }
            return {
                onClick: (e: MouseEvent) => {
                    e.stopPropagation();
                    toggle();
                },
            };
        });

        return () =>
            h(
                'div',
                {
                    ref: dropdownRef,
                    class: [styles.value.container, attrs.class],
                    ...triggerEvents.value,
                },
                [
                    slots.default?.(),
                    isOpen.value &&
                        h(
                            'div',
                            {
                                class: styles.value.menu,
                                onClick: (e: MouseEvent) => e.stopPropagation(),
                            },
                            slots.overlay?.(),
                        ),
                ],
            );
    },
});
