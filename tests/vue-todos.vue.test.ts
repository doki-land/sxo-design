import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createSxo } from '../adaptors/vue-sxo/src/plugin';
import App from '../examples/vue-todos/src/App.vue';

describe('Vue Todo Example', () => {
    const sxo = createSxo();

    it('should render the app', () => {
        const wrapper = mount(App, {
            global: {
                plugins: [sxo],
            },
        });
        expect(wrapper.text()).toContain('SXO');
        expect(wrapper.text()).toContain('HUB');
        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('should add a new todo', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [sxo],
            },
        });
        const input = wrapper.find('input');
        const button = wrapper.findAll('button').find((b) => b.text() === 'Add');

        await input.setValue('Buy milk');
        if (button) await button.trigger('click');

        expect(wrapper.text()).toContain('Buy milk');
    });

    it('should toggle a todo', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [sxo],
            },
        });
        const input = wrapper.find('input');
        const button = wrapper.findAll('button').find((b) => b.text() === 'Add');

        await input.setValue('Buy milk');
        if (button) await button.trigger('click');

        const checkbox = wrapper.find('input[type="checkbox"]');
        await (checkbox as any).setChecked(true);

        expect(wrapper.find('.line-through').exists()).toBe(true);
        expect(wrapper.text()).toContain('Done');
    });

    it('should delete a todo', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [sxo],
            },
        });
        const input = wrapper.find('input');
        const button = wrapper.findAll('button').find((b) => b.text() === 'Add');

        await input.setValue('Buy milk');
        if (button) await button.trigger('click');

        expect(wrapper.text()).toContain('Buy milk');

        // The delete button is the one with the trash icon (no text)
        const deleteButton = wrapper
            .findAll('button')
            .find((b) => b.text() === '' && b.html().includes('svg'));
        if (deleteButton) await deleteButton.trigger('click');

        expect(wrapper.text()).not.toContain('Buy milk');
    });
});
