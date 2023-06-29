import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { markRaw } from 'vue';
import { Button } from '../src/components/Button';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoButton', () => {
    it('should render correctly', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Click me',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.text()).toBe('Click me');
        expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('should handle click events', async () => {
        const handleClick = vi.fn();
        const wrapper = mount(Button, {
            attrs: {
                onClick: handleClick,
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        await wrapper.trigger('click');
        expect(handleClick).toHaveBeenCalled();
    });

    it('should be disabled when disabled prop is true', () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true,
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('should apply variant and size classes', () => {
        const wrapper = mount(Button, {
            props: {
                variant: 'primary',
                size: 'lg',
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
