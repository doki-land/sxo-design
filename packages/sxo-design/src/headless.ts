export interface DisclosureState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export interface PopoverOptions {
    defaultOpen?: boolean;
    id?: string;
}

/**
 * 通用的 Disclosure 逻辑：处理展开/收起状态
 */
export function useDisclosure(options: PopoverOptions = {}) {
    let isOpen = options.defaultOpen ?? false;
    const id = options.id ?? `sxo-disclosure-${Math.random().toString(36).substr(2, 9)}`;

    return {
        isOpen,
        open: () => {
            isOpen = true;
        },
        close: () => {
            isOpen = false;
        },
        toggle: () => {
            isOpen = !isOpen;
        },
        getButtonProps: () => ({
            id: `${id}-button`,
            'aria-expanded': isOpen,
            'aria-controls': `${id}-panel`,
            onClick: () => {
                isOpen = !isOpen;
            },
        }),
        getPanelProps: () => ({
            id: `${id}-panel`,
            hidden: !isOpen,
            style: { display: isOpen ? 'block' : 'none' },
        }),
    };
}

/**
 * Toggle 逻辑：处理开关状态
 */
export function useToggle(initialState = false) {
    let isOn = initialState;
    return {
        isOn,
        on: () => {
            isOn = true;
        },
        off: () => {
            isOn = false;
        },
        toggle: () => {
            isOn = !isOn;
        },
        getToggleProps: () => ({
            role: 'switch',
            'aria-checked': isOn,
            tabIndex: 0,
            onClick: () => {
                isOn = !isOn;
            },
        }),
    };
}

/**
 * 更加符合 Headless UI 规范的 Dialog 逻辑
 */
export function useDialog(options: PopoverOptions = {}) {
    const disclosure = useDisclosure(options);
    const id = options.id ?? `sxo-dialog-${Math.random().toString(36).substr(2, 9)}`;

    return {
        ...disclosure,
        // Prop Getters 模式：自动处理 ARIA 和必要的属性
        getDialogProps: () => ({
            id,
            role: 'dialog',
            'aria-modal': 'true',
            'aria-hidden': !disclosure.isOpen,
            style: { display: disclosure.isOpen ? 'block' : 'none' },
        }),
        getOverlayProps: () => ({
            'aria-hidden': 'true',
            onClick: disclosure.close,
        }),
        getCloseButtonProps: () => ({
            'aria-label': 'Close dialog',
            onClick: disclosure.close,
        }),
    };
}

/**
 * 更加符合 Headless UI 规范的 Menu 逻辑
 */
export function useMenu(options: PopoverOptions = {}) {
    const disclosure = useDisclosure(options);
    const menuId = options.id ?? `sxo-menu-${Math.random().toString(36).substr(2, 9)}`;

    return {
        ...disclosure,
        getMenuProps: () => ({
            id: menuId,
            role: 'menu',
            'aria-orientation': 'vertical' as const,
        }),
        getItemProps: (itemId: string) => ({
            id: itemId,
            role: 'menuitem',
            tabIndex: 0,
        }),
        getTriggerProps: () => ({
            'aria-haspopup': 'true',
            'aria-expanded': disclosure.isOpen,
            'aria-controls': menuId,
            onClick: disclosure.toggle,
        }),
    };
}

/**
 * Tabs 逻辑：处理选项卡切换与 ARIA 关联
 */
export function useTabs(options: { defaultIndex?: number; id?: string } = {}) {
    let selectedIndex = options.defaultIndex ?? 0;
    const baseId = options.id ?? `sxo-tabs-${Math.random().toString(36).substr(2, 9)}`;

    return {
        selectedIndex,
        setSelectedIndex: (index: number) => {
            selectedIndex = index;
        },
        getTabListProps: () => ({
            role: 'tablist',
            'aria-orientation': 'horizontal' as const,
        }),
        getTabProps: (index: number) => ({
            id: `${baseId}-tab-${index}`,
            role: 'tab',
            'aria-selected': selectedIndex === index,
            'aria-controls': `${baseId}-panel-${index}`,
            tabIndex: selectedIndex === index ? 0 : -1,
        }),
        getTabPanelProps: (index: number) => ({
            id: `${baseId}-panel-${index}`,
            role: 'tabpanel',
            'aria-labelledby': `${baseId}-tab-${index}`,
            hidden: selectedIndex !== index,
        }),
    };
}

