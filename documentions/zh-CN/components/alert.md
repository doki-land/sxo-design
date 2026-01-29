# Alert 警告提示

展现需要关注的信息。

## 基础用法

<SxoDemo component="Alert" :props="{ title: 'Info Alert', description: 'This is an info alert.' }" />
<SxoDemo component="Alert" :props="{ type: 'success', title: 'Success Alert', description: 'Operation completed successfully.' }" />
<SxoDemo component="Alert" :props="{ type: 'warning', title: 'Warning Alert', description: 'Please be careful.' }" />
<SxoDemo component="Alert" :props="{ type: 'error', title: 'Error Alert', description: 'Something went wrong.' }" />

## 变体

支持 `subtle`, `solid`, `outline` 变体。

<SxoDemo component="Alert" :props="{ variant: 'solid', type: 'success', title: 'Solid Variant' }" />
<SxoDemo component="Alert" :props="{ variant: 'outline', type: 'warning', title: 'Outline Variant' }" />

## 可关闭

<SxoDemo component="Alert" :props="{ closable: true, title: 'Closable Alert' }" />

## API

<SxoApiTable component="Alert" />
