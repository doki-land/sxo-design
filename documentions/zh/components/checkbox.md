# Checkbox 复选框

复选框用于在多个选项中选择一个或多个。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoCheckbox v-model="checked">Checkbox</SxoCheckbox>

    <!-- 不同尺寸 -->
    <div class="flex gap-4 items-center">
      <SxoCheckbox size="sm">Small</SxoCheckbox>
      <SxoCheckbox size="md">Medium</SxoCheckbox>
      <SxoCheckbox size="lg">Large</SxoCheckbox>
    </div>

    <!-- 不同颜色 -->
    <div class="flex gap-4 items-center">
      <SxoCheckbox color="primary" default-checked>Primary</SxoCheckbox>
      <SxoCheckbox color="success" default-checked>Success</SxoCheckbox>
    </div>

    <!-- 禁用状态 -->
    <div class="flex gap-4 items-center">
      <SxoCheckbox disabled>Disabled</SxoCheckbox>
      <SxoCheckbox disabled default-checked>Disabled Checked</SxoCheckbox>
    </div>

    <!-- 复选框组 -->
    <SxoCheckboxGroup v-model="groupValue">
      <SxoCheckbox value="apple">Apple</SxoCheckbox>
      <SxoCheckbox value="banana">Banana</SxoCheckbox>
      <SxoCheckbox value="cherry">Cherry</SxoCheckbox>
    </SxoCheckboxGroup>
    <p>Selected: {{ groupValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SxoCheckbox, SxoCheckboxGroup } from '@sxo/vue';

const checked = ref(false);
const groupValue = ref(['apple']);
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@sxo/react';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [groupValue, setGroupValue] = useState(['apple']);

  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Checkbox checked={checked} onChange={setChecked}>Checkbox</Checkbox>

      {/* 不同尺寸 */}
      <div className="flex gap-4 items-center">
        <Checkbox size="sm">Small</Checkbox>
        <Checkbox size="md">Medium</Checkbox>
        <Checkbox size="lg">Large</Checkbox>
      </div>

      {/* 不同颜色 */}
      <div className="flex gap-4 items-center">
        <Checkbox color="primary" defaultChecked>Primary</Checkbox>
        <Checkbox color="success" defaultChecked>Success</Checkbox>
      </div>

      {/* 禁用状态 */}
      <div className="flex gap-4 items-center">
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox disabled defaultChecked>Disabled Checked</Checkbox>
      </div>

      {/* 复选框组 */}
      <CheckboxGroup value={groupValue} onChange={setGroupValue}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
        <Checkbox value="cherry">Cherry</Checkbox>
      </CheckboxGroup>
      <p>Selected: {groupValue.join(', ')}</p>
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoCheckbox v-model="checked">Checkbox</SxoCheckbox>

    <!-- 不同尺寸 -->
    <div class="flex gap-4 items-center">
      <SxoCheckbox size="sm">Small</SxoCheckbox>
      <SxoCheckbox size="md">Medium</SxoCheckbox>
      <SxoCheckbox size="lg">Large</SxoCheckbox>
    </div>

    <!-- 复选框组 -->
    <SxoCheckboxGroup v-model="groupValue">
      <SxoCheckbox value="apple">Apple</SxoCheckbox>
      <SxoCheckbox value="banana">Banana</SxoCheckbox>
      <SxoCheckbox value="cherry">Cherry</SxoCheckbox>
    </SxoCheckboxGroup>
  </div>
</template>

<script>
import { SxoCheckbox, SxoCheckboxGroup } from '@sxo/vue2';

export default {
  components: { SxoCheckbox, SxoCheckboxGroup },
  data() {
    return {
      checked: false,
      groupValue: ['apple']
    };
  }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Checkbox 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | 是否选中（Vue2 v-model / React 受控） |
| modelValue | `boolean` | `false` | 是否选中（Vue3 v-model） |
| value | `any` | - | 在 CheckboxGroup 中使用的值 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| color | `'primary' \| 'success'` | `'primary'` | 颜色 |
| disabled | `boolean` | `false` | 是否禁用 |

## CheckboxGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value / modelValue | `any[]` | `[]` | 选中的值数组 (v-model) |
| direction | `'row' \| 'col'` | `'col'` | 排列方向 |
| gap | `string \| number` | `2` | 间距 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 子组件默认尺寸 |
| color | `'primary' \| 'success'` | `'primary'` | 子组件默认颜色 |
