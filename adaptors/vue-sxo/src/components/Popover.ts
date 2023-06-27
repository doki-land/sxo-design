import { defineComponent, h, PropType, computed, ref, onMounted, onUnmounted } from 'vue';
import { getPopoverClasses, PopoverOptions } from '@sxo/ui';

export const Popover = defineComponent({
    name: 'SxoPopover',
    props: {
        title: { type: String, default: '' },
        content: { type: String, default: '' },
        placement: { type: String as PropType<PopoverOptions['placement']>, default: 'top' },
        trigger: { type: String as PropType<'click' | 'hover'>, default: 'click' },
    },
    setup(props, { slots, attrs }) {
        const isOpen = ref(false);
        const popoverRef = ref<HTMLElement | null>(null);
        const styles = computed(() => getPopoverClasses({ placement: props.placement }));

        const toggle = () => (isOpen.value = !isOpen.value);
        const open = () => (isOpen.value = true);
        const close = () => (isOpen.value = false);

        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.value && !popoverRef.value.contains(event.target as Node)) {
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
            h('div', { ref: popoverRef, class: [styles.value.container, attrs.class] }, [
                h('div', { ...triggerEvents.value }, slots.default?.()),
                isOpen.value &&
                    h(
                        'div',
                        {
                            class: styles.value.content,
                            onClick: (e: MouseEvent) => e.stopPropagation(),
                        },
                        [
                            h('div', { class: styles.value.arrow }),
                            (props.title || slots.title) &&
                                h(
                                    'div',
                                    { class: styles.value.title },
                                    slots.title ? slots.title() : props.title,
                                ),
                            h(
                                'div',
                                { class: styles.value.description },
                                slots.content ? slots.content() : props.content,
                            ),
                        ],
                    ),
            ]);
    },
});
