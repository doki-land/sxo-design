# Accordion 手风琴

可折叠的内容面板。

## 基础用法

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoAccordion variant="bordered">
    <SxoAccordionItem value="1" title="标题 1">
      这是面板 1 的内容。
    </SxoAccordionItem>
    <SxoAccordionItem value="2" title="标题 2">
      这是面板 2 的内容。
    </SxoAccordionItem>
  </SxoAccordion>
</template>

<script setup>
import { Accordion as SxoAccordion, AccordionItem as SxoAccordionItem } from '@sxo/vue';
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Accordion, AccordionItem } from '@sxo/react';

export default () => (
  <Accordion variant="bordered">
    <AccordionItem value="1" title="标题 1">
      这是面板 1 的内容。
    </AccordionItem>
    <AccordionItem value="2" title="标题 2">
      这是面板 2 的内容。
    </AccordionItem>
  </Accordion>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoAccordion variant="bordered">
    <SxoAccordionItem value="1" title="标题 1">
      这是面板 1 的内容。
    </SxoAccordionItem>
    <SxoAccordionItem value="2" title="标题 2">
      这是面板 2 的内容。
    </SxoAccordionItem>
  </SxoAccordion>
</template>

<script>
import { Accordion, AccordionItem } from '@sxo/vue2';
export default {
  components: { SxoAccordion: Accordion, SxoAccordionItem: AccordionItem }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 变体

支持 `ghost`, `bordered`, `splitted` 三种变体。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAccordion variant="ghost">
      <SxoAccordionItem value="1" title="Ghost 变体">内容</SxoAccordionItem>
    </SxoAccordion>
    
    <SxoAccordion variant="bordered">
      <SxoAccordionItem value="1" title="Bordered 变体">内容</SxoAccordionItem>
    </SxoAccordion>
    
    <SxoAccordion variant="splitted">
      <SxoAccordionItem value="1" title="Splitted 变体">内容</SxoAccordionItem>
    </SxoAccordion>
  </div>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Accordion, AccordionItem } from '@sxo/react';

export default () => (
  <div className="flex flex-col gap-4">
    <Accordion variant="ghost">
      <AccordionItem value="1" title="Ghost 变体">内容</AccordionItem>
    </Accordion>
    
    <Accordion variant="bordered">
      <AccordionItem value="1" title="Bordered 变体">内容</AccordionItem>
    </Accordion>
    
    <Accordion variant="splitted">
      <AccordionItem value="1" title="Splitted 变体">内容</AccordionItem>
    </Accordion>
  </div>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoAccordion variant="ghost">
      <SxoAccordionItem value="1" title="Ghost 变体">内容</SxoAccordionItem>
    </SxoAccordion>
    
    <SxoAccordion variant="bordered">
      <SxoAccordionItem value="1" title="Bordered 变体">内容</SxoAccordionItem>
    </SxoAccordion>
    
    <SxoAccordion variant="splitted">
      <SxoAccordionItem value="1" title="Splitted 变体">内容</SxoAccordionItem>
    </SxoAccordion>
  </div>
</template>
```


</SxoCodeBlock>

</SxoCodeGroup>

## API

### Accordion 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 变体样式 | `'ghost' \| 'bordered' \| 'splitted'` | `'bordered'` |
| allowMultiple | 是否允许同时展开多个 | `boolean` | `false` |
| modelValue / value | 展开项的值 (Vue 支持 v-model) | `string[]` | `[]` |

### AccordionItem 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 面板的唯一标识符 | `string` | - |
| title | 面板标题 | `string` | - |
