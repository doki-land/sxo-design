# Rate 评分

评分组件。

## 基础用法

展示基础的评分效果。

```vue
<template>
  <SxoRate v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(3);
</script>
```

## 辅助文字

设置 `show-text` 属性可以展示辅助文字。

```vue
<template>
  <SxoRate v-model="value" show-text :texts="['极差', '失望', '一般', '满意', '惊喜']" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(4);
</script>
```

## 只读状态

设置 `disabled` 属性使组件只读。

```vue
<template>
  <SxoRate v-model="value" disabled />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(3.5);
</script>
```

## Rate 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前分值 | `number` | `0` |
| count | star 总数 | `number` | `5` |
| disabled | 是否只读 | `boolean` | `false` |
| showText | 是否显示辅助文字 | `boolean` | `false` |
| texts | 辅助文字数组 | `string[]` | `[]` |

## Rate 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 分值变化时触发 | `value: number` |
| change | 分值变化时触发 | `value: number` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | - | `Number` | `0` |
| count | - | `Number` | `5` |
| disabled | - | `Boolean` | `false` |
| showText | - | `Boolean` | `false` |
| texts | - | `Array as () => string[]` | `[]` |
