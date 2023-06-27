import { getBackTopClasses } from '@sxo/ui';
import { defineComponent, h, computed, ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { useStyle } from '../hooks';

export const BackTop = defineComponent({
    name: 'SxoBackTop',
    props: {
        visibilityHeight: { type: Number, default: 400 },
        right: { type: Number, default: 40 },
        bottom: { type: Number, default: 40 },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const visible = ref(false);
        const styles = computed(() => getBackTopClasses());

        useStyle(() => {
            const s = styles.value;
            return [s.container, s.icon, attrs.class].filter(Boolean).join(' ');
        });

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            visible.value = scrollTop >= props.visibilityHeight;
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return () =>
            visible.value
                ? h(
                      'div',
                      {
                          class: [styles.value.container, attrs.class],
                          style: { right: `${props.right}px`, bottom: `${props.bottom}px` },
                          on: {
                              ...listeners,
                              click: scrollToTop,
                          },
                      },
                      [
                          slots.default
                              ? slots.default()
                              : h(
                                    'svg',
                                    {
                                        class: styles.value.icon,
                                        attrs: {
                                            viewBox: '0 0 24 24',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': '2',
                                        },
                                    },
                                    [h('polyline', { attrs: { points: '18 15 12 9 6 15' } })],
                                ),
                      ],
                  )
                : null;
    },
});
