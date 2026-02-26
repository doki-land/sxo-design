# 与主流库对比

SXO UI 并非旨在替代 Ant Design 或 Element Plus，而是为现代 Web 开发提供一种**更轻量、更灵活、彻底解耦**的替代方案。

## 核心差异

| 特性 | SXO UI | Ant Design / Element Plus |
| :--- | :--- | :--- |
| **样式引擎** | Atomic CSS (Tailwind/UnoCSS) | CSS-in-JS / SCSS / Less |
| **运行时开销** | 接近零 (纯类名切换) | 较高 (动态样式计算/大型 CSS 文件) |
| **跨框架支持** | 原生支持 (适配器架构) | 需维护多个独立仓库 |
| **定制化** | 极其简单 (修改原子类定义) | 较复杂 (需了解特定的 Theme 系统) |
| **逻辑复用** | 逻辑与样式完全分离 | 逻辑与样式高度耦合 |

## 为什么选择 SXO UI？

### 1. 极致的性能
SXO UI 不会向你的浏览器发送成千上万行的 CSS。它利用项目中已有的原子类，仅在需要时生成微小的类名组合。这对于追求 LCP 和 FCP 指标的应用至关重要。

### 2. 彻底的解耦
传统的组件库通常将“怎么做”（逻辑）和“长什么样”（样式）捆绑在一起。在 SXO UI 中：
- `sxo-ui` 只负责定义组件在不同状态下的**样式类名**（Atomic CSS 组合）。
- `adaptors` 负责处理不同框架（Vue, React, Solid, Alpine 等）的**交互逻辑**。

这种架构允许开发者在不到 10KB (Gzipped) 的运行时体积下，获得与大型库相当的功能体验。

### 3. 文档与 API 自动化
我们建立了从源代码类型定义直接生成文档 API 表格的机制，确保文档与实现永远同步，这在轻量级库中非常罕见。

## 适用场景

- **追求极小体积**：H5 营销页、轻量级后台、工具类应用。
- **需要高度定制视觉**：不想让自己的应用看起来像“典型的 AntD 网站”。
- **多框架共存**：在微前端架构或从旧框架迁移到新框架的过程中保持视觉一致。

---

## 组件覆盖率对比

虽然 SXO UI 目前还在快速迭代中，但我们已经覆盖了 90% 以上的高频业务组件：

- [x] **基础**：Button, Icon, Layout, Typography
- [x] **表单**：Input, Select, Checkbox, Radio, Switch, DatePicker, Cascader, Upload, Form (含校验), Transfer, TreeSelect, Mentions
- [x] **数据展示**：Table, Tree, Card, List, Calendar, Statistic, Descriptions, Tabs, Pagination, Steps, Accordion, Timeline
- [x] **反馈**：Dialog, Drawer, Toast, Alert, Popconfirm, Popover, Tooltip, Skeleton, Feedback (Loading)
- [x] **导航**：Menu, BackTop, Breadcrumb, Dropdown
- [x] **重型**：Admin Layout, CommandPalette, VirtualList
