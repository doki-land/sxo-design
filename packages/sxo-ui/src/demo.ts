import { StyleEngine } from '@sxo/engine';
import { defaultTokens } from '@sxo/design';
import {
  getButtonClasses,
  getInputClasses,
  getCardClasses,
  getBadgeClasses,
  getDialogClasses,
} from './components';

/**
 * SXO UI Kitchen Sink Demo
 * 演示极致黑白主题下的高阶组件视觉
 */
export function generateDemo() {
  const engine = new StyleEngine(defaultTokens);

  // 1. 收集所有需要的类名
  const classes = new Set<string>();

  // Button 变体
  ['primary', 'secondary', 'accent', 'outline', 'ghost'].forEach((v) => {
    getButtonClasses({ variant: v as any })
      .split(' ')
      .forEach((c) => classes.add(c));
  });

  // Input 变体
  ['outline', 'bottom-line', 'ghost'].forEach((v) => {
    getInputClasses({ variant: v as any })
      .split(' ')
      .forEach((c) => classes.add(c));
  });

  // Card 变体
  ['outline', 'elevated', 'accent'].forEach((v) => {
    getCardClasses({ variant: v as any, interactive: true })
      .split(' ')
      .forEach((c) => classes.add(c));
  });

  // Badge 变体
  ['primary', 'accent', 'neon', 'outline'].forEach((v) => {
    getBadgeClasses({ variant: v as any })
      .split(' ')
      .forEach((c) => classes.add(c));
  });

  // Dialog 变体
  const dialogStyles = getDialogClasses();
  Object.values(dialogStyles).forEach((style) => {
    style.split(' ').forEach((c) => classes.add(c));
  });

  // 2. 生成 CSS
  const css = engine.generateSheet(Array.from(classes));
  const vars = engine.generateTokenCssVars();

  // 3. 构造演示 HTML (模拟)
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SXO UI High-End Demo</title>
    <style>
        ${vars}
        body { background: var(--sxo-color-background-primary); color: var(--sxo-color-primary); font-family: sans-serif; padding: 4rem; }
        .section { margin-bottom: 4rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        ${css}
    </style>
</head>
<body>
    <div class="section">
        <h1 class="text-4xl font-black uppercase tracking-tighter mb-8">SXO Design System / High-End BW</h1>
        
        <div class="mb-8">
            <h2 class="text-xl font-bold mb-4 uppercase">Buttons</h2>
            <div class="flex gap-4">
                <button class="${getButtonClasses({ variant: 'primary' })}">Primary</button>
                <button class="${getButtonClasses({ variant: 'accent' })}">Accent</button>
                <button class="${getButtonClasses({ variant: 'outline' })}">Outline</button>
                <button class="${getButtonClasses({ variant: 'ghost' })}">Ghost</button>
            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-bold mb-4 uppercase">Badges</h2>
            <div class="flex gap-4">
                <span class="${getBadgeClasses({ variant: 'primary' })}">New</span>
                <span class="${getBadgeClasses({ variant: 'accent' })}">Hot</span>
                <span class="${getBadgeClasses({ variant: 'neon' })}">Neon</span>
                <span class="${getBadgeClasses({ variant: 'outline' })}">Outline</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="text-xl font-bold mb-4 uppercase">Cards</h2>
        <div class="grid">
            <div class="${getCardClasses({ variant: 'elevated', interactive: true })}">
                <h3 class="text-lg font-black mb-2 uppercase">Elevated Card</h3>
                <p class="text-neutral-500 text-sm">极致黑白配色的硬阴影效果，极具现代感。</p>
            </div>
            <div class="${getCardClasses({ variant: 'accent', interactive: true })}">
                <h3 class="text-lg font-black mb-2 uppercase">Accent Card</h3>
                <p class="text-neutral-500 text-sm">高饱和度点缀色，用于强调核心内容。</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="text-xl font-bold mb-4 uppercase">Inputs</h2>
        <div class="grid">
            <input type="text" placeholder="Outline Input" class="${getInputClasses({ variant: 'outline' })}" />
            <input type="text" placeholder="Bottom Line Input" class="${getInputClasses({ variant: 'bottom-line' })}" />
        </div>
    </div>
</body>
</html>
  `;

  return html;
}
