# Switch 开关

开关用于在两种状态之间切换。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoSwitch v-model="checked" />

    <!-- 不同尺寸 -->
    <div class="flex gap-4 items-center">
      <SxoSwitch size="sm" />
      <SxoSwitch size="md" />
      <SxoSwitch size="lg" />
    </div>

    <!-- 不同颜色 -->
    <div class="flex gap-4 items-center">
      <SxoSwitch color="primary" :model-value="true" />
      <SxoSwitch color="success" :model-value="true" />
    </div>

    <!-- 禁用状态 -->
    <div class="flex gap-4 items-center">
      <SxoSwitch disabled />
      <SxoSwitch disabled :model-value="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SxoSwitch } from '@sxo/vue';

const checked = ref(false);
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { useState } from 'react';
import { Switch } from '@sxo/react';

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Switch checked={checked} onChange={setChecked} />

      {/* 不同尺寸 */}
      <div className="flex gap-4 items-center">
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
      </div>

      {/* 不同颜色 */}
      <div className="flex gap-4 items-center">
        <Switch color="primary" defaultChecked />
        <Switch color="success" defaultChecked />
      </div>

      {/* 禁用状态 */}
      <div className="flex gap-4 items-center">
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>
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
    <SxoSwitch v-model="checked" />

    <!-- 不同尺寸 -->
    <div class="flex gap-4 items-center">
      <SxoSwitch size="sm" />
      <SxoSwitch size="md" />
      <SxoSwitch size="lg" />
    </div>
  </div>
</template>

<script>
import { SxoSwitch } from '@sxo/vue2';

export default {
  components: { SxoSwitch },
  data() {
    return {
      checked: false
    };
  }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | 是否选中（React 受控） |
| value | `boolean` | `false` | 是否选中（Vue2 v-model） |
| modelValue | `boolean` | `false` | 是否选中（Vue3 v-model） |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| color | `'primary' \| 'success'` | `'primary'` | 颜色 |
| disabled | `boolean` | `false` | 是否禁用 |
| onChange | `(checked: boolean) => void` | - | 状态改变时的回调 |
