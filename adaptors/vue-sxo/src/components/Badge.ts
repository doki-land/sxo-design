import { defineComponent, h, computed, PropType } from 'vue';
import { getBadgeClasses, BadgeOptions } from '@sxo/ui';

export const Badge = defineComponent({
  name: 'SxoBadge',
  props: {
    variant: {
      type: String as PropType<BadgeOptions['variant']>,
      default: 'primary',
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      const sxoClasses = getBadgeClasses({
        variant: props.variant,
      });
      return `${sxoClasses} ${attrs.class || ''}`.trim();
    });

    return () =>
      h(
        'span',
        {
          ...attrs,
          class: classes.value,
        },
        slots.default?.(),
      );
  },
});
