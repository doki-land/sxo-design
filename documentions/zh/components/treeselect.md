# TreeSelect 树选择

树形选择控件，结合了树形控件和选择器的功能。

## 何时使用

- 需要从树形结构中选择一个节点。
- 展示层级数据且支持搜索。

## 代码演示

<SxoPlayground component="treeselect" />

## API


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中的 key | `[String` | `-` |
| options | 树节点数据 | `Array` | `[]` |
| placeholder | 占位提示语 | `String` | `"Please select"` |
| size | 尺寸 | `String` | `"md"` |
| rounded | 是否圆角 | `Boolean` | `true` |
| searchable | 是否可搜索 | `Boolean` | `false` |
