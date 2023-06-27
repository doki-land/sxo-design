import { type BreadcrumbOptions, getBreadcrumbClasses } from '@sxo/ui';
import { computed, defineComponent, h, getCurrentInstance } from 'vue';
import { useStyle } from '../hooks';

export const BreadcrumbItem = defineComponent({
    name: 'SxoBreadcrumbItem',
    props: {
        href: { type: String, default: '' },
        current: { type: Boolean, default: false },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const styles = computed(() => getBreadcrumbClasses());

        useStyle(() => {
            const s = styles.value;
            return [s.item, s.link, s.current, attrs.class].filter(Boolean).join(' ');
        });

        return () =>
            h('div', { class: styles.value.item }, [
                props.href && !props.current
                    ? h(
                          'a',
                          {
                              attrs: { href: props.href, ...attrs },
                              class: [styles.value.link],
                              on: listeners,
                          },
                          slots.default?.(),
                      )
                    : h(
                          'span',
                          {
                              class: [
                                  props.current ? styles.value.current : styles.value.link,
                                  attrs.class,
                              ],
                              attrs,
                              on: listeners,
                          },
                          slots.default?.(),
                      ),
            ]);
    },
});

export const Breadcrumb = defineComponent({
    name: 'SxoBreadcrumb',
    props: {
        separator: { type: String, default: '/' },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const styles = computed(() => getBreadcrumbClasses({ separator: props.separator }));

        useStyle(() => {
            const s = styles.value;
            return [s.container, s.separator, attrs.class].filter(Boolean).join(' ');
        });

        return () => {
            const children = slots.default?.() || [];
            const items = children.reduce((acc: any[], child, index) => {
                acc.push(child);
                if (index < children.length - 1) {
                    acc.push(h('span', { class: styles.value.separator }, props.separator));
                }
                return acc;
            }, []);

            return h(
                'nav',
                {
                    class: [styles.value.container, attrs.class],
                    attrs: { 'aria-label': 'Breadcrumb', ...attrs },
                    on: listeners,
                },
                items,
            );
        };
    },
});
