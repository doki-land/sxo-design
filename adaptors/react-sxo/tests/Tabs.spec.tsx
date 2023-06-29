import { describe, expect, it, vi } from 'vitest';
import { Tab, TabList, Tabs } from '../src/components/Tabs';
import { fireEvent, render, screen } from './test-utils';

describe('Tabs', () => {
    it('should render correctly', () => {
        render(
            <Tabs defaultValue="1">
                <TabList>
                    <Tab value="1">Tab 1</Tab>
                    <Tab value="2">Tab 2</Tab>
                </TabList>
            </Tabs>,
        );

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();

        expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');
    });

    it('should change active tab on click', () => {
        const onChange = vi.fn();
        render(
            <Tabs onChange={onChange}>
                <TabList>
                    <Tab value="1">Tab 1</Tab>
                    <Tab value="2">Tab 2</Tab>
                </TabList>
            </Tabs>,
        );

        fireEvent.click(screen.getByText('Tab 2'));
        expect(onChange).toHaveBeenCalledWith('2');
        expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'true');
    });

    it('should apply variant classes', () => {
        const { container } = render(
            <Tabs variant="pill">
                <TabList>
                    <Tab value="1">Tab 1</Tab>
                </TabList>
            </Tabs>,
        );

        const tabList = container.querySelector('[role="tablist"]');
        expect(tabList).toHaveClass('bg-neutral-100');
    });
});
