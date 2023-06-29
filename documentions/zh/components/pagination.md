# Pagination 分页

当有大量内容需要展现时，进行分页加载。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoPagination 
      :total="50" 
      v-model="currentPage" 
      @change="handleChange" 
    />

    <!-- 不同尺寸 -->
    <SxoPagination :total="100" size="sm" />
    <SxoPagination :total="100" size="md" />
    <SxoPagination :total="100" size="lg" />

    <!-- 不同变体 -->
    <SxoPagination :total="100" variant="outline" />
    <SxoPagination :total="100" variant="solid" />
    <SxoPagination :total="100" variant="ghost" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SxoPagination } from '@sxo/vue';

const currentPage = ref(1);
const handleChange = (page) => {
  console.log('Page changed to:', page);
};
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { Pagination } from '@sxo/react';

export default function PaginationDemo() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Pagination 
        total={50} 
        current={current} 
        onChange={(page) => setCurrent(page)} 
      />

      {/* 不同尺寸 */}
      <Pagination total={100} size="sm" />
      <Pagination total={100} size="md" />
      <Pagination total={100} size="lg" />

      {/* 不同变体 */}
      <Pagination total={100} variant="outline" />
      <Pagination total={100} variant="solid" />
      <Pagination total={100} variant="ghost" />
    </div>
  );
}
```

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoPagination 
      :total="50" 
      :current="current" 
      @change="current = $event" 
    />
  </div>
</template>

<script>
import { SxoPagination } from '@sxo/vue2';

export default {
  components: { SxoPagination },
  data() {
    return {
      current: 1
    };
  }
};
</script>
```

</SxoCodeBlock>

</SxoCodeGroup>

## Pagination 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| total | `number` | `0` | 数据总数 |
| pageSize | `number` | `10` | 每页条数 |
| current / v-model | `number` | `1` | 当前页码 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'outline' \| 'solid' \| 'ghost'` | `'outline'` | 变体 |
| rounded | `boolean` | `true` | 是否圆角 |

## Pagination 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码改变时的回调 | `(page: number) => void` |
| update:modelValue | (Vue3) v-model 更新 | `(page: number) => void` |
