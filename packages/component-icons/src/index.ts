import { BasicIcons } from './icons/basic';
import { AuthIcons } from './icons/auth';
import { SocialIcons } from './icons/social';
import { NavigationIcons } from './icons/navigation';
import { ContentIcons } from './icons/content';
import { StatusIcons } from './icons/status';
import { MediaIcons } from './icons/media';
import { SystemIcons } from './icons/system';

/**
 * 图标路径类型定义
 */
export type IconPath = string;

/**
 * 图标变体定义
 */
export interface IconDefinition {
    linear: IconPath;
    solid?: IconPath;
}

/**
 * 所有图标路径集合
 */
export const Icons = {
    ...BasicIcons,
    ...AuthIcons,
    ...SocialIcons,
    ...NavigationIcons,
    ...ContentIcons,
    ...StatusIcons,
    ...MediaIcons,
    ...SystemIcons,
} as const;

/**
 * 通用图标属性
 */
export interface IconProps {
    name: keyof typeof Icons;
    size?: number | string;
    color?: string;
    className?: string;
    strokeWidth?: number;
    variant?: 'linear' | 'solid';
}

/**
 * 渲染 SVG 图标的辅助函数 (框架无关)
 */
export function getIconSvg(props: IconProps) {
    const {
        name,
        size = '1em',
        color = 'currentColor',
        strokeWidth = 2,
        className = '',
        variant = 'linear',
    } = props;

    const iconDef = Icons[name] as IconDefinition;
    const path = variant === 'solid' && iconDef.solid ? iconDef.solid : iconDef.linear;
    const isSolid = variant === 'solid' && !!iconDef.solid;

    return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 24 24" 
      fill="${isSolid ? color : 'none'}" 
      stroke="${isSolid ? 'none' : color}" 
      stroke-width="${strokeWidth}" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      class="${className}"
    >
      <path d="${path}" />
    </svg>
  `.trim();
}
