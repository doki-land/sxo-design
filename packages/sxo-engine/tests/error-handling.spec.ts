import { describe, expect, it } from 'vitest';
import { StyleEngine } from '../src/engine';
import { DesignTokens } from '@sxo/design';

describe('StyleEngine Error Handling', () => {
    it('should handle undefined breakpoints gracefully', () => {
        // Create tokens without breakpoints
        const tokens: Partial<DesignTokens> = {
            color: {
                white: '#ffffff',
                black: '#000000',
                primary: {
                    DEFAULT: '#000000',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#000000',
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#000000',
                    neon: '#000000',
                    vivid: '#000000',
                },
                success: { DEFAULT: '#000000' },
                warning: { DEFAULT: '#000000' },
                error: { DEFAULT: '#000000' },
                info: { DEFAULT: '#000000' },
                neutral: {},
                background: {
                    primary: '#ffffff',
                    secondary: '#ffffff',
                    inverse: '#000000',
                },
                text: {
                    primary: '#000000',
                    secondary: '#000000',
                    muted: '#000000',
                    inverse: '#ffffff',
                },
            },
        };

        const engine = new StyleEngine(tokens as DesignTokens);
        
        // This should not throw "TypeError: Cannot convert undefined or null to object"
        const css = engine.generateBatch(['text-center']);
        
        expect(css).toBeDefined();
        expect(css).toContain('text-align: center');
    });

    it('should handle missing tokens completely', () => {
         const engine = new StyleEngine({} as DesignTokens);
         // Should not crash
         const css = engine.generateBatch(['text-center']);
         expect(css).toBeDefined();
    });
});
