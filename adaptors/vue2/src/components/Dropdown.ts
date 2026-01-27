import { type DropdownOptions, getDropdownClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, onMounted, onUnmounted, ref } from 'vue';
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

            const instance = getCurrentInstance();
            const listeners = instance?.proxy.$listeners || {};

            return h(
                'div',
                {
                    class: [
                        styles.value.item,
                        props.active && styles.value.itemActive,
                        props.disabled && styles.value.itemDisabled,
                        attrs.class,
                    ],
                    on: {
                        ...listeners,
                        click: (e: MouseEvent) => {
                            if (props.disabled) return;
                            if (listeners.click) {
                                if (Array.isArray(listeners.click)) {
                                    listeners.click.forEach((fn: Function) => fn(e));
                                } else {
                                    (listeners.click as Function)(e);
                                }
                            }
                        },
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
        placement: { type: String as () => DropdownOptions['placement'], default: 'bottom-left' },
        trigger: { type: String as () => 'click' | 'hover', default: 'click' },
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
            const el = dropdownRef.value;
            if (el && !el.contains(event.target as Node)) {
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
            const events: Record<string, any> = {};
            if (props.trigger === 'hover') {
                events.mouseenter = open;
                events.mouseleave = close;
            } else {
                events.click = (e: MouseEvent) => {
                    e.stopPropagation();
                    toggle();
                };
            }
            return events;
        });

        return () =>
            h(
                'div',
                {
                    ref: 'dropdownRef',
                    class: [styles.value.container, attrs.class],
                    on: triggerEvents.value,
                },
                [
                    slots.default?.(),
                    isOpen.value &&
                        h(
                            'div',
                            {
                                class: styles.value.menu,
                                on: {
                                    click: (e: MouseEvent) => e.stopPropagation(),
                                },
                            },
                            slots.overlay?.(),
                        ),
                ],
            );
    },
    // Handle ref correctly in Vue 2 setup
    mounted() {
        (this as any).dropdownRef = this.$el;
    },
});
