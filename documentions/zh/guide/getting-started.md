# 快速开始

SXO 是一个模块化的设计系统，你可以根据需要选择不同的包。

## 安装

使用 pnpm 安装核心包和适配器：

```bash
pnpm add @sxo/engine @sxo/design vue-sxo
```

## 快速上手

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```typescript
import { createApp } from 'vue'
import { createSxo } from 'vue-sxo'
import App from './App.vue'

const app = createApp(App)
app.use(createSxo())
app.mount('#app')
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

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

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```typescript
import Vue from 'vue'
import { SxoPlugin } from 'vue2-sxo'
import App from './App.vue'

Vue.use(SxoPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

</SxoCodeBlock>
</SxoCodeGroup>
