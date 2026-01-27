import { type TableOptions, useTable } from '@sxo/component-table';
import { useStyle } from '../hooks.ts';

export interface TableProps<T> extends TableOptions<T> {
    className?: string;
}

export function Table<T>({ data, columns, onRowClick, className = '' }: TableProps<T>) {
    const {
        getTableProps,
        getHeaderProps,
        getBodyProps,
        getRowProps,
        getCellProps,
        getHeaderCellProps,
    } = useTable({ data, columns, onRowClick });

    const tableProps = getTableProps();
    const headerProps = getHeaderProps();
    const bodyProps = getBodyProps();
    const headerCellProps = getHeaderCellProps();
    const cellProps = getCellProps();

    // 收集所有类名并注册到引擎
    const allSxoClasses = [
        tableProps.className,
        headerProps.className,
        bodyProps.className,
        headerCellProps.className,
        cellProps.className,
        'sxo-table-row border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
    ].join(' ');

    useStyle(`${allSxoClasses} ${className}`);

    return (
        <div className="overflow-x-auto">
            <table {...tableProps} className={`${tableProps.className} ${className}`.trim()}>
                <thead {...headerProps}>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} {...headerCellProps}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody {...bodyProps}>
                    {data.map((row, i) => (
                        <tr key={i} {...getRowProps(row)}>
                            {columns.map((col) => (
                                <td key={col.key} {...cellProps}>
                                    {col.render ? col.render(row) : (row as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
