import { defineComponent, h } from 'vue';
import { useStyle } from '../hooks';

export const Box = defineComponent({
    name: 'SxoBox',
    props: {
        as: {
            type: String,
            default: 'div',
        },
    },
    setup(props, { slots, attrs }) {
        const finalClasses = useStyle(() => {
            const classes = [(attrs.class as string) || ''];

            // 常见的原子化属性映射
            const utilityMap: Record<string, string> = {
                p: 'p',
                padding: 'p',
                m: 'm',
                margin: 'm',
                bg: 'bg',
                text: 'text',
                rounded: 'rounded',
                shadow: 'shadow',
                w: 'w',
                h: 'h',
                display: '',
                flex: 'flex',
                grid: 'grid',
            };

            for (const [key, prefix] of Object.entries(utilityMap)) {
                if (attrs[key] !== undefined) {
                    const value = attrs[key];
                    if (prefix) {
                        classes.push(`${prefix}-${value}`);
                    } else {
                        classes.push(String(value));
                    }
                }
            }

            return classes.filter(Boolean).join(' ');
        });

        return () =>
            h(
                props.as,
                {
                    ...(attrs as any),
                    class: finalClasses.value,
                },
                slots.default?.() as any,
            );
    },
});
