/**
 * 选择管理器逻辑：支持单选/多选
 */
export function useSelection<T>(options: {
    items: T[];
    onSelectionChange?: (selectedItems: T[]) => void;
    multiSelect?: boolean;
    keySelector?: (item: T) => string | number;
}) {
    const keySelector = options.keySelector ?? ((item: any) => item.id || item.key);
    const selectedKeys = new Set<string | number>();

    const listeners = new Set<() => void>();
    const notify = () => {
        for (const l of listeners) {
            l();
        }
        options.onSelectionChange?.(
            options.items.filter((item) => selectedKeys.has(keySelector(item))),
        );
    };

    return {
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
        getSelectedKeys: () => Array.from(selectedKeys),
        isSelected: (item: T) => selectedKeys.has(keySelector(item)),
        toggle: (item: T) => {
            const key = keySelector(item);
            if (selectedKeys.has(key)) {
                selectedKeys.delete(key);
            } else {
                if (!options.multiSelect) selectedKeys.clear();
                selectedKeys.add(key);
            }
            notify();
        },
        selectAll: () => {
            if (!options.multiSelect) return;
            options.items.forEach((item) => selectedKeys.add(keySelector(item)));
            notify();
        },
        deselectAll: () => {
            selectedKeys.clear();
            notify();
        },
        isAllSelected: () => options.items.length > 0 && selectedKeys.size === options.items.length,
    };
}
