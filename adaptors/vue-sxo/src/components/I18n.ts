import { createI18n, type I18nMessages } from '@sxo/design';
import { defineComponent, inject, provide, reactive, readonly, type PropType } from 'vue';

const I18nSymbol = Symbol('I18n');

export const I18nProvider = defineComponent({
    name: 'SxoI18nProvider',
    props: {
        locale: {
            type: String,
            default: 'en',
        },
        messages: {
            type: Object as PropType<I18nMessages>,
            required: true,
        },
    },
    setup(props, { slots }) {
        const i18n = createI18n({
            locale: props.locale,
            messages: props.messages,
        });

        const state = reactive({
            locale: i18n.locale,
        });

        i18n.subscribe((newLocale) => {
            state.locale = newLocale;
        });

        const t = (key: string, ...args: any[]) => i18n.t(key, ...args);

        provide(I18nSymbol, {
            state: readonly(state),
            t,
            setLocale: (l: string) => {
                i18n.locale = l;
            },
        });

        return () => slots.default?.();
    },
});

export function useI18n() {
    const context = inject<any>(I18nSymbol);
    if (!context) {
        // 返回一个空的实现以防崩溃
        return {
            locale: 'en',
            t: (key: string) => key,
            setLocale: () => {},
        };
    }
    return {
        locale: context.state.locale,
        t: context.t,
        setLocale: context.setLocale,
    };
}
