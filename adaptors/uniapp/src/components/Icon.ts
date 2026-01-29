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
                return h('span', {
                    ...attrs,
                    style: { display: 'inline-block', width: props.size, height: props.size },
                });
            }
            const path =
                props.variant === 'solid' && iconDef.solid ? iconDef.solid : iconDef.linear;
            const isSolid = props.variant === 'solid' && !!iconDef.solid;

            // UniApp 小程序不支持直接渲染 SVG 标签，转换为 Data URI 并使用背景图渲染
            const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                     fill="${isSolid ? props.color : 'none'}" 
                     stroke="${isSolid ? 'none' : props.color}" 
                     stroke-width="${isSolid ? 0 : props.strokeWidth}" 
                     stroke-linecap="round" 
                     stroke-linejoin="round">
                    <path d="${path}" />
                </svg>
            `
                .replace(/\n/g, '')
                .replace(/"/g, "'");

            const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

            return h('view', {
                ...attrs,
                style: {
                    display: 'inline-block',
                    width: props.size,
                    height: props.size,
                    backgroundColor: props.color,
                    maskImage: `url("${dataUri}")`,
                    maskRepeat: 'no-repeat',
                    maskSize: '100% 100%',
                    '-webkit-mask-image': `url("${dataUri}")`,
                    '-webkit-mask-repeat': 'no-repeat',
                    '-webkit-mask-size': '100% 100%',
                    verticalAlign: 'middle',
                    ...(attrs.style as any),
                },
            });
        };
    },
});
