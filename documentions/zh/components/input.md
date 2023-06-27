# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoInput v-model="value" placeholder="Basic input" />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Input as SxoInput } from '@sxo/vue';
const value = ref('');
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { Input } from '@sxo/react';

export default () => {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <Input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder="Basic input" 
      />
      <p>Value: {value}</p>
    </div>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoInput v-model="value" placeholder="Basic input" />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
import { Input } from '@sxo/vue2';
export default {
  components: { SxoInput: Input },
  data() {
    return { value: '' };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 变体与尺寸

支持 `outline`, `bottom-line`, `ghost` 变体，以及 `sm`, `md`, `lg` 尺寸。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoInput variant="bottom-line" placeholder="Bottom line variant" />
    <SxoInput variant="ghost" placeholder="Ghost variant" />
    <SxoInput size="sm" placeholder="Small size" />
    <SxoInput size="lg" placeholder="Large size" />
  </div>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Input } from '@sxo/react';

export default () => (
  <div className="flex flex-col gap-4">
    <Input variant="bottom-line" placeholder="Bottom line variant" />
    <Input variant="ghost" placeholder="Ghost variant" />
    <Input size="sm" placeholder="Small size" />
    <Input size="lg" placeholder="Large size" />
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoInput variant="bottom-line" placeholder="Bottom line variant" />
    <SxoInput variant="ghost" placeholder="Ghost variant" />
    <SxoInput size="sm" placeholder="Small size" />
    <SxoInput size="lg" placeholder="Large size" />
  </div>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 状态

使用 `invalid` 属性表示输入无效。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoInput invalid placeholder="Invalid state" />
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Input } from '@sxo/react';

export default () => (
  <Input invalid placeholder="Invalid state" />
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoInput invalid placeholder="Invalid state" />
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 绑定值 | `string \| number` | `''` |
| variant | 变体 | `'outline' \| 'bottom-line' \| 'ghost'` | `'outline'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| invalid | 是否处于无效状态 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
