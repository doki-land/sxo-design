import { describe, expect, it, vi } from 'vitest';
import { useDashboard, useKanban, useShell, useSteps } from '../src/headless';

describe('useKanban', () => {
    it('should initialize with columns', () => {
        const columns = [{ id: '1', title: 'Todo', items: [] }];
        const kanban = useKanban(columns);
        expect(kanban.columns).toBe(columns);
    });

    it('should have a moveItem function', () => {
        const kanban = useKanban([]);
        const spy = vi.spyOn(console, 'log');
        kanban.moveItem('item1', 'col1', 'col2', 0);
        expect(spy).toHaveBeenCalledWith('Moving item item1 from col1 to col2 at index 0');
        spy.mockRestore();
    });
});

describe('useDashboard', () => {
    it('should return stats and charts from data', () => {
        const data = { stats: [1, 2], charts: ['chart1'] };
        const dashboard = useDashboard(data);
        expect(dashboard.stats).toBe(data.stats);
        expect(dashboard.charts).toBe(data.charts);
    });

    it('should return empty arrays if data is empty', () => {
        const dashboard = useDashboard({});
        expect(dashboard.stats).toEqual([]);
        expect(dashboard.charts).toEqual([]);
    });
});

describe('useShell', () => {
    it('should handle collapse state', () => {
        const shell = useShell(false);
        expect(shell.isCollapsed).toBe(false);
        shell.toggle();
        expect(shell.isCollapsed).toBe(true);
    });

    it('should support subscriptions', () => {
        const shell = useShell(false);
        let result = false;
        const unsubscribe = shell.subscribe((collapsed) => {
            result = collapsed;
        });
        shell.toggle();
        expect(result).toBe(true);
        unsubscribe();
        shell.toggle();
        expect(result).toBe(true); // Should not change after unsubscribe
    });
});

describe('useSteps', () => {
    it('should handle step navigation', () => {
        const steps = useSteps(3, 0);
        expect(steps.current).toBe(0);
        steps.next();
        expect(steps.current).toBe(1);
        steps.next();
        expect(steps.current).toBe(2);
        steps.next(); // At limit
        expect(steps.current).toBe(2);
        steps.prev();
        expect(steps.current).toBe(1);
        steps.goTo(0);
        expect(steps.current).toBe(0);
    });

    it('should support subscriptions', () => {
        const steps = useSteps(3, 0);
        let currentStep = 0;
        steps.subscribe((step) => {
            currentStep = step;
        });
        steps.next();
        expect(currentStep).toBe(1);
    });
});
