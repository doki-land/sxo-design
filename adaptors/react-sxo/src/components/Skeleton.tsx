import { getSkeletonClasses, type SkeletonOptions as UISkeletonOptions } from '@sxo/ui';
import type React from 'react';
import { useStyle } from '../hooks.ts';

export interface SkeletonProps extends UISkeletonOptions {
    /** 是否展示头像占位 */
    avatar?: boolean;
    /** 是否展示标题占位 */
    title?: boolean;
    /** 段落行数 */
    rows?: number;
    /** 是否正在加载。如果为 false，则展示子组件内容 */
    loading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    active = true,
    rounded = true,
    avatar = false,
    title = true,
    rows = 3,
    loading = true,
    children,
    className = '',
}) => {
    const classes = getSkeletonClasses({ active, rounded });
    useStyle(`${classes.root} ${classes.header} ${classes.avatar} ${classes.title} ${classes.paragraph} ${classes.line} ${classes.lineLast} ${className}`);

    if (!loading) return <>{children}</>;

    return (
        <div className={`${classes.root} ${className}`.trim()}>
            {(avatar || title) && (
                <div className={classes.header}>
                    {avatar && <div className={classes.avatar} />}
                    {title && <div className={classes.title} />}
                </div>
            )}
            <div className={classes.paragraph}>
                {Array.from({ length: rows }).map((_, i) => (
                    <div
                        key={i}
                        className={i === rows - 1 ? classes.lineLast : classes.line}
                    />
                ))}
            </div>
        </div>
    );
};
