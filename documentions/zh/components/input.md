# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

<SxoDemo component="Input" :props="{ placeholder: 'Basic input' }" />

## 变体与尺寸

支持 `outline`, `bottom-line`, `ghost` 变体，以及 `sm`, `md`, `lg` 尺寸。

<SxoDemo component="Input" :props="{ variant: 'bottom-line', placeholder: 'Bottom line variant' }" />
<SxoDemo component="Input" :props="{ variant: 'ghost', placeholder: 'Ghost variant' }" />
<SxoDemo component="Input" :props="{ size: 'sm', placeholder: 'Small size' }" />
<SxoDemo component="Input" :props="{ size: 'lg', placeholder: 'Large size' }" />

## 状态

使用 `invalid` 属性表示输入无效。

<SxoDemo component="Input" :props="{ invalid: true, placeholder: 'Invalid state' }" />

## API

<SxoApiTable component="Input" />
