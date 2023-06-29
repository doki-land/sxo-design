# SXO

SXO 是一个模块化的、跨框架的设计系统引擎。它旨在提供一套统一的设计语言和组件逻辑，同时支持多种主流前端框架。

## 特性

- **跨框架支持**: 原生支持 Vue 3, Vue 2, React, Solid, Svelte 和 Alpine.js。
- **模块化设计**: 按需引入，保持包体积最小化。
- **设计令牌 (Design Tokens)**: 基于 Token 的样式管理，易于自定义和扩展。
- **Headless 逻辑**: 核心逻辑与渲染分离，方便定制 UI。

## 在线演示

- **官方文档**: [sxo-engine.pages.dev](https://sxo-engine.pages.dev)
- **交互实验室**: [sxo-lab.pages.dev](https://sxo-lab.pages.dev)
- **组件预览**: [sxo-preview.pages.dev](https://sxo-preview.pages.dev)

## 项目结构

```text
.
├── adaptors/         # 各框架适配器 (Vue, React, Solid, etc.)
├── documentions/     # 项目文档 (VitePress)
├── examples/         # 各框架使用示例
├── packages/         # 核心包与无头组件
└── pnpm-workspace.yaml
```

## 快速开始

### 安装

使用 pnpm 安装核心包和对应的适配器：

```bash
pnpm add @sxo/engine @sxo/design vue-sxo
```

### 使用

#### Vue 3

```typescript
import { createApp } from 'vue'
import { createSxo } from 'vue-sxo'
import App from './App.vue'

const app = createApp(App)
app.use(createSxo())
app.mount('#app')
```

#### React

```tsx
import { SxoProvider } from 'react-sxo'

function App() {
  return (
    <SxoProvider>
      <YourApp />
    </SxoProvider>
  )
}
```

## 开发

本项目使用 pnpm 作为包管理工具。

```bash
# 安装依赖
pnpm install

# 启动文档开发服务器
pnpm --filter documentions dev

# 构建所有包
pnpm build

# 运行测试
pnpm test
```

## 许可证

本项目基于 [MIT License](LICENSE.md) 开源。
