import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { markRaw, nextTick } from 'vue';
import { Table } from '../src/components/Table';
import { SXO_KEY } from '../src/plugin';

const mockSxo = {
    tokens: defaultTokens,
    engine: markRaw(new StyleEngine(defaultTokens)),
    mode: 'light',
};

describe('SxoTable', () => {
    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
    ];
    const data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];

    it('should render data correctly', () => {
        const wrapper = mount(Table, {
            props: { data, columns },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        expect(wrapper.text()).toContain('Item 1');
        expect(wrapper.text()).toContain('Item 2');
        expect(wrapper.text()).toContain('ID');
        expect(wrapper.text()).toContain('Name');
    });

    it('should support sorting', async () => {
        const wrapper = mount(Table, {
            props: { data, columns, sortable: true },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        const headers = wrapper.findAll('th');
        const nameHeader = headers.find((h) => h.text().includes('Name'));

        await nameHeader?.trigger('click');
        // Check if sort direction changed (arrows are rendered)
        expect(nameHeader?.text()).toMatch(/[↑↓↕]/);
    });

    it('should support selectable rows', async () => {
        const wrapper = mount(Table, {
            props: { data, columns, selectable: true },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        // The checkbox click handler is on the div inside the label
        const checkboxDivs = wrapper.findAll('.inline-flex.items-center.gap-2.cursor-pointer div');
        // Header checkbox + 2 row checkboxes
        expect(checkboxDivs.length).toBe(3);

        await checkboxDivs[1].trigger('click');
        await nextTick();
        expect(wrapper.emitted('selection-change')).toBeTruthy();
    });

    it('should support virtual scrolling', () => {
        const largeData = Array.from({ length: 100 }).map((_, i) => ({ id: i, name: `Item ${i}` }));
        const wrapper = mount(Table, {
            props: {
                data: largeData,
                columns,
                virtual: true,
                height: 200,
                itemHeight: 40,
            },
            global: {
                provide: {
                    [SXO_KEY]: mockSxo,
                },
            },
        });

        // In virtual scroll, not all items are rendered
        const rows = wrapper.findAll('tr');
        // Header + visible rows (200/40 = 5, plus overscan)
        expect(rows.length).toBeLessThan(101);
    });
});
