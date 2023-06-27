# @sxo/ui

SXO 设计系统的 UI 组件定义层。

## 安装

```bash
pnpm add @sxo/ui @sxo/engine @sxo/design
```

## 核心功能

### 样式生成器 (Class Generators)
提供跨框架通用的样式生成函数。

```typescript
import { getButtonClasses } from '@sxo/ui';

// 生成按钮所需的原子类
const classes = getButtonClasses({
    variant: 'primary',
    size: 'md'
});
// 返回: "inline-flex items-center justify-center bg-primary-DEFAULT ..."
```

### 类型定义
定义所有组件的 Props 和接口规范。

```typescript
import type { ButtonProps } from '@sxo/ui';
```

## 为什么需要 @sxo/ui？
`@sxo/ui` 是逻辑适配器（如 `vue-sxo`）和核心逻辑（如 `@sxo/design`）之间的桥梁。它确保了不同框架下的组件在样式表现和属性接口上的一致性。
