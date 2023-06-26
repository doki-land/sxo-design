import { defineComponent, h, computed, PropType } from 'vue';
import { getButtonClasses, ButtonOptions } from '@sxo/ui';

export const Button = defineComponent({
  name: 'SxoButton',
  props: {
    variant: {
      type: String as PropType<ButtonOptions['variant']>,
      default: 'primary',
    },
    size: {
      type: String as PropType<ButtonOptions['size']>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      const sxoClasses = getButtonClasses({
        variant: props.variant,
        size: props.size,
        disabled: props.disabled,
      });
      return `${sxoClasses} ${attrs.class || ''}`.trim();
    });

    return () =>
      h(
        'button',
        {
          ...attrs,
          class: classes.value,
          disabled: props.disabled,
        },
        slots.default?.(),
      );
  },
});
