import { useTable, type Column, type TableOptions } from './index.ts';

export interface DataTableOptions<T> extends TableOptions<T> {
    sortable?: boolean;
    filterable?: boolean;
}

export function useDataTable<T>(options: DataTableOptions<T>) {
    const baseTable = useTable(options);

    // Add sorting state logic (simplified for headless)
    let sortConfig: { key: string; direction: 'asc' | 'desc' } | null = null;

    const setSort = (key: string) => {
        if (sortConfig?.key === key) {
            sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortConfig = { key, direction: 'asc' };
        }
    };

    return {
        ...baseTable,
        getSortableHeaderProps: (column: Column<T>) => ({
            ...baseTable.getHeaderCellProps(),
            onClick: () => options.sortable && setSort(column.key),
            style: { cursor: options.sortable ? 'pointer' : 'default' },
            'aria-sort': sortConfig?.key === column.key ? sortConfig.direction : undefined,
        }),
        getSortIcon: (column: Column<T>) => {
            if (sortConfig?.key !== column.key) return '↕';
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        },
    };
}
