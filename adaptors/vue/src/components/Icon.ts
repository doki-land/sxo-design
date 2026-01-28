import { Icons, type IconDefinition } from '@sxo/component-icons';
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
        variant: {
            type: String as PropType<'linear' | 'solid'>,
            default: 'linear',
        },
    },
    setup(props, { attrs }) {
        useStyle(() => (attrs.class as string) || '');

        return () => {
            const iconDef = Icons[props.name] as IconDefinition;
            if (!iconDef) {
                console.warn(`[SxoIcon] Icon "${props.name}" not found.`);
                return h('span', { ...attrs, style: { display: 'inline-block', width: props.size, height: props.size } });
            }
            const path = (props.variant === 'solid' && iconDef.solid) ? iconDef.solid : iconDef.linear;
            const isSolid = props.variant === 'solid' && !!iconDef.solid;

            return h(
                'svg',
                {
                    ...attrs,
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: props.size,
                    height: props.size,
                    viewBox: '0 0 24 24',
                    fill: isSolid ? props.color : 'none',
                    stroke: isSolid ? 'none' : props.color,
                    'stroke-width': isSolid ? 0 : props.strokeWidth,
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
