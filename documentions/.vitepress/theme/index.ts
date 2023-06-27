import DefaultTheme from 'vitepress/theme';
import SxoCodeGroup from '../components/SxoCodeGroup.vue';
import SxoCodeBlock from '../components/SxoCodeBlock.vue';
import SxoPlayground from '../components/SxoPlayground.vue';
import './custom.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('SxoCodeGroup', SxoCodeGroup);
        app.component('SxoCodeBlock', SxoCodeBlock);
        app.component('SxoPlayground', SxoPlayground);
    },
};
