# 主题系统 (Theme System)

SXO 是一个**主题驱动**的设计系统。它的核心理念是“逻辑与样式分离，样式与主题分离”。这意味着你可以通过更换主题包，瞬间改变整个应用的视觉风格，而无需修改任何业务代码。

## 默认主题：SXO Design

SXO 默认内置了一套名为 **SXO Design** 的主题。

- **视觉风格**：极简、高端黑白、性冷淡风格。
- **适用场景**：个人博客、极简主义作品集、高端设计网站。
- **详情**：详见 [SXO Design 主题规范](./sxo-design.md)。

对于 C 端和 B 端项目，我们建议选用以下官方预置的主题包。

## 官方主题包

SXO 提供了丰富的官方主题包，我们将它们分为 **2C (面向消费者)** 和 **2B (面向企业/后台)** 两大类，以便您根据项目性质快速选择。

### 🌟 2C 推荐主题 (Consumer-Facing)

这些主题通常色彩更活泼、交互感更强，旨在提供更好的用户体验。

1. **Material Design 3 (`@sxo/theme-material`)**
   - **特点**：遵循 Google M3 规范，强调“人本设计”，色彩系统灵活且充满活力。
   - **适用**：**2C 应用的首选**。移动端 H5、社交应用、内容平台。
   - **详情**：详见 [Material Design 3 主题规范](./material.md)。

2. **Cupertino (`@sxo/theme-cupertino`)**
   - **特点**：极致的 Apple 风格，高质感的模糊效果和大圆角。
   - **适用**：追求精致感、果粉群体或希望营造“原生感”的 2C 应用。
   - **详情**：详见 [Cupertino 主题规范](./cupertino.md)。

3. **GitHub (`@sxo/theme-github`)**
   - **特点**：简洁、代码友好、极高的开发者认同感。
   - **适用**：开发者工具、技术社区、个人技术博客。
   - **详情**：详见 [GitHub 主题规范](./github.md)。

4. **GitHub Halloween (`@sxo/theme-halloween`)**
   - **特点**：万圣节限定，橙紫色系，充满节日氛围。
   - **适用**：节日活动页面、个性化展示。
   - **详情**：详见 [Halloween 主题规范](./halloween.md)。

5. **Fate/Intertwined Fate (`@sxo/theme-fate`)**
   - **特点**：二次元、游戏化视觉风格。
   - **适用**：游戏社区、同人站、个性化 2C 产品。
   - **详情**：详见 [Fate 主题规范](./fate.md)。

### 💼 2B 推荐主题 (Business/Enterprise)

这些主题更注重效率、信息密度和专业感，适合处理复杂业务逻辑。

1. **Ant Design (`@sxo/theme-antd`)**
   - **特点**：企业级设计的标杆，严谨、组件丰富、视觉层级分明。
   - **适用**：**B 端后台管理系统的标准选择**。
   - **详情**：详见 [Ant Design 主题规范](./antd.md)。

2. **Carbon (`@sxo/theme-carbon`)**
   - **特点**：IBM 的设计语言，冷色调、高对比度、极其强调操作效率。
   - **适用**：工业级仪表盘、数据分析平台、专业技术中台。
   - **详情**：详见 [Carbon 主题规范](./carbon.md)。

3. **Fluent (`@sxo/theme-fluent`)**
   - **特点**：微软风格，现代且通透，兼顾专业性与美感。
   - **适用**：办公协同软件、企业内部工具、SaaS 平台。
   - **详情**：详见 [Fluent 主题规范](./fluent.md)。

4. **微信 (`@sxo/theme-wechat`)**
   - **特点**：高认知度、稳重、简洁。
   - **适用**：企业微信应用、政务系统、金融/银行内部系统。
   - **详情**：详见 [微信主题规范](./wechat.md)。

### ⚡ 特色主题

- **PronHub (`@sxo/theme-pronhub`)**：极高对比度的黑黄配色，适用于极具辨识度的娱乐类或创意类产品。详见 [PronHub 主题规范](./pronhub.md)。

## 如何使用主题

在 Vue 项目中，你只需要在初始化 SXO 时传入主题令牌：

```typescript
import { createApp } from 'vue'
import { createSxo } from '@sxo/plugin-vue'
import { materialTheme } from '@sxo/theme-material'

const app = createApp(App)

app.use(createSxo({
  theme: materialTheme
}))

app.mount('#app')
```

在 React 项目中：

```tsx
import { SxoProvider } from '@sxo/react'
import { materialTheme } from '@sxo/theme-material'

function App() {
  return (
    <SxoProvider theme={materialTheme}>
      <YourApp />
    </SxoProvider>
  )
}
```

## 自定义主题

除了使用预置主题，你也可以基于 `defaultTokens` 创建自己的主题。详见 [设计令牌](./tokens) 章节。
