export interface VirtualListOptions {
    height?: number | string;
}

export function getVirtualListClasses(_options: VirtualListOptions = {}) {
    return {
        container: 'relative overflow-auto',
        wrapper: 'relative w-full',
        item: 'absolute left-0 top-0 w-full',
    };
}
