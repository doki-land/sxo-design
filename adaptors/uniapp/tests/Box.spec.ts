import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw } from 'vue';
import { Box } from '../src/components/Box';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoBox', () => {
    it('should render as div by default', () => {
        const wrapper = mount(Box, {
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('should render as specified tag', () => {
        const wrapper = mount(Box, {
            props: {
                as: 'section',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.element.tagName).toBe('SECTION');
    });

    it('should apply utility classes from attributes', () => {
        const wrapper = mount(Box, {
            attrs: {
                p: '4',
                m: '2',
                bg: 'primary',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        const classes = wrapper.classes();
        expect(classes).toContain('p-4');
        expect(classes).toContain('m-2');
        expect(classes).toContain('bg-primary');
    });
});
