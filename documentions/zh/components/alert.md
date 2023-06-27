# Alert 警告提示

展现需要关注的信息。

## 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAlert title="Info Alert" description="This is an info alert." />
    <SxoAlert type="success" title="Success Alert" description="Operation completed successfully." />
    <SxoAlert type="warning" title="Warning Alert" description="Please be careful." />
    <SxoAlert type="error" title="Error Alert" description="Something went wrong." />
  </div>
</template>

<script setup>
import { Alert as SxoAlert } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Alert } from '@sxo/react';

export default () => (
  <div className="flex flex-col gap-4">
    <Alert title="Info Alert" description="This is an info alert." />
    <Alert type="success" title="Success Alert" description="Operation completed successfully." />
    <Alert type="warning" title="Warning Alert" description="Please be careful." />
    <Alert type="error" title="Error Alert" description="Something went wrong." />
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAlert title="Info Alert" description="This is an info alert." />
    <SxoAlert type="success" title="Success Alert" description="Operation completed successfully." />
    <SxoAlert type="warning" title="Warning Alert" description="Please be careful." />
    <SxoAlert type="error" title="Error Alert" description="Something went wrong." />
  </div>
</template>

<script>
import { Alert } from '@sxo/vue2';
export default {
  components: { SxoAlert: Alert }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 变体

支持 `subtle`, `solid`, `left-accent` 变体。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAlert variant="solid" type="success" title="Solid Variant" />
    <SxoAlert variant="left-accent" type="warning" title="Left Accent Variant" />
  </div>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Alert } from '@sxo/react';

export default () => (
  <div className="flex flex-col gap-4">
    <Alert variant="solid" type="success" title="Solid Variant" />
    <Alert variant="left-accent" type="warning" title="Left Accent Variant" />
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAlert variant="solid" type="success" title="Solid Variant" />
    <SxoAlert variant="left-accent" type="warning" title="Left Accent Variant" />
  </div>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 可关闭

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoAlert closable title="Closable Alert" @close="onClose" />
</template>

<script setup>
const onClose = () => console.log('Alert closed');
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Alert } from '@sxo/react';

export default () => (
  <Alert closable title="Closable Alert" onClose={() => console.log('Alert closed')} />
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoAlert closable title="Closable Alert" @close="onClose" />
</template>

<script>
export default {
  methods: {
    onClose() {
      console.log('Alert closed');
    }
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| variant | 变体 | `'subtle' \| 'solid' \| 'left-accent'` | `'subtle'` |
| title | 标题 | `string` | - |
| description | 描述内容 | `string` | - |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `true` |

### Events / Callbacks

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| close / onClose | 点击关闭按钮时触发 | `(e: Event) => void` |
