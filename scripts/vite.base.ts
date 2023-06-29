import oxc from 'unplugin-oxc/vite';
import type { UserConfig } from 'vite';

export const baseConfig: UserConfig = {
    // @ts-ignore - Experimental Rolldown support in Vite 6
    builder: 'rolldown',
    plugins: [oxc()],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
};

export function mergeBaseConfig(config: UserConfig): UserConfig {
    return {
        ...baseConfig,
        ...config,
        plugins: [...(baseConfig.plugins || []), ...(config.plugins || [])],
        css: {
            ...baseConfig.css,
            ...config.css,
        },
        build: {
            ...baseConfig.build,
            ...config.build,
        },
    };
}
