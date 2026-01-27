/**
 * 基础图标路径定义
 */
export const Icons = {
    Check: 'M5 13l4 4L19 7',
    Close: 'M6 18L18 6M6 6l12 12',
    Search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    Menu: 'M4 6h16M4 12h16M4 18h16',
    ChevronDown: 'M19 9l-7 7-7-7',
    ChevronRight: 'M9 5l7 7-7 7',
    Plus: 'M12 4v16m8-8H4',
    Minus: 'M20 12H4',
    Info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    Warning:
        'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
};

/**
 * 通用图标属性
 */
export interface IconProps {
    name: keyof typeof Icons;
    size?: number | string;
    color?: string;
    className?: string;
    strokeWidth?: number;
}

/**
 * 渲染 SVG 图标的辅助函数 (框架无关)
 */
export function getIconSvg(props: IconProps) {
    const { name, size = '1em', color = 'currentColor', strokeWidth = 2, className = '' } = props;
    const path = Icons[name];

    return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="${color}" 
      stroke-width="${strokeWidth}" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      class="${className}"
    >
      <path d="${path}" />
    </svg>
  `.trim();
}
