# Timeline 时间轴

垂直展示的时间流信息。

## 基础用法

最基础的用法。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem title="创建项目" description="2024-01-01 10:00:00" />
    <SxoTimelineItem title="通过审核" description="2024-01-02 14:00:00" />
    <SxoTimelineItem title="发布成功" description="2024-01-03 09:00:00" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Timeline, TimelineItem } from "@sxo/react";

export default () => (
  <Timeline>
    <TimelineItem title="创建项目" description="2024-01-01 10:00:00" />
    <TimelineItem title="通过审核" description="2024-01-02 14:00:00" />
    <TimelineItem title="发布成功" description="2024-01-03 09:00:00" />
  </Timeline>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem title="创建项目" description="2024-01-01 10:00:00" />
    <SxoTimelineItem title="通过审核" description="2024-01-02 14:00:00" />
    <SxoTimelineItem title="发布成功" description="2024-01-03 09:00:00" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 带标签的时间轴

通过 `label` 属性展示额外的时间或分类信息。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem label="2024-01-01" title="初始提交" />
    <SxoTimelineItem label="2024-01-05" title="版本更新" description="修复了一些已知问题" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Timeline, TimelineItem } from "@sxo/react";

export default () => (
  <Timeline>
    <TimelineItem label="2024-01-01" title="初始提交" />
    <TimelineItem label="2024-01-05" title="版本更新" description="修复了一些已知问题" />
  </Timeline>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem label="2024-01-01" title="初始提交" />
    <SxoTimelineItem label="2024-01-05" title="版本更新" description="修复了一些已知问题" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 自定义节点颜色

通过 `color` 属性自定义圆点颜色。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem color="#10b981" title="完成" />
    <SxoTimelineItem color="#f59e0b" title="处理中" />
    <SxoTimelineItem color="#ef4444" title="报错" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Timeline, TimelineItem } from "@sxo/react";

export default () => (
  <Timeline>
    <TimelineItem color="#10b981" title="完成" />
    <TimelineItem color="#f59e0b" title="处理中" />
    <TimelineItem color="#ef4444" title="报错" />
  </Timeline>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoTimeline>
    <SxoTimelineItem color="#10b981" title="完成" />
    <SxoTimelineItem color="#f59e0b" title="处理中" />
    <SxoTimelineItem color="#ef4444" title="报错" />
  </SxoTimeline>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Timeline 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 展现模式 | `'left' \| 'alternate' \| 'right'` | `'left'` |

### TimelineItem 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| title | 标题 | `string` | - |
| description | 描述内容 | `string` | - |
| color | 节点颜色 | `string` | - |

### TimelineItem 插槽 (Vue)

| 名称 | 说明 |
| --- | --- |
| default | 描述内容 |
| title | 标题内容 |
| label | 标签内容 |
