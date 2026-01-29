# Cascader 级联选择

从一组相关联的数据集合中进行选择，例如省市区，公司层级，事物分类等。

## 何时使用

- 需要从多个层级的数据中选择。
- 相较于多个 Select，级联选择能更清晰地展示层级关系。

## 代码演示

<SxoPlayground component="cascader" />

## API


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中的值数组 | `Array` | `[]` |
| options | 选项数据 | `Array` | `[]` |
| placeholder | 占位提示语 | `String` | `"Please select"` |
| size | 尺寸 | `String` | `"md"` |
| rounded | 是否圆角 | `Boolean` | `true` |
