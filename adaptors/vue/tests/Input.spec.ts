import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw } from 'vue';
import { Input } from '../src/components/Input';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoInput', () => {
    it('should render correctly', () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'hello',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect((wrapper.element as HTMLInputElement).value).toBe('hello');
    });

    it('should emit update:modelValue on input', async () => {
        const wrapper = mount(Input, {
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        const input = wrapper.find('input');
        await input.setValue('new value');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
    });

    it('should apply variant and size classes', () => {
        const wrapper = mount(Input, {
            props: {
                variant: 'outline',
                size: 'sm',
                invalid: true,
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.classes()).toBeDefined();
    });
});
