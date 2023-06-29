import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import * as SxoVue from 'vue-sxo';
import { createSxo, I18nProvider, ToastProvider } from 'vue-sxo';
import SxoApiTable from '../components/SxoApiTable.vue';
import SxoCodeBlock from '../components/SxoCodeBlock.vue';
import SxoCodeGroup from '../components/SxoCodeGroup.vue';
import SxoDemo from '../components/SxoDemo.vue';
// import SxoPlayground from '../components/SxoPlayground.vue';
import './custom.css';

export default {
    ...DefaultTheme,
    Layout: () => {
        return h(
            I18nProvider,
            { locale: 'en', messages: {} },
            {
                default: () =>
                    h(ToastProvider, null, {
                        default: () => h(DefaultTheme.Layout),
                    }),
            },
        );
    },
    enhanceApp({ app }) {
        // 初始化 SXO 插件
        app.use(createSxo());

        // 注册所有 vue-sxo 组件
        Object.entries(SxoVue).forEach(([name, component]) => {
            if (name === 'default') return;
            // 只要是对象或函数（组件），且不是 hook (useXxx)
            if (
                (typeof component === 'object' || typeof component === 'function') &&
                !name.startsWith('use')
            ) {
                const componentName = name.startsWith('Sxo') ? name : `Sxo${name}`;
                app.component(componentName, component as any);
            }
        });

        // 注册全局组件
        app.component('SxoCodeGroup', SxoCodeGroup);
        app.component('SxoCodeBlock', SxoCodeBlock);
        app.component('SxoDemo', SxoDemo);
        app.component('SxoApiTable', SxoApiTable);
        // app.component('SxoPlayground', SxoPlayground);
    },
};
