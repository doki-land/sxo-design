export interface KanbanItem {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    assignee?: string;
}

export interface KanbanColumn {
    id: string;
    title: string;
    items: KanbanItem[];
}

export function useKanban(initialColumns: KanbanColumn[]) {
    // Simple Kanban logic for now
    const columns = initialColumns;

    const moveItem = (itemId: string, fromColId: string, toColId: string, newIndex: number) => {
        // Logic to move items between columns
        // This would typically update state in a real application
        console.log(`Moving item ${itemId} from ${fromColId} to ${toColId} at index ${newIndex}`);
    };

    return {
        columns,
        moveItem,
    };
}

export function useDashboard(data: any) {
    // Data aggregation logic
    const stats = data.stats || [];
    const charts = data.charts || [];

    return {
        stats,
        charts,
    };
}

export function useShell(initialCollapsed = false) {
    let isCollapsed = initialCollapsed;
    const listeners = new Set<(collapsed: boolean) => void>();

    return {
        get isCollapsed() {
            return isCollapsed;
        },
        toggle: () => {
            isCollapsed = !isCollapsed;
            listeners.forEach((l) => l(isCollapsed));
        },
        subscribe: (l: (collapsed: boolean) => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
    };
}

export function useSteps(total: number, initial = 0) {
    let current = initial;
    const listeners = new Set<(step: number) => void>();

    return {
        get current() {
            return current;
        },
        next: () => {
            if (current < total - 1) {
                current++;
                listeners.forEach((l) => l(current));
            }
        },
        prev: () => {
            if (current > 0) {
                current--;
                listeners.forEach((l) => l(current));
            }
        },
        goTo: (step: number) => {
            if (step >= 0 && step < total) {
                current = step;
                listeners.forEach((l) => l(current));
            }
        },
        subscribe: (l: (step: number) => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
    };
}
