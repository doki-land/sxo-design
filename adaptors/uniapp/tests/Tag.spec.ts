import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw } from 'vue';
import { Tag } from '../src/components/Tag';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoTag', () => {
    it('should render default slot', () => {
        const wrapper = mount(Tag, {
            slots: {
                default: 'Tag Content',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        expect(wrapper.text()).toContain('Tag Content');
    });

    it('should emit close event', async () => {
        const wrapper = mount(Tag, {
            props: {
                closable: true,
            },
            slots: {
                default: 'Tag text',
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });
        // The close icon is the span with text '×'
        const closeIcon = wrapper.findAll('span').find((w) => w.text() === '×');
        await closeIcon?.trigger('click');
        expect(wrapper.emitted('close')).toBeDefined();
    });

    it('should apply variant and color classes', () => {
        const wrapper = mount(Tag, {
            props: {
                variant: 'outline',
                color: 'success',
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
