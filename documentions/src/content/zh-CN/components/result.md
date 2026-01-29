# Result 结果

用于反馈任务的处理结果。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-8">
    <!-- 成功 -->
    <SxoResult
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <SxoButton variant="solid" color="primary">Go Console</SxoButton>
        <SxoButton>Buy Again</SxoButton>
      </template>
    </SxoResult>

    <!-- 信息 -->
    <SxoResult
      title="Your operation has been executed"
    >
      <template #extra>
        <SxoButton variant="solid" color="primary">Go Console</SxoButton>
      </template>
    </SxoResult>

    <!-- 404 -->
    <SxoResult
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <SxoButton variant="solid" color="primary">Back Home</SxoButton>
      </template>
    </SxoResult>
  </div>
</template>

<script setup>
import { SxoResult, SxoButton } from '@sxo/vue';
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { Result, Button } from '@sxo/react';

export default function ResultDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* 成功 */}
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button variant="solid" color="primary" key="console">Go Console</Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />

      {/* 404 */}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button variant="solid" color="primary">Back Home</Button>}
      />
    </div>
  );
}
```

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-8">
    <SxoResult
      status="warning"
      title="There are some problems with your operation."
    >
      <template slot="extra">
        <SxoButton variant="solid" color="primary">Go Console</SxoButton>
      </template>
    </SxoResult>
  </div>
</template>

<script>
import { SxoResult, SxoButton } from '@sxo/vue2';

export default {
  components: { SxoResult, SxoButton }
};
</script>
```

</SxoCodeBlock>

</SxoCodeGroup>

## Result 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| status | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '405' \| '500'` | `'info'` | 结果状态 |
| title | `string \| slot \| ReactNode` | - | 标题 |
| subTitle | `string \| slot \| ReactNode` | - | 副标题 |
| extra | `slot \| ReactNode` | - | 操作区 |
| icon | `slot \| ReactNode` | - | 自定义图标 |