/**
 * Tooltip 逻辑：处理延迟显示与 ARIA
 */
export function useTooltip(options: { delay?: number; id?: string } = {}) {
    const state = useDisclosure();
    const id = options.id ?? `sxo-tooltip-${Math.random().toString(36).substr(2, 9)}`;
    let timer: any = null;

    return {
        ...state,
        getTriggerProps: () => ({
            'aria-describedby': state.isOpen ? id : undefined,
            onMouseEnter: () => {
                timer = setTimeout(state.open, options.delay ?? 200);
            },
            onMouseLeave: () => {
                clearTimeout(timer);
                state.close();
            },
            onFocus: state.open,
            onBlur: state.close,
        }),
        getTooltipProps: () => ({
            id,
            role: 'tooltip',
            style: {
                position: 'absolute' as const,
                visibility: state.isOpen ? ('visible' as const) : ('hidden' as const),
            },
        }),
    };
}

/**
 * Accordion 逻辑：处理多项展开/收起
 */
export function useAccordion(
    options: { allowMultiple?: boolean; defaultExpanded?: string[] } = {},
) {
    let expandedItems = options.defaultExpanded ?? [];

    const toggleItem = (itemId: string) => {
        if (expandedItems.includes(itemId)) {
            expandedItems = expandedItems.filter((id) => id !== itemId);
        } else {
            expandedItems = options.allowMultiple ? [...expandedItems, itemId] : [itemId];
        }
    };

    return {
        expandedItems,
        toggleItem,
        getItemProps: (itemId: string) => {
            const isExpanded = expandedItems.includes(itemId);
            const triggerId = `accordion-trigger-${itemId}`;
            const regionId = `accordion-region-${itemId}`;

            return {
                triggerProps: {
                    id: triggerId,
                    'aria-expanded': isExpanded,
                    'aria-controls': regionId,
                    onClick: () => toggleItem(itemId),
                },
                regionProps: {
                    id: regionId,
                    role: 'region',
                    'aria-labelledby': triggerId,
                    hidden: !isExpanded,
                },
            };
        },
    };
}

/**
 * Checkbox 逻辑
 */
