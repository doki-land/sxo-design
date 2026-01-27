import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ThemeProvider from '../src/ThemeProvider.svelte';

describe('ThemeProvider', () => {
    it('should render correctly', () => {
        const { container } = render(ThemeProvider, {
            props: {},
        });
        expect(container).toBeTruthy();
    });
});
