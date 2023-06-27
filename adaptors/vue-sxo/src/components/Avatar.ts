import { type AvatarOptions, getAvatarClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Avatar = defineComponent({
    name: 'SxoAvatar',
    props: {
        src: String,
        alt: String,
        fallback: String,
        size: {
            type: String as PropType<AvatarOptions['size']>,
            default: 'md',
        },
        shape: {
            type: String as PropType<AvatarOptions['shape']>,
            default: 'circle',
        },
    },
    setup(props, { attrs }) {
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
                    ...attrs,
                    class: styles.value.root,
                },
                [
                    props.src
                        ? h('img', {
                              src: props.src,
                              alt: props.alt,
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
