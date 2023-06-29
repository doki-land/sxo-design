import { useMenu } from '@sxo/design';
import { getMenuClasses, type MenuOptions } from '@sxo/ui';
import { defineComponent, h, type PropType, ref } from 'vue';
import { useStyle } from '../hooks';

export interface MenuItem {
    id: string;
    label: string;
}

export const Menu = defineComponent({
    name: 'SxoMenu',
    props: {
        label: {
            type: [String, Object] as PropType<string | any>,
            required: true,
        },
        items: {
            type: Array as PropType<MenuItem[]>,
            required: true,
        },
        variant: {
            type: String as PropType<MenuOptions['variant']>,
            default: 'default',
        },
    },
    setup(props, { emit, slots }) {
        const isOpen = ref(false);
        const { getMenuProps, getItemProps, getButtonProps } = useMenu({
            isOpen: isOpen.value,
            id: 'sxo-menu',
        });

        const styles = getMenuClasses({ variant: props.variant });

        useStyle(() => `${Object.values(styles).join(' ')}`);

        const handleToggle = () => {
            isOpen.value = !isOpen.value;
        };

        const handleSelect = (item: MenuItem) => {
            emit('select', item);
            isOpen.value = false;
        };

        return () =>
            h(
                'div',
                {
                    class: styles.container,
                    attrs: { 'data-sxo-component': 'Menu' },
                },
                [
                    h(
                        'button',
                        {
                            attrs: {
                                ...getButtonProps(),
                                role: (getButtonProps() as any).role,
                            },
                            class: styles.button,
                            on: {
                                click: handleToggle,
                            },
                        },
                        slots.label ? slots.label() : props.label,
                    ),

                    isOpen.value
                        ? h(
                              'div',
                              {
                                  attrs: getMenuProps(),
                                  class: styles.items,
                              },
                              [
                                  h(
                                      'div',
                                      { class: styles.section },
                                      props.items.map((item, index) =>
                                          h(
                                              'button',
                                              {
                                                  attrs: {
                                                      ...getItemProps(index),
                                                      id: (getItemProps(index) as any).id,
                                                  },
                                                  key: item.id,
                                                  class: styles.item,
                                                  on: {
                                                      click: () => handleSelect(item),
                                                  },
                                              },
                                              item.label,
                                          ),
                                      ),
                                  ),
                              ],
                          )
                        : null,
                ],
            );
    },
});
