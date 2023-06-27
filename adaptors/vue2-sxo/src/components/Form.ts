import { useForm, type ValidationRule } from '@sxo/design';
import { defineComponent, h, inject, provide, reactive, getCurrentInstance } from 'vue';

const FormSymbol = 'SxoForm';

export const Form = defineComponent({
    name: 'SxoForm',
    props: {
        initialValues: {
            type: Object as () => Record<string, any>,
            required: true,
        },
        rules: {
            type: Object as () => Record<string, ValidationRule[]>,
            default: () => ({}),
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const form = useForm({
            initialValues: props.initialValues,
            rules: props.rules,
            onSubmit: (values) => instance?.proxy.$emit('submit', values),
        });

        const state = reactive({
            values: { ...props.initialValues },
            errors: {} as Record<string, string>,
        });

        form.subscribe(() => {
            state.values = { ...form.values };
            state.errors = { ...form.errors } as any;
        });

        provide(FormSymbol, {
            values: state.values,
            errors: state.errors,
            setFieldValue: form.setFieldValue,
        });

        return () =>
            h(
                'form',
                {
                    attrs,
                    on: {
                        ...listeners,
                        submit: form.handleSubmit,
                    },
                },
                slots.default?.(),
            );
    },
});

export const FormItem = defineComponent({
    name: 'SxoFormItem',
    props: {
        name: String,
        label: String,
    },
    setup(props, { slots }) {
        const form = inject<any>(FormSymbol);
        if (!form) throw new Error('FormItem must be used within Form');

        return () =>
            h('div', { class: 'flex flex-col gap-1 mb-4' }, [
                props.label && h('label', { class: 'text-sm font-bold opacity-70' }, props.label),
                slots.default?.(),
                props.name &&
                    form.errors[props.name] &&
                    h(
                        'span',
                        { class: 'text-xs text-red-500 font-medium' },
                        form.errors[props.name],
                    ),
            ]);
    },
});
