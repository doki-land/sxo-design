import { describe, expect, it } from 'vitest';
import { Grid, Stack } from '../src/components/Layout';
import { render, screen } from './test-utils';

describe('Layout', () => {
    describe('Stack', () => {
        it('should render correctly', () => {
            render(<Stack data-testid="stack">Content</Stack>);
            const stack = screen.getByTestId('stack');
            expect(stack).toHaveClass('flex');
            expect(stack).toHaveClass('flex-col');
        });

        it('should apply responsive props', () => {
            render(
                <Stack
                    direction={{ base: 'col', md: 'row' }}
                    gap={{ base: 2, lg: 8 }}
                    data-testid="stack"
                >
                    Content
                </Stack>,
            );
            const stack = screen.getByTestId('stack');
            expect(stack).toHaveClass('flex-col');
            expect(stack).toHaveClass('md:flex-row');
            expect(stack).toHaveClass('gap-2');
            expect(stack).toHaveClass('lg:gap-8');
        });
    });

    describe('Grid', () => {
        it('should render correctly', () => {
            render(<Grid data-testid="grid">Content</Grid>);
            const grid = screen.getByTestId('grid');
            expect(grid).toHaveClass('grid');
            expect(grid).toHaveClass('grid-cols-1');
        });

        it('should apply cols and rows', () => {
            render(
                <Grid cols={3} rows={2} data-testid="grid">
                    Content
                </Grid>,
            );
            const grid = screen.getByTestId('grid');
            expect(grid).toHaveClass('grid-cols-3');
            expect(grid).toHaveClass('grid-rows-2');
        });
    });
});
