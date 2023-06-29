import { describe, expect, it } from 'vitest';
import { useDataTable } from '../src/DataTable';
import { useTable } from '../src/index';

describe('useTable', () => {
    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
    ];
    const data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
    ];

    it('should return table props', () => {
        const table = useTable({ columns, data });
        expect(table.getTableProps()).toMatchObject({
            role: 'table',
        });
        expect(table.getHeaderProps()).toMatchObject({
            role: 'rowgroup',
        });
        expect(table.getBodyProps()).toMatchObject({
            role: 'rowgroup',
        });
    });

    it('should return row and cell props', () => {
        const table = useTable({ columns, data });
        expect(table.getRowProps(data[0])).toMatchObject({
            role: 'row',
        });
        expect(table.getCellProps()).toMatchObject({
            role: 'cell',
        });
        expect(table.getHeaderCellProps()).toMatchObject({
            role: 'columnheader',
        });
    });

    it('should handle row click', () => {
        let clickedRow = null;
        const table = useTable({
            columns,
            data,
            onRowClick: (row) => {
                clickedRow = row;
            },
        });
        const rowProps = table.getRowProps(data[0]);
        rowProps.onClick();
        expect(clickedRow).toBe(data[0]);
    });
});

describe('useDataTable', () => {
    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
    ];
    const data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
    ];

    it('should support sorting', () => {
        const table = useDataTable({ columns, data, sortable: true });

        // Initial state
        expect(table.getSortIcon(columns[0])).toBe('↕');

        // Click to sort asc
        const headerProps = table.getSortableHeaderProps(columns[0]);
        headerProps.onClick();
        expect(table.getSortIcon(columns[0])).toBe('↑');

        // Click again to sort desc
        const headerProps2 = table.getSortableHeaderProps(columns[0]);
        headerProps2.onClick();
        expect(table.getSortIcon(columns[0])).toBe('↓');

        // Click different column
        const headerProps3 = table.getSortableHeaderProps(columns[1]);
        headerProps3.onClick();
        expect(table.getSortIcon(columns[1])).toBe('↑');
        expect(table.getSortIcon(columns[0])).toBe('↕');
    });

    it('should not sort if sortable is false', () => {
        const table = useDataTable({ columns, data, sortable: false });
        const headerProps = table.getSortableHeaderProps(columns[0]);
        headerProps.onClick();
        expect(table.getSortIcon(columns[0])).toBe('↕');
    });
});
