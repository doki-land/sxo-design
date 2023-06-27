import { ref, watch } from 'vue';

const STORAGE_KEY = 'sxo-framework-preference';

// 支持的框架列表
export const frameworks = [
    { id: 'vue', name: 'Vue 3', icon: '🟢' },
    { id: 'react', name: 'React', icon: '🔵' },
    { id: 'solid', name: 'Solid', icon: '💎' },
    { id: 'vue2', name: 'Vue 2', icon: '🎾' },
];

// 全局响应式状态
export const currentFramework = ref('vue');

// 初始化加载偏好
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && frameworks.some((f) => f.id === saved)) {
        currentFramework.value = saved;
    }
}

// 监听并持久化
watch(currentFramework, (val) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, val);
    }
});
