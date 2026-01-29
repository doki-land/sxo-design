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
        bordered: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['load', 'error'],
    setup(props, { attrs, emits }) {
        const styles = computed(() =>
            getAvatarClasses({
                size: props.size,
                shape: props.shape,
                bordered: props.bordered,
            }),
        );

        useStyle(() => {
            const s = styles.value;
            return [s.root, s.image, s.fallback, attrs.class].filter(Boolean).join(' ');
        });

        return () =>
            h(
                'view',
                {
                    ...attrs,
                    class: styles.value.root,
                },
                [
                    props.src
                        ? h('image', {
                              src: props.src,
                              alt: props.alt,
                              class: styles.value.image,
                              onLoad: (e: Event) => emits('load', e),
                              onError: (e: Event) => emits('error', e),
                          })
                        : h(
                              'text',
                              {
                                  class: styles.value.fallback,
                              },
                              props.fallback || props.alt?.charAt(0) || '?',
                          ),
                ],
            );
    },
});
