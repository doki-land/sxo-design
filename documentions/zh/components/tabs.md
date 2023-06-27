# Tabs 标签页

分隔内容上有关联但属于不同类别的标签页。

## 基础用法

基础的、简洁的标签页。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTabs v-model="activeName">
    <SxoTabList>
      <SxoTab value="first">用户管理</SxoTab>
      <SxoTab value="second">配置管理</SxoTab>
      <SxoTab value="third">角色管理</SxoTab>
    </SxoTabList>
    <SxoTabPanel value="first">用户管理内容</SxoTabPanel>
    <SxoTabPanel value="second">配置管理内容</SxoTabPanel>
    <SxoTabPanel value="third">角色管理内容</SxoTabPanel>
  </SxoTabs>
</template>

<script setup>
import { ref } from 'vue';
import { Tabs as SxoTabs, TabList as SxoTabList, Tab as SxoTab, TabPanel as SxoTabPanel } from '@sxo/vue';
const activeName = ref('first');
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState('first');

  return (
    <Tabs value={active} onChange={setActive}>
      <TabList>
        <Tab value="first">用户管理</Tab>
        <Tab value="second">配置管理</Tab>
        <Tab value="third">角色管理</Tab>
      </TabList>
      <TabPanel value="first">用户管理内容</TabPanel>
      <TabPanel value="second">配置管理内容</TabPanel>
      <TabPanel value="third">角色管理内容</TabPanel>
    </Tabs>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoTabs v-model="activeName">
    <SxoTabList>
      <SxoTab value="first">用户管理</SxoTab>
      <SxoTab value="second">配置管理</SxoTab>
      <SxoTab value="third">角色管理</SxoTab>
    </SxoTabList>
    <SxoTabPanel value="first">用户管理内容</SxoTabPanel>
    <SxoTabPanel value="second">配置管理内容</SxoTabPanel>
    <SxoTabPanel value="third">角色管理内容</SxoTabPanel>
  </SxoTabs>
</template>

<script>
import { Tabs, TabList, Tab, TabPanel } from '@sxo/vue2';
export default {
  components: { SxoTabs: Tabs, SxoTabList: TabList, SxoTab: Tab, SxoTabPanel: TabPanel },
  data() {
    return { activeName: 'first' };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 卡片样式

设置 `variant="pill"` 即可设置为卡片样式。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTabs v-model="activeName" variant="pill">
    <SxoTabList>
      <SxoTab value="first">用户管理</SxoTab>
      <SxoTab value="second">配置管理</SxoTab>
    </SxoTabList>
    <SxoTabPanel value="first">用户管理内容</SxoTabPanel>
    <SxoTabPanel value="second">配置管理内容</SxoTabPanel>
  </SxoTabs>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@sxo/react';

export default () => (
  <Tabs defaultValue="first" variant="pill">
    <TabList>
      <Tab value="first">用户管理</Tab>
      <Tab value="second">配置管理</Tab>
    </TabList>
    <TabPanel value="first">用户管理内容</TabPanel>
    <TabPanel value="second">配置管理内容</TabPanel>
  </Tabs>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoTabs v-model="activeName" variant="pill">
    <SxoTabList>
      <SxoTab value="first">用户管理</SxoTab>
      <SxoTab value="second">配置管理</SxoTab>
    </SxoTabList>
    <SxoTabPanel value="first">用户管理内容</SxoTabPanel>
    <SxoTabPanel value="second">配置管理内容</SxoTabPanel>
  </SxoTabs>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Tabs Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value / v-model | `string` | - | 绑定值，选中标签页的 value |
| defaultValue | `string` | - | 默认选中的标签页的 value |
| variant | `'line' \| 'pill'` | `'line'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### Tabs Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签页时触发 | `(value: string) => void` |

### Tab Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `string` | - | 标识符，对应 Tabs 的 value |

### TabPanel Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `string` | - | 标识符，对应 Tab 的 value |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | - | `String,` | `-` |
| defaultValue | - | `String,` | `-` |
| variant | - | `String` | `"line"` |
| size | - | `String` | `"md"` |