export function useCheckbox(options: { defaultChecked?: boolean; id?: string } = {}) {
    let isChecked = options.defaultChecked ?? false;
    const id = options.id ?? `sxo-checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return {
        isChecked,
        setChecked: (checked: boolean) => {
            isChecked = checked;
        },
        toggle: () => {
            isChecked = !isChecked;
        },
        getInputProps: () => ({
            id,
            type: 'checkbox',
            checked: isChecked,
            'aria-checked': isChecked,
        }),
        getLabelProps: () => ({
            htmlFor: id,
        }),
    };
}

/**
 * Radio Group 逻辑
 */
export function useRadioGroup(options: { defaultValue?: string; name?: string } = {}) {
    let value = options.defaultValue ?? '';
    const name = options.name ?? `sxo-radio-group-${Math.random().toString(36).substr(2, 9)}`;

    return {
        value,
        setValue: (newValue: string) => {
            value = newValue;
        },
        getRadioProps: (itemValue: string) => ({
            type: 'radio',
            name,
            value: itemValue,
            checked: value === itemValue,
            'aria-checked': value === itemValue,
        }),
    };
}

/**
 * Select 逻辑
 */
export function useSelect(options: { defaultValue?: string; id?: string } = {}) {
    const disclosure = useDisclosure();
    let value = options.defaultValue ?? '';
    const id = options.id ?? `sxo-select-${Math.random().toString(36).substr(2, 9)}`;

    return {
        ...disclosure,
        value,
        setValue: (newValue: string) => {
            value = newValue;
            disclosure.close();
        },
        getTriggerProps: () => ({
            ...disclosure.getButtonProps(),
            id: `${id}-trigger`,
            role: 'combobox',
            'aria-haspopup': 'listbox',
            'aria-expanded': disclosure.isOpen,
            'aria-controls': `${id}-listbox`,
        }),
        getListboxProps: () => ({
            id: `${id}-listbox`,
            role: 'listbox',
            hidden: !disclosure.isOpen,
        }),
        getOptionProps: (optionValue: string) => ({
            role: 'option',
            'aria-selected': value === optionValue,
            onClick: () => {
                value = optionValue;
                disclosure.close();
            },
        }),
    };
}

/**
 * Toast / Notification 逻辑
 */
export interface Toast {
    id: string;
    title?: string;
    description?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function useToastManager() {
    let toasts: Toast[] = [];
    const listeners = new Set<(toasts: Toast[]) => void>();

    const notify = () => {
        listeners.forEach((listener) => listener([...toasts]));
    };

    return {
        getToasts: () => toasts,
        subscribe: (listener: (toasts: Toast[]) => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        add: (toast: Omit<Toast, 'id'>) => {
            const id = Math.random().toString(36).substr(2, 9);
            const newToast = { ...toast, id };
            toasts = [...toasts, newToast];
            notify();

            if (toast.duration !== 0) {
                setTimeout(() => {
                    toasts = toasts.filter((t) => t.id !== id);
                    notify();
                }, toast.duration ?? 3000);
            }
            return id;
        },
        remove: (id: string) => {
            toasts = toasts.filter((t) => t.id !== id);
            notify();
        },
    };
}

/**
 * Form 验证逻辑
 */
export interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    /** 自定义校验函数 */
    validator?: (value: any) => boolean | string | Promise<boolean | string>;
    message: string;
}

export function useForm<T extends Record<string, any>>(options: {
    initialValues: T;
    rules?: Record<keyof T, ValidationRule[]>;
    onSubmit: (values: T) => void;
}) {
    let values = { ...options.initialValues };
    let errors: Partial<Record<keyof T, string>> = {};
    const listeners = new Set<() => void>();

    const notify = () => {
        listeners.forEach((l) => l());
    };

    const validateField = async (name: keyof T) => {
        const fieldRules = options.rules?.[name];
        if (!fieldRules) return true;

        const value = values[name];
        for (const rule of fieldRules) {
            if (rule.required && !value) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.min && String(value).length < rule.min) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.max && String(value).length > rule.max) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.pattern && !rule.pattern.test(String(value))) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.validator) {
                const result = await rule.validator(value);
                if (result === false) {
                    errors[name] = rule.message;
                    return false;
                }
                if (typeof result === 'string') {
                    errors[name] = result;
                    return false;
                }
            }
        }

        delete errors[name];
        return true;
    };

    return {
        values,
        errors,
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
        setFieldValue: async (name: keyof T, value: any) => {
            values[name] = value;
            await validateField(name);
            notify();
        },
        handleSubmit: async (e?: any) => {
            if (e && e.preventDefault) e.preventDefault();

            let isValid = true;
            const validationPromises = [];
            for (const key in options.rules) {
                validationPromises.push(validateField(key as keyof T));
            }

            const results = await Promise.all(validationPromises);
            isValid = results.every((res) => res === true);

            notify();
            if (isValid) {
                options.onSubmit(values);
            }
        },
    };
}

/**
 * 轻量级 i18n 逻辑
 */
export interface I18nMessages {
    [lang: string]: {
        [key: string]: string | ((...args: any[]) => string);
    };
}

export function createI18n(options: {
    locale: string;
    fallbackLocale?: string;
    messages: I18nMessages;
}) {
    let currentLocale = options.locale;
    const listeners = new Set<(locale: string) => void>();

    const t = (key: string, ...args: any[]): string => {
        const langMessages =
            options.messages[currentLocale] ||
            options.messages[options.fallbackLocale || 'en'] ||
            {};
        const message = langMessages[key];

        if (typeof message === 'function') {
            return message(...args);
        }
        if (typeof message === 'string') {
            return message.replace(/{(\d+)}/g, (match, index) => {
                return args[index] !== undefined ? args[index] : match;
            });
        }
        return key;
    };

    return {
        get locale() {
            return currentLocale;
        },
        set locale(newLocale: string) {
            currentLocale = newLocale;
            listeners.forEach((l) => l(newLocale));
        },
        t,
        subscribe: (l: (locale: string) => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
    };
}

/**
 * 拖拽逻辑
 */
export function useDraggable(options: { onDrag?: (pos: { x: number; y: number }) => void } = {}) {
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        const event = 'touches' in e ? e.touches[0] : e;
        startPos = {
            x: event.clientX - currentPos.x,
            y: event.clientY - currentPos.y,
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const event = 'touches' in e ? e.touches[0] : e;
        currentPos = {
            x: event.clientX - startPos.x,
            y: event.clientY - startPos.y,
        };
        options.onDrag?.(currentPos);
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
    };

    return {
        getDragProps: () => ({
            onMouseDown: handleMouseDown,
            onTouchStart: handleMouseDown,
            style: { cursor: 'move', userSelect: 'none' as const },
        }),
        position: currentPos,
    };
}

/**
 * 虚拟列表逻辑：优化大数据量渲染
 */
export function useVirtualList(options: {
    itemHeight: number;
    totalItems: number;
    containerHeight: number;
    overscan?: number;
}) {
    const overscan = options.overscan ?? 5;
    let scrollTop = 0;

    const calculateRange = (top: number) => {
        const start = Math.floor(top / options.itemHeight);
        const end = Math.ceil((top + options.containerHeight) / options.itemHeight);

        return {
            start: Math.max(0, start - overscan),
            end: Math.min(options.totalItems, end + overscan),
        };
    };

    return {
        getContainerProps: () => ({
            style: {
                height: `${options.containerHeight}px`,
                overflow: 'auto',
                position: 'relative' as const,
            },
            onScroll: (e: any) => {
                scrollTop = e.target.scrollTop;
            },
        }),
        getWrapperProps: () => ({
            style: {
                height: `${options.totalItems * options.itemHeight}px`,
                position: 'relative' as const,
            },
        }),
        getItemProps: (index: number) => ({
            style: {
                position: 'absolute' as const,
                top: 0,
                left: 0,
                width: '100%',
                height: `${options.itemHeight}px`,
                transform: `translateY(${index * options.itemHeight}px)`,
            },
        }),
        getVisibleRange: (top: number = scrollTop) => calculateRange(top),
    };
}

/**
 * 增强表格逻辑：排序、分页、过滤
 */
export function useTable<T>(options: {
    data: T[];
    pagination?: { pageSize: number; defaultPage?: number };
    sortable?: boolean;
}) {
    let data = [...options.data];
    let currentPage = options.pagination?.defaultPage ?? 1;
    let pageSize = options.pagination?.pageSize ?? 10;
    let sortConfig: { key: keyof T; direction: 'asc' | 'desc' } | null = null;
    let filters: Partial<Record<keyof T, string>> = {};

    const listeners = new Set<() => void>();
    const notify = () => listeners.forEach((l) => l());

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
    let selectedKeys = new Set<string | number>();

    const listeners = new Set<() => void>();
    const notify = () => {
        listeners.forEach((l) => l());
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

/**
 * 命令面板逻辑：处理全局快捷键与指令注册
 */
export interface Command {
    id: string;
    title: string;
    description?: string;
    shortcut?: string;
    action: () => void;
    category?: string;
}

export function useCommandManager() {
    let commands: Command[] = [];
    const listeners = new Set<() => void>();

    const notify = () => listeners.forEach((l) => l());

    const handleKeyDown = (e: KeyboardEvent) => {
        commands.forEach((cmd) => {
            if (
                cmd.shortcut &&
                e.key.toLowerCase() === cmd.shortcut.toLowerCase() &&
                (e.ctrlKey || e.metaKey)
            ) {
                e.preventDefault();
                cmd.action();
            }
        });
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
    }

    return {
        register: (cmd: Command) => {
            commands = [...commands, cmd];
            notify();
            return () => {
                commands = commands.filter((c) => c.id !== cmd.id);
                notify();
            };
        },
        getCommands: (query: string = '') => {
            if (!query) return commands;
            return commands.filter(
                (c) =>
                    c.title.toLowerCase().includes(query.toLowerCase()) ||
                    c.category?.toLowerCase().includes(query.toLowerCase()),
            );
        },
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
        cleanup: () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', handleKeyDown);
            }
        },
    };
}
