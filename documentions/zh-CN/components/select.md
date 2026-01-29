# Select 选择器

选择器用于在多个选项中选择一个。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4 w-64">
    <!-- 基础用法 -->
    <SxoSelect v-model="value" placeholder="Pick an option">
      <SxoSelectOption value="apple">Apple</SxoSelectOption>
      <SxoSelectOption value="banana">Banana</SxoSelectOption>
      <SxoSelectOption value="cherry">Cherry</SxoSelectOption>
    </SxoSelect>

    <!-- 数据驱动 -->
    <SxoSelect 
      v-model="value2" 
      :options="options" 
      placeholder="Data driven select"
    />

    <!-- 不同尺寸 -->
    <div class="flex flex-col gap-2">
      <SxoSelect size="sm" v-model="value3" :options="options" />
      <SxoSelect size="md" v-model="value4" :options="options" />
      <SxoSelect size="lg" v-model="value5" :options="options" />
    </div>

    <!-- 禁用状态 -->
    <SxoSelect disabled placeholder="Disabled select" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SxoSelect, SxoSelectOption } from '@sxo/vue';

const value = ref('');
const value2 = ref('apple');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { Select, SelectOption } from '@sxo/react';

export default function SelectDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-4 w-64">
      {/* 基础用法 */}
      <Select value={value} onChange={setValue} placeholder="Pick an option">
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="cherry">Cherry</SelectOption>
      </Select>

      {/* 不同尺寸 */}
      <div className="flex flex-col gap-2">
        <Select size="sm" placeholder="Small size">
          <SelectOption value="1">Option 1</SelectOption>
        </Select>
        <Select size="md" placeholder="Medium size">
          <SelectOption value="1">Option 1</SelectOption>
        </Select>
        <Select size="lg" placeholder="Large size">
          <SelectOption value="1">Option 1</SelectOption>
        </Select>
      </div>

      {/* 禁用状态 */}
      <Select disabled placeholder="Disabled select">
        <SelectOption value="1">Option 1</SelectOption>
      </Select>
    </div>
  );
}
```

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4 w-64">
    <!-- 基础用法 -->
    <SxoSelect v-model="value" placeholder="Pick an option">
      <SxoSelectOption value="apple">Apple</SxoSelectOption>
      <SxoSelectOption value="banana">Banana</SxoSelectOption>
      <SxoSelectOption value="cherry">Cherry</SxoSelectOption>
    </SxoSelect>

    <!-- 不同尺寸 -->
    <div class="flex flex-col gap-2">
      <SxoSelect size="sm" placeholder="Small" />
      <SxoSelect size="md" placeholder="Medium" />
      <SxoSelect size="lg" placeholder="Large" />
    </div>
  </div>
</template>

<script>
import { SxoSelect, SxoSelectOption } from '@sxo/vue2';

export default {
  components: { SxoSelect, SxoSelectOption },
  data() {
    return {
      value: ''
    };
  }
};
</script>
```

</SxoCodeBlock>

</SxoCodeGroup>

## Select 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value / modelValue | `string` | `''` | 选中的值 (v-model) |
| placeholder | `string` | `'Select an option'` | 占位提示语 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| options | `Array<{label, value, disabled}>` | `[]` | 选项列表 (仅 Vue3 支持数据驱动模式) |
| virtual | `boolean` | `false` | 是否开启虚拟滚动 (仅 Vue3 支持) |

## SelectOption 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `string` | - | 选项的值 (必填) |
| disabled | `boolean` | `false` | 是否禁用该选项 |
