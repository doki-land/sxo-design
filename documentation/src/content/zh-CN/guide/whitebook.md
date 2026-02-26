---
title: 架构白皮书
description: SXO Design System 顶层架构设计与愿景
---

# 📜 SXO Design System 白皮书：顶层架构设计

## 一、核心理念与愿景

**SXO** 是一个面向现代 Web 的、**渐进式**、**原子化**和**主题驱动**的设计系统。它倡导 **“逻辑与样式分离”** 和 **“样式与主题分离”** 的原则，旨在提供从底层设计令牌到高层业务组件的完整、灵活且高性能的技术栈解决方案。

**设计哲学：**
- **分层解耦**：逻辑、样式、主题可独立使用或组合。
- **开发者体验优先**：提供强类型提示、智能补全和优秀的文档。
- **高性能与灵活性**：默认零运行时样式，支持按需生成与静态提取。

## 二、生态系统全景

下图展示了 SXO 生态系统各核心包与扩展包的依赖关系与架构层次：

```mermaid
graph TB
    subgraph "基础架构层"
        A1[@sxo/design<br/>设计令牌与Headless逻辑]
        A2[@sxo/engine<br/>JIT样式引擎]
    end

    subgraph "核心产品层"
        B1[@sxo/ui<br/>全功能主题化组件库]
    end

    subgraph "框架适配层"
        C1[@sxo/react]
        C2[@sxo/plugin-vue]
        C3[@sxo/plugin-vue2]
        C4[@sxo/solid]
        C5[@sxo/svelte]
        C6[@sxo/alpine]
    end

    subgraph "构建工具层"
        D1[@sxo/vite-plugin]
        D2[@sxo/cli]
    end

    subgraph "官方扩展生态"
        E1[@sxo/theme-* 系列]
        E2[@sxo/component-table]
        E3[@sxo/component-admin]
        E4[@sxo/component-icons]
        E5[@sxo/bundle]
    end

    A1 & A2 --> B1
    B1 --> C1 & C2 & C3 & C4 & C5 & C6
    A2 --> D1
    B1 -.->|可选用| E1 & E2 & E3 & E4 & E5
```

---

## 三、核心包详细设计

### 1. **`@sxo/design` - 设计系统原子层**
**定位**： 整个系统的**基石**，不依赖任何 UI 框架或样式引擎。
**核心职责**：
- **设计令牌 (Design Tokens)**： 以 `JSON` 和 `TypeScript` 形式定义颜色、间距、字体、阴影等所有原始值。
- **Headless 组件逻辑**： 提供完全无样式的、可访问性完备的组件行为 Hook（如 `useDialog`， `useMenu`）。
- **工具函数**： 提供令牌解析、主题计算、工具类生成等基础工具。

**接口示例（理念）**：
```typescript
// 设计令牌结构
export interface DesignTokens {
  color: { primary: { 50: string; 100: string; ... } };
  spacing: { unit: number; xs: string; sm: string; ... };
  // ...
}

// Headless Hook
export function usePopover(options: PopoverOptions): PopoverApi;
```

---

### 2. **`@sxo/engine` - 原子化 CSS JIT 引擎**
**定位**： 样式生成大脑，替代 UnoCSS/Tailwind JIT 核心。
**核心职责**：
- **规则解析与匹配**： 解析源码中的类名（如 `m-4`， `bg-primary`）。
- **按需样式生成**： 仅生成使用过的样式规则，并转换为 CSS。
- **动态主题支持**： 与 `@sxo/design` 的令牌系统深度集成，支持运行时主题变量注入。
- **预设系统**： 提供一套默认的、符合 `@sxo/design` 规范的实用类预设。

**工作流程**：
1.  扫描源代码。
2.  将类名映射到设计令牌 and 规则。
3.  即时生成精简的 CSS 块。

---

### 3. **`@sxo/ui` - 主题化组件库（旗舰产品）**
**定位**： 面向最终用户的、开箱即用的组件库。
**核心职责**：
- **组件封装**： 将 `@sxo/design` 的逻辑与 `@sxo/engine` 的样式结合，封装成高质量的 UI 组件（`Button`， `Input`， `Modal`）。
- **内置主题系统**：
    - **`ThemeProvider`**： 提供上下文，管理当前主题（亮色/暗色/自定义）。
    - **默认主题**： 提供一套精心设计的、符合 WCAG 标准的默认外观。
- **可扩展性设计**：
    - **组件级覆盖**： 通过 `className` 或 `style` 属性扩展。
    - **令牌级覆盖**： 通过 `ThemeProvider` 传入部分自定义令牌，局部覆盖主题。
    - **主题包导入**： 支持无缝接入 `@sxo/theme-*` 扩展包。

---

## 四、官方扩展生态设计

### 1. **`@sxo/theme-*` 系列（主题包）**
- **`@sxo/theme-github`**： 仿 GitHub 视觉风格的主题变量集合。
- **`@sxo/theme-material`**： 遵循 Material Design 3 规范的主题。
- **`@sxo/theme-legacy`**： 为旧系统迁移设计的紧凑型主题。
**设计**： 每个主题包导出 **一个完整的令牌对象**，可直接提供给 `ThemeProvider`。

