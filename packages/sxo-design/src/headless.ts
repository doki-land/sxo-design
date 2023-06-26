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
  const state = createDisclosure();
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
