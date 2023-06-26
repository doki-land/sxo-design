import { defineComponent, h, computed, PropType } from 'vue';
import { getInputClasses, InputOptions } from '@sxo/ui';

export const Input = defineComponent({
  name: 'SxoInput',
  props: {
    variant: {
      type: String as PropType<InputOptions['variant']>,
      default: 'outline',
    },
    size: {
      type: String as PropType<InputOptions['size']>,
      default: 'md',
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const classes = computed(() => {
      const sxoClasses = getInputClasses({
        variant: props.variant,
        size: props.size,
        invalid: props.invalid,
      });
      return `${sxoClasses} ${attrs.class || ''}`.trim();
    });

    const onInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    return () =>
      h('input', {
        ...attrs,
        class: classes.value,
        value: props.modelValue,
        onInput,
      });
  },
});
