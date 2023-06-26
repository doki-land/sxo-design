import { pornhubTheme } from '../../theme-pornhub/src/tokens';
import { StyleEngine } from './engine';

const engine = new StyleEngine(pornhubTheme);

const testClasses = [
  'bg-primary', // Should be #FF9900
  'text-primary', // Should be #FF9900
  'bg-background-primary', // Should be #000000
  'rounded-sm', // Should be 4px (Standard Hub Radius)
  'shadow-hard-accent', // Should be 0 0 0 1px #FF9900
  'font-sans', // Should be Arial...
];

console.log('--- Testing PornHub Theme CSS Generation ---');
testClasses.forEach((cls) => {
  const css = engine.generate(cls);
  console.log(`Class: ${cls}`);
  console.log(`CSS: ${css || '(failed)'}`);
  console.log('---');
});