### 2. **`@sxo/component-*` 系列（高级组件包）**
- **`@sxo/component-table`**： 高性能、可虚拟化的数据表格组件。
- **`@sxo/component-chart`**： 基于 SVG 的轻量级图表组件。
- **`@sxo/component-rich-editor`**： 富文本编辑器。
**设计**： 这些组件**深度依赖** `@sxo/ui` 的基础样式和主题系统，确保视觉统一。

---

## 五、框架与工具链集成

### 1. **`@sxo/react` & `@sxo/plugin-vue` 等**
**定位**： 框架专属的丝滑体验层。
**职责**：
- **框架适配**： 提供适用于 React, Vue, Solid 等框架的 `ThemeProvider` 组件。
- **组合式 API/Hooks**： 提供 `useTheme`, `useBreakpoint` 等框架友好的工具。
- **组件重写**： 利用框架特性（如 React Hooks 或 Vue SFC）封装 `@sxo/ui` 的基础能力。
- **类型绑定**： 提供完美的框架端类型提示。

### 2. **`@sxo/vite-plugin`**
**定位**： 构建优化与开发体验增强。
**核心功能**：
- **引擎集成**： 在 Vite 开发服务器中集成 `@sxo/engine` 的 JIT 能力。
- **类名扫描**： 智能扫描项目源码中使用的 SXO 类名，实现最优的 CSS 树摇。
- **主题预构建**： 在构建阶段将主题令牌静态提取为 CSS 变量，提升运行时性能。
- **诊断页面**： 提供 `/__sxo` 诊断页面，实时展示类名生成情况。

---

## 六、模块依赖关系与发布策略

### 依赖流
```
@sxo/design
    ^
    | (依赖令牌和类型)
@sxo/engine
    ^
    | (共同构成核心)
@sxo/ui
    ^
    | (可选依赖)
@sxo/theme-*
@sxo/component-*
    ^
    | (框架封装)
@sxo/react / @sxo/plugin-vue / ...
    ^
    | (构建时优化)
@sxo/vite-plugin
```

### 发布策略
1.  **独立版本控制**： 核心包（design, engine, ui）遵循同步的主版本号，确保兼容性。扩展包可独立迭代。
2.  **Monorepo 管理**： 使用 `pnpm workspace` 管理所有包，通过 Changesets 处理版本发布。
3.  **多入口导出**：
    - `import { Button } from '@sxo/ui'`： 标准入口。
    - `import { usePopover } from '@sxo/design'`： 仅需逻辑时使用。
    - `import { githubTheme } from '@sxo/theme-github'`： 仅需主题时使用。

## 七、总结：SXO 的设计优势

通过以上分层和模块化设计，SXO 生态系统实现了：
- **渐进式采用**： 团队可以从仅使用 `@sxo/ui` 开始，逐步深入到定制 `@sxo/design` 令牌。
- **无厂商锁定**： 逻辑层 (`design`) 和样式层 (`engine`) 的分离，使得替换其中任何一部分成为可能。
- **极致性能**： 从设计源头 (`JIT引擎` + `按需生成`) 保障了最终的 CSS 体积最优。
- **生态繁荣**： 清晰的扩展接口 (`theme-*`， `component-*`) 鼓励社区贡献，形成丰富的主题与组件市场。

---

## 八、当前评估与未来演进 (Evaluation & Roadmap)

### 1. 当前状态 (Current State)
*   **核心层 (Stable)**: `@sxo/design`, `@sxo/engine`, `@sxo/ui` 已发布 1.0.0-beta 版本。
*   **适配层 (Extensive)**: 已覆盖 React, Vue 2/3, Solid, Svelte, Alpine 等主流框架，并提供一致의 API。
*   **主题层 (Rich)**: 内置 Antd, GitHub, Material, Carbon, PronHub, Fluent, Wechat, Fate 等 10+ 款主题。
*   **工具层 (Functional)**: `@sxo/vite-plugin` 支持 JIT 预览与诊断，`@sxo/cli` 支持项目初始化与主题管理。
*   **CDN 落地**: `@sxo/bundle` 已实现 AOT 编译流程，支持核心样式与主题样式分离。

### 2. 短期计划 (Short-term: 1-3 Months)
*   **API 1.0 正式版**: 完成最后的 API 审查，发布正式稳定版本。
*   **文档 2.0**: 完善 VitePress 文档，增加交互式 Playground 和每个组件的详细示例。
*   **性能调优**: 优化 `@sxo/engine` 的解析算法，在超大规模项目中保持毫秒级生成速度。

### 3. 中期计划 (Medium-term: 3-9 Months)
*   **在线主题生成器**: 开发可视化界面，允许用户在线调整令牌并实时预览/下载 CSS 主题文件。
*   **高级组件库增强**: 完善 `@sxo/component-table` (支持虚拟滚动、列拖拽) 和 `@sxo/component-admin` (提供开箱即用的后台框架)。
*   **全栈集成**: 提供 Nuxt, Next.js, Remix 等全栈框架的官方插件支持。

### 4. 长期计划 (Long-term: 9+ Months)
*   **生态市场**: 建立主题和高级组件市场，支持社区开发者发布和共享插件。
*   **跨端支持**: 探索 `@sxo/design` 在 React Native 和小程序环境下的适配方案。

---

这个架构为构建一个现代、健壮、可扩展的设计系统奠定了坚实的技术基础。
