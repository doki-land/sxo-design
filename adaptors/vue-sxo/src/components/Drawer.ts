import { type DrawerOptions, getDrawerClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref, Teleport, Transition, watch } from 'vue';

export const Drawer = defineComponent({
    name: 'SxoDrawer',
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        placement: {
            type: String as PropType<DrawerOptions['placement']>,
            default: 'right',
        },
        size: {
            type: String as PropType<DrawerOptions['size']>,
            default: 'md',
        },
        closable: {
            type: Boolean,
            default: true,
        },
        maskClosable: {
            type: Boolean,
            default: true,
        },
        destroyOnClose: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'close', 'after-leave'],
    setup(props, { emit, slots, attrs }) {
        const visible = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (val) => {
                visible.value = val;
                if (val) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            },
        );

        const styles = computed(() =>
            getDrawerClasses({
                placement: props.placement,
                size: props.size,
            }),
        );

        const handleClose = () => {
            emit('update:modelValue', false);
            emit('close');
        };

        const handleMaskClick = () => {
            if (props.maskClosable) {
                handleClose();
            }
        };

        const transitionName = computed(() => {
            const map = {
                right: 'slide-right',
                left: 'slide-left',
                top: 'slide-top',
                bottom: 'slide-bottom',
            };
            return map[props.placement || 'right'];
        });

        // CSS for transitions is assumed to be in the global styles or handled by Tailwind
        // For simplicity in this adaptor, we focus on the structure

        return () =>
            h(Teleport, { to: 'body' }, [
                h(
                    Transition,
                    {
                        name: 'fade',
                        onAfterLeave: () => emit('after-leave'),
                    },
                    () =>
                        props.modelValue
                            ? h('div', { class: styles.value.overlay, onClick: handleMaskClick })
                            : null,
                ),
                h(
                    Transition,
                    {
                        name: transitionName.value,
                    },
                    () =>
                        props.modelValue
                            ? h(
                                  'div',
                                  {
                                      class: [styles.value.container, attrs.class],
                                      style: {
                                          transform: props.modelValue ? 'none' : undefined,
                                      },
                                  },
                                  [
                                      // Header
                                      h('div', { class: styles.value.header }, [
                                          h(
                                              'div',
                                              { class: styles.value.title },
                                              slots.title ? slots.title() : props.title,
                                          ),
                                          props.closable &&
                                              h(
                                                  'button',
                                                  {
                                                      class: styles.value.closeButton,
                                                      onClick: handleClose,
                                                  },
                                                  h(
                                                      'svg',
                                                      {
                                                          viewBox: '0 0 24 24',
                                                          fill: 'none',
                                                          stroke: 'currentColor',
                                                          'stroke-width': '2',
                                                          class: 'w-5 h-5',
                                                      },
                                                      [
                                                          h('line', {
                                                              x1: '18',
                                                              y1: '6',
                                                              x2: '6',
                                                              y2: '18',
                                                          }),
                                                          h('line', {
                                                              x1: '6',
                                                              y1: '6',
                                                              x2: '18',
                                                              y2: '18',
                                                          }),
                                                      ],
                                                  ),
                                              ),
                                      ]),
                                      // Content
                                      h('div', { class: styles.value.content }, slots.default?.()),
                                      // Footer
                                      slots.footer &&
                                          h('div', { class: styles.value.footer }, slots.footer()),
                                  ],
                              )
                            : null,
                ),
            ]);
    },
});
