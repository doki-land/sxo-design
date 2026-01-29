# Tag 标签

用于标记和分类。

## 基础用法

<SxoDemo component="Tag" content="Default" />
<SxoDemo component="Tag" :props="{ color: 'primary' }" content="Primary" />
<SxoDemo component="Tag" :props="{ color: 'success' }" content="Success" />
<SxoDemo component="Tag" :props="{ color: 'warning' }" content="Warning" />
<SxoDemo component="Tag" :props="{ color: 'error' }" content="Error" />

## 不同变体

<SxoDemo component="Tag" :props="{ variant: 'solid', color: 'primary' }" content="Solid" />
<SxoDemo component="Tag" :props="{ variant: 'outline', color: 'primary' }" content="Outline" />
<SxoDemo component="Tag" :props="{ variant: 'subtle', color: 'primary' }" content="Subtle" />

## 可关闭

<SxoDemo component="Tag" :props="{ closable: true }" content="Closable" />

## 不同尺寸

<SxoDemo component="Tag" :props="{ size: 'sm' }" content="Small" />
<SxoDemo component="Tag" :props="{ size: 'md' }" content="Medium" />
<SxoDemo component="Tag" :props="{ size: 'lg' }" content="Large" />

## API

<SxoApiTable component="Tag" />
