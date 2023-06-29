# Search 搜索框

带有搜索图标的输入框，支持清除、回车搜索等功能。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoSearch 
      v-model="searchValue" 
      placeholder="Input search text" 
      @search="onSearch" 
    />

    <!-- 不同尺寸 -->
    <div class="flex items-center gap-4">
      <SxoSearch size="sm" placeholder="Small size" />
      <SxoSearch size="md" placeholder="Medium size" />
      <SxoSearch size="lg" placeholder="Large size" />
    </div>

    <!-- 不同变体 -->
    <div class="flex items-center gap-4">
      <SxoSearch variant="outline" placeholder="Outline variant" />
      <SxoSearch variant="solid" placeholder="Solid variant" />
      <SxoSearch variant="ghost" placeholder="Ghost variant" />
    </div>

    <!-- 加载中 -->
    <SxoSearch loading placeholder="Loading state" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SxoSearch } from '@sxo/vue';

const searchValue = ref('');
const onSearch = (val) => {
  console.log('Search:', val);
};
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { Search } from '@sxo/react';

export default function SearchDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Search 
        value={value} 
        onChange={setValue} 
        onSearch={(val) => console.log('Search:', val)} 
        placeholder="Input search text" 
      />

      {/* 不同尺寸 */}
      <div className="flex items-center gap-4">
        <Search size="sm" placeholder="Small size" />
        <Search size="md" placeholder="Medium size" />
        <Search size="lg" placeholder="Large size" />
      </div>

      {/* 不同变体 */}
      <div className="flex items-center gap-4">
        <Search variant="outline" placeholder="Outline variant" />
        <Search variant="solid" placeholder="Solid variant" />
        <Search variant="ghost" placeholder="Ghost variant" />
      </div>

      {/* 加载中 */}
      <Search loading placeholder="Loading state" />
    </div>
  );
}
```

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoSearch 
      :value="value" 
      @input="value = $event" 
      @search="onSearch" 
    />
  </div>
</template>

<script>
import { SxoSearch } from '@sxo/vue2';

export default {
  components: { SxoSearch },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    onSearch(val) {
      console.log('Vue2 Search:', val);
    }
  }
};
</script>
```

</SxoCodeBlock>

</SxoCodeGroup>

## Search 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value / v-model | `string` | `''` | 搜索内容 |
| placeholder | `string` | `'Search...'` | 占位文字 |
| variant | `'outline' \| 'solid' \| 'ghost'` | `'outline'` | 变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| rounded | `boolean` | `true` | 是否圆角 |
| loading | `boolean` | `false` | 是否加载中 |

## Search 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search / onSearch | 点击搜索或按下回车的回调 | `(value: string) => void` |
| clear / onClear | 点击清除按钮的回调 | `() => void` |
| update:modelValue | (Vue3) v-model 更新 | `(value: string) => void` |
| input | (Vue2) 输入事件 | `(value: string) => void` |
