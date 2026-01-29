# Transfer 穿梭框

双栏穿梭选择框，用于直观地进行数据移动。

## 何时使用

- 需要在两个列表之间移动数据。
- 数据量较大，且需要清晰地展示已选和未选状态。

## 代码演示

<SxoDemo component="Transfer" />

## API


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中的 key 数组 | `Array` | `[]` |
| dataSource | 数据源 | `Array` | `[]` |
| titles | 左右面板标题 | `Array` | `["Source"` |
| size | 尺寸 | `String` | `"md"` |
| searchable | 是否可搜索 | `Boolean` | `false` |
