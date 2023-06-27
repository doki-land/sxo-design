import { expect, vi } from 'vitest';
import * as Vue from 'vue';

console.log('Setup: Vue version', Vue.version);
console.log('Setup: Vue keys', Object.keys(Vue).filter(k => k.includes('createApp')));
try {
    // @ts-ignore
    console.log('Setup: Vue path', require.resolve('vue'));
} catch (e) {
    console.log('Setup: Vue path (ESM)', import.meta.resolve('vue'));
}
