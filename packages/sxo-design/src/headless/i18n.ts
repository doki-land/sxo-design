/**
 * 轻量级 i18n 逻辑
 */
export interface I18nMessages {
    [lang: string]: {
        [key: string]: string | ((...args: any[]) => string);
    };
}

export function createI18n(options: {
    locale: string;
    fallbackLocale?: string;
    messages: I18nMessages;
}) {
    let currentLocale = options.locale;
    const listeners = new Set<(locale: string) => void>();

    const t = (key: string, ...args: any[]): string => {
        const langMessages =
            options.messages[currentLocale] ||
            options.messages[options.fallbackLocale || 'en'] ||
            {};
        const message = langMessages[key];

        if (typeof message === 'function') {
            return message(...args);
        }
        if (typeof message === 'string') {
            return message.replace(/{(\d+)}/g, (match, index) => {
                return args[index] !== undefined ? args[index] : match;
            });
        }
        return key;
    };

    return {
        get locale() {
            return currentLocale;
        },
        set locale(newLocale: string) {
            currentLocale = newLocale;
            for (const l of listeners) {
                l(newLocale);
            }
        },
        t,
        subscribe: (l: (locale: string) => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
    };
}
