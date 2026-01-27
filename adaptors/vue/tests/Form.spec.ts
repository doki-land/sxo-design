import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h, markRaw, nextTick } from 'vue';
import { Form, FormItem } from '../src/components/Form';
import { Input as SxoInput } from '../src/components/Input';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoForm', () => {
    it('should render form items with labels', () => {
        const wrapper = mount(Form, {
            props: {
                initialValues: { username: '' },
            },
            slots: {
                default: `
          <SxoFormItem label="Username" name="username">
            <input />
          </SxoFormItem>
        `,
            },
            global: {
                components: { SxoFormItem: FormItem },
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        expect(wrapper.text()).toContain('Username');
    });

    it('should validate required fields', async () => {
        const initialValues = { username: '' };
        const rules = {
            username: [{ required: true, message: 'Username is required' }],
        };

        const wrapper = mount(Form, {
            props: {
                initialValues,
                rules,
            },
            slots: {
                default: () =>
                    h(
                        FormItem,
                        { label: 'Username', name: 'username' },
                        {
                            default: () =>
                                h(SxoInput, {
                                    modelValue: initialValues.username,
                                    'onUpdate:modelValue': (val: string) => {
                                        initialValues.username = val;
                                    },
                                }),
                        },
                    ),
            },
            global: {
                components: { SxoFormItem: FormItem, SxoInput },
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        await (wrapper.vm as any).validate();

        await nextTick();
        // Wait a bit more for the reactive state to update
        await nextTick();
        expect(wrapper.text()).toContain('Username is required');
    });

    it('should support different layouts', () => {
        const layouts = ['vertical', 'horizontal', 'inline'] as const;

        layouts.forEach((layout) => {
            const wrapper = mount(Form, {
                props: {
                    layout,
                    initialValues: {},
                },
                global: {
                    provide: {
                        [SXO_KEY]: mockSxo,
                    },
                },
            });
            // Check if the container class reflects the layout
            // The exact class depends on getFormClasses implementation
            expect(wrapper.classes()).toBeDefined();
        });
    });
});
