import { getBreadcrumbClasses } from '@sxo/ui';
import { computed, defineComponent, h, inject, provide, type PropType } from 'vue';
import { useStyle } from '../hooks';

const BreadcrumbSymbol = Symbol('Breadcrumb');

export const BreadcrumbItem = defineComponent({
    name: 'SxoBreadcrumbItem',
    props: {
        href: { type: String, default: '' },
        current: { type: Boolean, default: false },
    },
    setup(props, { slots, attrs }) {
        const ctx = inject<any>(BreadcrumbSymbol, { disabled: false });
        const styles = computed(() => getBreadcrumbClasses({ disabled: ctx.disabled.value }));

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
                              href: ctx.disabled.value ? undefined : props.href,
                              class: [styles.value.link, attrs.class],
                              onClick: (e: MouseEvent) => {
                                  if (ctx.disabled.value) {
                                      e.preventDefault();
                                  }
                              },
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
        disabled: { type: Boolean, default: false },
    },
    setup(props, { slots, attrs }) {
        provide(BreadcrumbSymbol, {
            disabled: computed(() => props.disabled),
        });

        const styles = computed(() =>
            getBreadcrumbClasses({
                separator: props.separator,
                disabled: props.disabled,
            }),
        );

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
                { class: [styles.value.container, attrs.class], 'aria-label': 'Breadcrumb' },
                items,
            );
        };
    },
});
