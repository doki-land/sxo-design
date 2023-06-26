export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => any;
}

export interface TableOptions<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function useTable<T>(options: TableOptions<T>) {
  const { data, columns, onRowClick } = options;

  return {
    getTableProps: () => ({
      role: 'table',
      className: 'sxo-table w-full border-collapse',
    }),
    getHeaderProps: () => ({
      role: 'rowgroup',
      className: 'sxo-table-header bg-neutral-50 border-b border-neutral-200',
    }),
    getBodyProps: () => ({
      role: 'rowgroup',
      className: 'sxo-table-body',
    }),
    getRowProps: (row: T) => ({
      role: 'row',
      className: 'sxo-table-row border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
      onClick: () => onRowClick?.(row),
    }),
    getCellProps: () => ({
      role: 'cell',
      className: 'sxo-table-cell p-3 text-sm text-neutral-700',
    }),
    getHeaderCellProps: () => ({
      role: 'columnheader',
      className:
        'sxo-table-header-cell p-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider',
    }),
    data,
    columns,
  };
}
