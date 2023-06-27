import { useForm, type ValidationRule } from '@sxo/design';
import { getFormClasses, getFormItemClasses, type FormOptions } from '@sxo/ui';
import { defineComponent, h, inject, provide, reactive, computed, type PropType } from 'vue';

const FormSymbol = Symbol('Form');

export const Form = defineComponent({
    name: 'SxoForm',
    props: {
        /** 初始表单值 */
        initialValues: {
            type: Object as PropType<Record<string, any>>,
            required: true,
        },
        /** 校验规则 */
        rules: {
            type: Object as PropType<Record<string, ValidationRule[]>>,
            default: () => ({}),
        },
        /** 布局方式 */
        layout: {
            type: String as PropType<FormOptions['layout']>,
            default: 'vertical',
        },
    },
    emits: ['submit'],
    setup(props, { emit, slots, attrs }) {
        const form = useForm({
            initialValues: props.initialValues,
            rules: props.rules,
            onSubmit: (values) => emit('submit', values),
        });

        const state = reactive({
            values: { ...props.initialValues },
            errors: {} as Record<string, string>,
        });

        form.subscribe(() => {
            state.values = { ...form.values };
            state.errors = { ...form.errors } as any;
        });

        const classes = computed(() => getFormClasses({ layout: props.layout }));

        provide(FormSymbol, {
            state,
            setFieldValue: async (name: string, value: any) => {
                await form.setFieldValue(name, value);
            },
            layout: props.layout,
        });

        return {
            validate: () => form.handleSubmit(),
            render: () =>
                h(
                    'form',
                    {
                        ...attrs,
                        class: [classes.value.root, attrs.class],
                        onSubmit: async (e: Event) => {
                            await form.handleSubmit(e);
                        },
                    },
                    slots.default?.(),
                ),
        };
    },
    render() {
        return (this as any).render();
    },
});

export const FormItem = defineComponent({
    name: 'SxoFormItem',
    props: {
        /** 字段名 */
        name: String,
        /** 标签文本 */
        label: String,
        /** 是否必填样式 */
        required: { type: Boolean, default: false },
        /** 额外提示信息 */
        extra: String,
    },
    setup(props, { slots }) {
        const form = inject<any>(FormSymbol);
        if (!form) throw new Error('FormItem must be used within Form');

        const classes = computed(() =>
            getFormItemClasses({
                layout: form.layout === 'inline' ? 'vertical' : form.layout,
                required: props.required,
                hasError: !!(props.name && form.state.errors[props.name]),
            }),
        );

        return () =>
            h('div', { class: classes.value.root }, [
                props.label && h('label', { class: classes.value.label }, props.label),
                h('div', { class: classes.value.control }, [
                    slots.default?.(),
                    props.name &&
                        form.state.errors[props.name] &&
                        h('div', { class: classes.value.error }, form.state.errors[props.name]),
                    props.extra && h('div', { class: classes.value.extra }, props.extra),
                ]),
            ]);
    },
});
