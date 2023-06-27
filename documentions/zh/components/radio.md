# Radio 单选框

在一组备选项中进行单选。

## 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoRadioGroup v-model="value">
    <SxoRadio value="apple">Apple</SxoRadio>
    <SxoRadio value="banana">Banana</SxoRadio>
    <SxoRadio value="cherry">Cherry</SxoRadio>
  </SxoRadioGroup>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup as SxoRadioGroup, Radio as SxoRadio } from '@sxo/vue';
const value = ref('apple');
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { RadioGroup, Radio } from '@sxo/react';

export default () => {
  const [value, setValue] = useState('apple');
  return (
    <RadioGroup value={value} onChange={setValue}>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoRadioGroup v-model="value">
    <SxoRadio value="apple">Apple</SxoRadio>
    <SxoRadio value="banana">Banana</SxoRadio>
    <SxoRadio value="cherry">Cherry</SxoRadio>
  </SxoRadioGroup>
</template>

<script>
import { RadioGroup, Radio } from '@sxo/vue2';
export default {
  components: { SxoRadioGroup: RadioGroup, SxoRadio: Radio },
  data() {
    return { value: 'apple' };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 尺寸与颜色

支持 `sm`, `md`, `lg` 尺寸，以及 `primary`, `success` 颜色。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoRadioGroup v-model="v1" size="sm">
      <SxoRadio value="1">Small Size</SxoRadio>
    </SxoRadioGroup>
    <SxoRadioGroup v-model="v2" color="success">
      <SxoRadio value="2">Success Color</SxoRadio>
    </SxoRadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const v1 = ref('1');
const v2 = ref('2');
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { RadioGroup, Radio } from '@sxo/react';

export default () => (
  <div className="flex flex-col gap-4">
    <RadioGroup defaultValue="1" size="sm">
      <Radio value="1">Small Size</Radio>
    </RadioGroup>
    <RadioGroup defaultValue="2" color="success">
      <Radio value="2">Success Color</Radio>
    </RadioGroup>
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoRadioGroup v-model="v1" size="sm">
      <SxoRadio value="1">Small Size</SxoRadio>
    </SxoRadioGroup>
    <SxoRadioGroup v-model="v2" color="success">
      <SxoRadio value="2">Success Color</SxoRadio>
    </SxoRadioGroup>
  </div>
</template>

<script>
export default {
  data() {
    return { v1: '1', v2: '2' };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 绑定值 | `string` | `''` |
| name | 原生 name 属性 | `string` | 自动生成 |
| size | 统一设置尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| color | 统一设置颜色 | `'primary' \| 'success'` | `'primary'` |

### Radio Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选框的值 | `string` | - |
| size | 尺寸 (覆盖 Group 设置) | `'sm' \| 'md' \| 'lg'` | - |
| color | 颜色 (覆盖 Group 设置) | `'primary' \| 'success'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| label | 文本标签 (Vue2) | `string` | - |
