import { defineComponent, h, PropType } from 'vue';
import { useStyle } from '../hooks';

export type Responsive<T> =
    | T
    | {
          base?: T;
          sm?: T;
          md?: T;
          lg?: T;
          xl?: T;
          '2xl'?: T;
      };

function resolveResponsive<T>(prop: Responsive<T> | undefined, prefix: string): string[] {
    if (prop === undefined) return [];
    if (typeof prop !== 'object' || Array.isArray(prop)) {
        return [`${prefix}-${prop}`];
    }
    const result: string[] = [];
    const p = prop as any;
    if (p.base !== undefined) result.push(`${prefix}-${p.base}`);
    if (p.sm !== undefined) result.push(`sm:${prefix}-${p.sm}`);
    if (p.md !== undefined) result.push(`md:${prefix}-${p.md}`);
    if (p.lg !== undefined) result.push(`lg:${prefix}-${p.lg}`);
    if (p.xl !== undefined) result.push(`xl:${prefix}-${p.xl}`);
    if (p['2xl'] !== undefined) result.push(`2xl:${prefix}-${p['2xl']}`);
    return result;
}

export const Stack = defineComponent({
    name: 'SxoStack',
    props: {
        direction: {
            type: [String, Object] as PropType<Responsive<'row' | 'col'>>,
            default: 'col',
        },
        gap: {
            type: [String, Number, Object] as PropType<Responsive<string | number>>,
            default: 4,
        },
        align: {
            type: [String, Object] as PropType<
                Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>
            >,
            default: 'stretch',
        },
        justify: {
            type: [String, Object] as PropType<
                Responsive<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>
            >,
            default: 'start',
        },
        wrap: {
            type: [Boolean, Object] as PropType<Responsive<boolean>>,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = [
            'flex',
            ...resolveResponsive(props.direction, 'flex'),
            ...resolveResponsive(props.gap, 'gap'),
            ...resolveResponsive(props.align, 'items'),
            ...resolveResponsive(props.justify, 'justify'),
            ...(typeof props.wrap === 'boolean'
                ? [props.wrap ? 'flex-wrap' : 'flex-nowrap']
                : resolveResponsive(props.wrap, 'flex').map((v) =>
                      v.includes('true')
                          ? v.replace('-true', '-wrap')
                          : v.replace('-false', '-nowrap'),
                  )),
            attrs.class,
        ]
            .filter(Boolean)
            .join(' ');

        useStyle(() => classes);

        return () => h('div', { ...attrs, class: classes }, slots.default?.());
    },
});

export const Grid = defineComponent({
    name: 'SxoGrid',
    props: {
        cols: {
            type: [Number, Object] as PropType<Responsive<number>>,
            default: 1,
        },
        rows: {
            type: [Number, Object] as PropType<Responsive<number>>,
            default: undefined,
        },
        gap: {
            type: [String, Number, Object] as PropType<Responsive<string | number>>,
            default: 4,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = [
            'grid',
            ...resolveResponsive(props.cols, 'grid-cols'),
            ...resolveResponsive(props.rows, 'grid-rows'),
            ...resolveResponsive(props.gap, 'gap'),
            attrs.class,
        ]
            .filter(Boolean)
            .join(' ');

        useStyle(() => classes);

        return () => h('div', { ...attrs, class: classes }, slots.default?.());
    },
});

export const Container = defineComponent({
    name: 'SxoContainer',
    props: {
        center: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = ['container', props.center ? 'mx-auto' : '', attrs.class]
            .filter(Boolean)
            .join(' ');

        useStyle(() => classes);

        return () => h('div', { ...attrs, class: classes }, slots.default?.());
    },
});
