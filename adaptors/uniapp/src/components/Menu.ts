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
    emits: ['select'],
    setup(props, { emit, attrs, slots }) {
        const isOpen = ref(false);
        const { getMenuProps, getItemProps, getButtonProps } = useMenu({
            isOpen: isOpen.value,
            id: 'sxo-menu',
        });

        const styles = getMenuClasses({ variant: props.variant });

        useStyle(() => `${Object.values(styles).join(' ')} ${attrs.class || ''}`);

        const handleToggle = () => {
            isOpen.value = !isOpen.value;
        };

        const handleSelect = (item: MenuItem) => {
            emit('select', item);
            isOpen.value = false;
        };

        return () =>
            h('div', { class: `${styles.container} ${attrs.class || ''}`.trim() }, [
                h(
                    'button',
                    {
                        ...getButtonProps(),
                        class: styles.button,
                        onClick: handleToggle,
                    },
                    slots.label ? (slots.label() as any) : props.label,
                ),

                isOpen.value
                    ? h('div', { ...getMenuProps(), class: styles.items }, [
                          h(
                              'div',
                              { class: styles.section },
                              props.items.map((item, index) =>
                                  h(
                                      'button',
                                      {
                                          ...getItemProps(index),
                                          key: item.id,
                                          class: styles.item,
                                          onClick: () => handleSelect(item),
                                      },
                                      item.label,
                                  ),
                              ),
                          ),
                      ])
                    : null,
            ]);
    },
});
