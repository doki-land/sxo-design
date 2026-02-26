# Mentions 提及

用于在文本框中提及（艾特）特定用户或内容。

## 何时使用

- 需要在输入过程中通过特定前缀触发联想选择。
- 常见的场景如评论区艾特用户。

## 代码演示

<SxoDemo component="Mentions" />

## API


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 输入框内容 | `String` | `""` |
| options | 选项列表 | `Array` | `[]` |
| prefix | 触发前缀 | `[String` | `"@"` |
| placeholder | 占位提示语 | `String` | `""` |
| size | 尺寸 | `String` | `"md"` |
| status | 状态 | `String` | `-` |
