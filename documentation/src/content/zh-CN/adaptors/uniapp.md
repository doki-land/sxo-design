# uniapp-sxo

`@sxo/uniapp` 是专为 UniApp 生态设计的 SXO 设计系统适配器。它解决了标准 Web 组件在小程序受限环境下的各种显示与交互异常。

## 💡 重要说明：UniApp 与 Vue 的关系

在开始使用前，开发者必须明确一个核心常识：**UniApp 并不是 Vue。**

虽然 UniApp 借用了 Vue 的语法外壳（SFC 结构、响应式 API、组件化等），但其底层渲染引擎和运行机制与标准 Vue (Web) 有本质区别：

1.  **无 DOM 操作**：小程序环境没有 `window` 或 `document`，所有运行时依赖 DOM 扫描或动态插入 `style` 标签的逻辑都将失效。
2.  **渲染限制**：例如小程序不支持直接渲染原生 `svg` 标签，必须通过 Data URI 或其他转换手段。
3.  **样式隔离**：组件间的样式穿透和变量共享受到小程序平台严格的 Shadow DOM 隔离限制。

`@sxo/uniapp` 适配层正是为了抹平这些差异而生，确保 SXO 组件在非 Web 环境下依然能保持 100% 的视觉一致性。

## 安装

```bash
pnpm add @sxo/uniapp @sxo/theme-antd @sxo/design
```

## 快速开始

### 1. 注册插件

在 `main.ts` 中引入并使用 `createSxo` 插件：

```typescript
import { createSSRApp } from 'vue';
import { createSxo } from '@sxo/uniapp';
import { antdTheme } from '@sxo/theme-antd';
import App from './App.vue';
import 'virtual:sxo.css'; // 必须引入编译生成的样式文件

export function createApp() {
    const app = createSSRApp(App);
    
    app.use(createSxo({
        theme: antdTheme
    }));
    
    return { app };
}
```

### 2. 使用组件

```vue
<template>
  <view class="p-4">
    <SxoButton variant="primary" @click="handleClick">
      点击我
    </SxoButton>
    <SxoIcon name="Link2" size="48rpx" color="#228AFF" />
  </view>
</template>

<script setup>
import { SxoButton, SxoIcon } from '@sxo/uniapp';

const handleClick = () => console.log('Hello SXO UniApp!');
</script>
```

## ⚡ 编译时 JIT 机制

与 Web 版不同，`@sxo/uniapp` 放弃了运行时 JIT 注入，转而完全依赖编译时分析：

1.  **静态提取**: `vite-plugin-sxo` 会在编译时扫描代码中的原子类。
2.  **预生成 CSS**: 所有的 CSS 变量和工具类都会预先生成并打包进 `virtual:sxo.css`。
3.  **性能优先**: 避免了小程序运行时计算样式的性能开销。

## 功能特性

- **跨端一致性**: 抹平 H5、小程序、App 之间的 UI 表现差异。
- **高性能**: 纯静态样式方案，无运行时 DOM 性能损耗。
- **类型安全**: 完善的 TypeScript 支持。
