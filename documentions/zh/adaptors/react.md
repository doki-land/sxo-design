# react-sxo

SXO 设计系统的 React 适配器，提供完整的 React Hooks 支持和类型安全。

## 安装

```bash
pnpm add react-sxo @sxo/ui @sxo/engine @sxo/design
```

## ⚡ JIT 运行时工作原理

`react-sxo` 深度集成了 SXO 的 JIT 引擎。与传统的引入全量 CSS 不同：

1.  **动态样式注入**: 当 React 组件挂载时，适配器会根据组件的 `props` 通知 JIT 引擎生成对应的样式。
2.  **样式池管理**: 引擎会维护一个全局样式池，确保相同的样式声明只会被注入一次。
3.  **响应式更新**: 当组件属性变化时，JIT 引擎会即时计算并更新对应的 CSS 类。

## 功能特性

- **React Hooks**: 提供 `useSxo` 等 Hooks 接口，支持在函数组件中直接调用 JIT 引擎能力。
- **SxoProvider**: 充当 JIT 引擎的上下文容器，负责管理主题状态和样式注入点。
- **类型安全**: 完整的 TypeScript 定义，提供属性提示与校验。

## 快速开始

### 1. 配置 Provider

在应用根目录包裹 `SxoProvider`：

```tsx
import { SxoProvider } from 'react-sxo';

function App() {
  return (
    <SxoProvider theme="github">
      <MyComponent />
    </SxoProvider>
  );
}
```

### 2. 使用组件

```tsx
import { Button } from 'react-sxo';

const MyComponent = () => (
  <Button variant="primary" onClick={() => console.log('clicked')}>
    Hello SXO
  </Button>
);
```
