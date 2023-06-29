import { getPaginationClasses, type PaginationOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface PaginationProps extends PaginationOptions {
    total: number;
    pageSize: number;
    current: number;
    onChange?: (page: number) => void;
    className?: string;
    showTotal?: boolean;
    showJumper?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    total,
    pageSize,
    current,
    onChange,
    className = '',
    size = 'md',
    variant = 'outline',
    rounded = true,
    showTotal = false,
    showJumper = false,
}) => {
    const totalPages = Math.ceil(total / pageSize);

    const classes = getPaginationClasses({
        size,
        variant,
        rounded,
    });

    useStyle(
        `${classes.container} ${classes.item} ${classes.active} ${classes.disabled} ${classes.ellipsis} ${className}`,
    );

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages || page === current) return;
        onChange?.(page);
    };

    const renderPageItem = (page: number) => {
        return (
            <li
                key={page}
                className={`${classes.item} ${current === page ? classes.active : ''}`.trim()}
                onClick={() => changePage(page)}
            >
                {page}
            </li>
        );
    };

    const renderItems = () => {
        const items = [];

        // Previous button
        items.push(
            <li
                key="prev"
                className={`${classes.item} ${current === 1 ? classes.disabled : ''}`.trim()}
                onClick={() => changePage(current - 1)}
            >
                {'<'}
            </li>,
        );

        // Page numbers with ellipsis logic
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(renderPageItem(i));
            }
        } else {
            items.push(renderPageItem(1));
            if (current > 4)
                items.push(
                    <li key="ellipsis-prev" className={classes.ellipsis}>
                        ...
                    </li>,
                );

            const start = Math.max(2, current - 2);
            const end = Math.min(totalPages - 1, current + 2);

            for (let i = start; i <= end; i++) {
                items.push(renderPageItem(i));
            }

            if (current < totalPages - 3)
                items.push(
                    <li key="ellipsis-next" className={classes.ellipsis}>
                        ...
                    </li>,
                );
            items.push(renderPageItem(totalPages));
        }

        // Next button
        items.push(
            <li
                key="next"
                className={`${classes.item} ${current === totalPages ? classes.disabled : ''}`.trim()}
                onClick={() => changePage(current + 1)}
            >
                {'>'}
            </li>,
        );

        return items;
    };

    return (
        <nav className={`${classes.container} ${className}`.trim()}>
            {showTotal && <span className={classes.total}>Total {total}</span>}
            <ul className="flex items-center gap-1 list-none p-0 m-0">{renderItems()}</ul>
            {showJumper && (
                <div className={classes.jumper}>
                    Go to
                    <input
                        className="w-12 h-8 px-2 border rounded text-center outline-none focus:border-primary-500"
                        type="number"
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                const val = parseInt((e.target as HTMLInputElement).value, 10);
                                if (!Number.isNaN(val)) changePage(val);
                            }
                        }}
                    />
                </div>
            )}
        </nav>
    );
};
