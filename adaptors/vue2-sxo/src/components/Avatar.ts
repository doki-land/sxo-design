import { type AvatarOptions, getAvatarClasses } from '@sxo/ui';
import { computed, defineComponent, h, getCurrentInstance } from 'vue';
import { useStyle } from '../hooks';

export const Avatar = defineComponent({
    name: 'SxoAvatar',
    props: {
        src: String,
        alt: String,
        fallback: String,
        size: {
            type: String as () => AvatarOptions['size'],
            default: 'md',
        },
        shape: {
            type: String as () => AvatarOptions['shape'],
            default: 'circle',
        },
    },
    setup(props, { attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const styles = computed(() =>
            getAvatarClasses({
                size: props.size,
                shape: props.shape,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [s.root, s.image, s.fallback, attrs.class].filter(Boolean).join(' ');
        });

        return () =>
            h(
                'div',
                {
                    class: [styles.value.root, attrs.class],
                    on: listeners,
                },
                [
                    props.src
                        ? h('img', {
                              attrs: {
                                  src: props.src,
                                  alt: props.alt,
                              },
                              class: styles.value.image,
                          })
                        : h(
                              'span',
                              {
                                  class: styles.value.fallback,
                              },
                              props.fallback || props.alt?.charAt(0) || '?',
                          ),
                ],
            );
    },
});
