/** @jsxImportSource solid-js */
import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Tag } from '../src/components/Tag';

describe('Tag', () => {
    it('should render children', () => {
        render(() => (<Tag>My Tag</Tag>) as any);
        expect(screen.getByText('My Tag')).toBeInTheDocument();
    });

    it('should apply custom class', () => {
        render(() => (<Tag class="custom-tag">Tag</Tag>) as any);
        expect(screen.getByText('Tag').className).toContain('custom-tag');
    });
});
