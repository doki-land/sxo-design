/**
 * 增强表格逻辑：排序、分页、过滤
 */
export function useTable<T>(options: {
    data: T[];
    pagination?: { pageSize: number; defaultPage?: number };
    sortable?: boolean;
}) {
    const data = [...options.data];
    let currentPage = options.pagination?.defaultPage ?? 1;
    const pageSize = options.pagination?.pageSize ?? 10;
    let sortConfig: { key: keyof T; direction: 'asc' | 'desc' } | null = null;
    const filters: Partial<Record<keyof T, string>> = {};

    const listeners = new Set<() => void>();
    const notify = () => {
        listeners.forEach((l) => l());
    };

    const getProcessedData = () => {
        let result = [...data];

        // 1. 过滤
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                const filterValue = String(value).toLowerCase();
                result = result.filter((item: any) =>
                    String(item[key]).toLowerCase().includes(filterValue),
                );
            }
        });

        // 2. 排序
        if (sortConfig) {
            result.sort((a: any, b: any) => {
                if (a[sortConfig!.key] < b[sortConfig!.key])
                    return sortConfig!.direction === 'asc' ? -1 : 1;
                if (a[sortConfig!.key] > b[sortConfig!.key])
                    return sortConfig!.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // 3. 分页
        const total = result.length;
        const start = (currentPage - 1) * pageSize;
        const pagedData = result.slice(start, start + pageSize);

        return { data: pagedData, total, pages: Math.ceil(total / pageSize) };
    };

    return {
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
        getProcessedData,
        setSort: (key: keyof T) => {
            if (sortConfig?.key === key) {
                sortConfig = sortConfig.direction === 'asc' ? { key, direction: 'desc' } : null;
            } else {
                sortConfig = { key, direction: 'asc' };
            }
            notify();
        },
        setPage: (page: number) => {
            currentPage = page;
            notify();
        },
        setFilter: (key: keyof T, value: string) => {
            filters[key] = value;
            currentPage = 1;
            notify();
        },
        getSortDirection: (key: keyof T) => {
            if (sortConfig?.key === key) return sortConfig.direction;
            return null;
        },
        getCurrentPage: () => currentPage,
        getSortProps: (key: keyof T) => ({
            onClick: () => {
                if (options.sortable) {
                    // Logic handled by setSort
                }
            },
            style: { cursor: options.sortable ? 'pointer' : 'default' },
            'aria-sort': sortConfig?.key === key ? sortConfig.direction : 'none',
        }),
    };
}
