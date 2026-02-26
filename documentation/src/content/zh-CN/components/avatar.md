# Avatar 头像

头像组件用于展示用户头像，支持图片、文本和不同形状/尺寸。

## 基础用法

<SxoDemo component="Avatar" :props="{ src: 'https://i.pravatar.cc/150?u=sxo', name: 'SXO' }" />

## 文本占位

<SxoDemo component="Avatar" :props="{ name: 'SXO' }" />

## 不同形状

<SxoDemo component="Avatar" :props="{ shape: 'square', src: 'https://i.pravatar.cc/150?u=sxo' }" />

## 不同尺寸

<SxoDemo component="Avatar" :props="{ size: 'xs', src: 'https://i.pravatar.cc/150?u=sxo' }" />
<SxoDemo component="Avatar" :props="{ size: 'sm', src: 'https://i.pravatar.cc/150?u=sxo' }" />
<SxoDemo component="Avatar" :props="{ size: 'md', src: 'https://i.pravatar.cc/150?u=sxo' }" />
<SxoDemo component="Avatar" :props="{ size: 'lg', src: 'https://i.pravatar.cc/150?u=sxo' }" />
<SxoDemo component="Avatar" :props="{ size: 'xl', src: 'https://i.pravatar.cc/150?u=sxo' }" />

## API

<SxoApiTable component="Avatar" />
