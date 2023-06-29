# Slider 滑块

通过拖动滑块在一个固定区间内进行选择。

## 基础用法

最基础的用法。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoSlider v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
import { Slider as SxoSlider } from '@sxo/vue';
const value = ref(30);
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Slider } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(30);
  return <Slider value={value} onChange={setValue} />;
};
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoSlider v-model="value" />
</template>

<script>
import { Slider } from '@sxo/vue2';
export default {
  components: { SxoSlider: Slider },
  data() {
    return { value: 30 };
  }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 离散值

可以通过 `step` 属性设置步长。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoSlider v-model="value" :step="10" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(50);
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Slider } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(50);
  return <Slider value={value} onChange={setValue} step={10} />;
};
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoSlider v-model="value" :step="10" />
</template>

<script>
import { Slider } from '@sxo/vue2';
export default {
  components: { SxoSlider: Slider },
  data() {
    return { value: 50 };
  }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 禁用状态

设置 `disabled` 属性使滑块不可用。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoSlider v-model="value" disabled />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(40);
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Slider } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(40);
  return <Slider value={value} onChange={setValue} disabled />;
};
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoSlider v-model="value" disabled />
</template>

<script>
import { Slider } from '@sxo/vue2';
export default {
  components: { SxoSlider: Slider },
  data() {
    return { value: 40 };
  }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## Slider 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |

## Slider 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发（v-model） | `value: number` |
| change | 值变化时触发 | `value: number` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | - | `Number` | `0` |
| min | - | `Number` | `0` |
| max | - | `Number` | `100` |
| step | - | `Number` | `1` |
| disabled | - | `Boolean` | `false` |
