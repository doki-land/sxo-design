# Admin 重型组件

`@sxo/component-admin` 提供了一系列用于构建中后台管理系统的重型组件。这些组件通常集成了复杂的布局和业务逻辑。

## StatCard 统计卡片

用于展示关键指标（KPI）。

### 基础用法

```vue
<SxoStatCard 
  title="总收入" 
  value="$45,231.89" 
  trend="+20.1% 较上月" 
  trend-direction="up" 
/>
```

### 变体与颜色

支持 `simple` (无背景)、`bordered` (描边，默认) 和 `solid` (实色填充)。

```vue
<SxoStatCard 
  title="活跃用户" 
  value="2,350" 
  variant="solid" 
  color="success" 
/>
```

## DescriptionList 描述列表

用于展示成组的只读信息。

```vue
<SxoDescriptionList 
  title="订单详情" 
  :items="[
    { label: '订单号', content: 'ORD-001' },
    { label: '状态', content: '已发货' }
  ]"
>
  <template #action>
    <SxoButton size="sm">编辑</SxoButton>
  </template>
</SxoDescriptionList>
```

## Kanban 看板

用于任务管理和流程追踪。

```vue
<SxoKanban :columns="kanbanData" />
```

## AdminShell 页面外壳

超级重型组件，集成了 Sidebar、Header 和 Main Content 区域。

### 基础用法

```vue
<SxoAdminShell logo="SXO Admin" :menu-items="menuItems">
  <template #headerActions>
    <SxoButton size="sm">用户中心</SxoButton>
  </template>
  
  <div class="content">
    <!-- 页面主体内容 -->
  </div>
</SxoAdminShell>
```

## LoginScreen 登录页

超级重型组件，提供完整的登录布局。

### 变体

- `centered`: 居中卡片布局（默认）。
- `split`: 左右分割布局（左侧为视觉区域，右侧为表单）。

```vue
<SxoLoginScreen variant="split">
  <template #visual>
    <div class="welcome-bg">欢迎使用 SXO</div>
  </template>
  
  <SxoForm>
    <!-- 登录表单 -->
  </SxoForm>
</SxoLoginScreen>
```

## 属性

### AdminShell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logo | 系统 Logo 文本 | `string` | `'SXO Admin'` |
| menuItems | 侧边栏菜单项 | `Array<{ id, label, icon, active }>` | `[]` |

### LoginScreen Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `'Welcome Back'` |
| subtitle | 副标题 | `string` | - |
| variant | 布局模式 | `'centered' \| 'split'` | `'centered'` |

## PageHeader 页头

展示页面的核心信息，支持面包屑、标题、副标题和额外操作。

```vue
<SxoPageHeader 
  title="用户管理" 
  subtitle="管理系统中的所有用户信息"
  :breadcrumb="[{ label: '首页' }, { label: '系统管理' }]"
>
  <template #extra>
    <SxoButton variant="primary">新增用户</SxoButton>
  </template>
</SxoPageHeader>
```

## Result 结果页

用于展示操作的结果，如成功、失败、404 等。

```vue
<SxoResult 
  status="success" 
  title="提交成功" 
  subtitle="您的申请已提交，请耐心等待审核。"
>
  <template #extra>
    <SxoButton variant="primary">返回列表</SxoButton>
    <SxoButton variant="outline">再次提交</SxoButton>
  </template>
</SxoResult>
```

## QueryFilter 查询筛选器

提供复杂的查询表单布局，通常位于表格上方。

```vue
<SxoQueryFilter @search="onSearch" @reset="onReset">
  <SxoFormItem label="用户名">
    <SxoInput v-model="query.name" />
  </SxoFormItem>
  <SxoFormItem label="状态">
    <SxoSelect v-model="query.status">
      <!-- options -->
    </SxoSelect>
  </SxoFormItem>
</SxoQueryFilter>
```

## StepForm 分步表单

用于引导用户完成复杂的表单操作。

```vue
<SxoStepForm 
  v-model:current="currentStep"
  :steps="[
    { title: '填写基本信息' },
    { title: '确认订单' },
    { title: '完成支付' }
  ]"
>
  <div v-if="currentStep === 0">第一步内容...</div>
  <div v-if="currentStep === 1">第二步内容...</div>
  <div v-if="currentStep === 2">第三步内容...</div>
</SxoStepForm>
```

### 数据结构

```typescript
interface KanbanColumn {
  id: string;
  title: string;
  items: Array<{
    id: string;
    title: string;
    description?: string;
    tags?: string[];
  }>;
}
```

## 属性

### StatCard Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| value | 数值 | `string \| number` | - |
| trend | 趋势文本 | `string` | - |
| trendDirection | 趋势方向 | `'up' \| 'down'` | `'up'` |
| variant | 样式变体 | `'simple' \| 'bordered' \| 'solid'` | `'bordered'` |
| color | 主题颜色 | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` |

### DescriptionList Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | - |
| items | 数据项列表 | `{ label: string, content: any }[]` | `[]` |

### Kanban Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数据 | `KanbanColumn[]` | `[]` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | - | `String` | `-` |
| value | - | `[String` | `-` |
| trend | - | `String,` | `-` |
| trendDirection | - | `String` | `"up"` |
| variant | - | `String` | `"bordered"` |
| color | - | `String` | `"primary"` |
