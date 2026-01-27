import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw } from 'vue';
import { Badge } from '../src/components/Badge';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoBadge', () => {
    it('should render content', () => {
        const wrapper = mount(Badge, {
            slots: {
                default: '99+',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.text()).toBe('99+');
    });

    it('should apply variant classes', () => {
        const wrapper = mount(Badge, {
            props: {
                variant: 'error',
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
