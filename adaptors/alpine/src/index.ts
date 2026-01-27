import { defaultTheme } from '@sxo/ui';

export default function (Alpine: any) {
    Alpine.store('sxo', {
        theme: defaultTheme,
        setTheme(newTheme: any) {
            this.theme = { ...this.theme, ...newTheme };
        },
    });

    Alpine.directive('sxo-theme', (el: HTMLElement, { expression }: any, { evaluate }: any) => {
        const theme = evaluate(expression);
        el.style.setProperty('--sxo-primary', theme.color.primary[500]);
        // Apply more tokens as CSS variables
    });
}
