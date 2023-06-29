# Button 按钮

基础的交互按钮。

## 基础用法

最基础的按钮用法。

<SxoDemo component="Button" :props="{ variant: 'primary' }" content="Primary" />
<SxoDemo component="Button" :props="{ variant: 'secondary' }" content="Secondary" />
<SxoDemo component="Button" :props="{ variant: 'outline' }" content="Outline" />

## 尺寸

通过 `size` 属性设置按钮大小。

<SxoDemo component="Button" :props="{ size: 'sm' }" content="Small" />
<SxoDemo component="Button" :props="{ size: 'md' }" content="Medium" />
<SxoDemo component="Button" :props="{ size: 'lg' }" content="Large" />

## 禁用状态

通过 `disabled` 属性禁用按钮。

<SxoDemo component="Button" :props="{ disabled: true }" content="Disabled Button" />

## API

<SxoApiTable component="Button" />
