import { getBackTopClasses } from '@sxo/ui';
import { computed, defineComponent, h, onMounted, onUnmounted, ref } from 'vue';
import { useStyle } from '../hooks';

export const BackTop = defineComponent({
    name: 'SxoBackTop',
    props: {
        visibilityHeight: { type: Number, default: 400 },
        right: { type: Number, default: 40 },
        bottom: { type: Number, default: 40 },
        target: { type: String, default: '' },
    },
    setup(props, { slots, attrs }) {
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
            handleScroll(); // Initial check
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
                          onClick: scrollToTop,
                      },
                      [
                          slots.default
                              ? slots.default()
                              : h(
                                    'svg',
                                    {
                                        class: styles.value.icon,
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                    },
                                    [h('polyline', { points: '18 15 12 9 6 15' })],
                                ),
                      ],
                  )
                : null;
    },
});
