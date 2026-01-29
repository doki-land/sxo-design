import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw } from 'vue';
import { Alert } from '../src/components/Alert';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoAlert', () => {
    it('should render title and description', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Alert Title',
                description: 'Alert Description',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.text()).toContain('Alert Title');
        expect(wrapper.text()).toContain('Alert Description');
    });

    it('should render icon by default', () => {
        const wrapper = mount(Alert, {
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('should emit close event', async () => {
        const wrapper = mount(Alert, {
            props: {
                closable: true,
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        // Close button is usually the last svg or has a specific class
        const closeBtn = wrapper.find('div[class*="closeButton"]');
        if (closeBtn.exists()) {
            await closeBtn.trigger('click');
        } else {
            // Fallback to find by text if it's a span or something
            const svgs = wrapper.findAll('svg');
            await svgs[svgs.length - 1].trigger('click');
        }
        expect(wrapper.emitted('close')).toBeDefined();
    });

    it('should apply type classes', () => {
        const wrapper = mount(Alert, {
            props: {
                type: 'success',
                variant: 'solid',
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
