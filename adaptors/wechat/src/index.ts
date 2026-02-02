import { createEngine } from '@sxo/engine';

export interface SxoWechatOptions {
    theme?: any;
}

import { wechatTheme } from '@sxo/theme-wechat';

export class SxoWechatPlugin {
    theme = wechatTheme;

    setup() {
        console.log('[SXO] Wechat Native Adaptor initialized');
    }

    /**
     * 获取主题变量，可用于在页面中动态设置样式
     */
    getTokens() {
        return this.theme;
    }

    /**
     * 将 SXO 样式类转换为微信小程序支持的样式
     */
    applyStyle(className: string): string {
        // 在原生小程序中，我们可能需要将 sxo 的原子类转换为最终的 style 字符串
        // 或者直接返回编译后的类名（如果在构建时处理了）
        return className;
    }
}

/**
 * 原生小程序组件使用的 Hook
 */
export function useSxo() {
    return {
        cls: (classes: string) => classes, // 简单返回，实际逻辑可以在这里扩展
    };
}
