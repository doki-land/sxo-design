# Form 表单

用于收集、验证和提交数据的容器组件。

## 使用方法

### 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<script setup>
import { Form, FormItem, Input, Button } from '@sxo/vue';
import { ref } from 'vue';

const initialValues = {
  username: '',
  email: ''
};

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少 3 个字符' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^\S+@\S+\.\S+$/, message: '邮箱格式不正确' }
  ]
};

const handleSubmit = (values) => {
  console.log('提交成功:', values);
};
</script>

<template>
  <Form :initialValues="initialValues" :rules="rules" @submit="handleSubmit">
    <FormItem name="username" label="用户名">
      <Input placeholder="请输入用户名" />
    </FormItem>
    
    <FormItem name="email" label="邮箱">
      <Input placeholder="请输入邮箱" />
    </FormItem>
    
    <Button type="submit">提交</Button>
  </Form>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Form, FormItem, Input, Button } from '@sxo/react';

const initialValues = {
  username: '',
  email: ''
};

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少 3 个字符' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^\S+@\S+\.\S+$/, message: '邮箱格式不正确' }
  ]
};

export default () => {
  const handleSubmit = (values: any) => {
    console.log('提交成功:', values);
  };

  return (
    <Form initialValues={initialValues} rules={rules} onSubmit={handleSubmit}>
      <FormItem name="username" label="用户名">
        <Input placeholder="请输入用户名" />
      </FormItem>
      
      <FormItem name="email" label="邮箱">
        <Input placeholder="请输入邮箱" />
      </FormItem>
      
      <Button type="submit">提交</Button>
    </Form>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoForm :initialValues="initialValues" :rules="rules" @submit="handleSubmit">
    <SxoFormItem name="username" label="用户名">
      <SxoInput placeholder="请输入用户名" />
    </SxoFormItem>
    
    <SxoFormItem name="email" label="邮箱">
      <SxoInput placeholder="请输入邮箱" />
    </SxoFormItem>
    
    <SxoButton type="submit">提交</SxoButton>
  </SxoForm>
</template>

<script>
import { Form, FormItem, Input, Button } from '@sxo/vue2';

export default {
  components: { SxoForm: Form, SxoFormItem: FormItem, SxoInput: Input, SxoButton: Button },
  data() {
    return {
      initialValues: { username: '', email: '' },
      rules: {
        username: [{ required: true, message: '必填' }],
        email: [{ required: true, message: '必填' }]
      }
    };
  },
  methods: {
    handleSubmit(values) {
      console.log(values);
    }
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 属性

### Form

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| initialValues | `Record<string, any>` | - | 表单初始值 |
| rules | `Record<string, ValidationRule[]>` | `{}` | 验证规则 |

### FormItem

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | `string` | - | 绑定的字段名 |
| label | `string` | - | 标签文本 |

### ValidationRule

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| required | `boolean` | 是否必填 |
| min | `number` | 最小长度 |
| max | `number` | 最大长度 |
| pattern | `RegExp` | 正则匹配 |
| message | `string` | 错误提示消息 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 初始表单值 | `Object as PropType<Record<string` | `-` |
| rules | 校验规则 | `Object as PropType<Record<string` | `({` |
| layout | 布局方式 | `String` | `"vertical"` |
