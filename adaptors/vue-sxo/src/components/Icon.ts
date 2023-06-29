import { Icons } from '@sxo/component-icons';
import { defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Icon = defineComponent({
    name: 'SxoIcon',
    props: {
        name: {
            type: String as PropType<keyof typeof Icons>,
            required: true,
        },
        size: {
            type: [String, Number] as PropType<string | number>,
            default: '1em',
        },
        color: {
            type: String,
            default: 'currentColor',
        },
        strokeWidth: {
            type: Number,
            default: 2,
        },
    },
    setup(props, { attrs }) {
        useStyle(() => (attrs.class as string) || '');

        return () => {
            const path = Icons[props.name];
            return h(
                'svg',
                {
                    ...attrs,
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: props.size,
                    height: props.size,
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: props.color,
                    'stroke-width': props.strokeWidth,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        ...(attrs.style as any),
                    },
                },
                [h('path', { d: path })],
            );
        };
    },
});
