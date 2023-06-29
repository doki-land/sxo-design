import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Animation Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Animation', () => {
        it('should handle tokenized animations', () => {
            // These depend on what's in defaultTokens.animation
            // Assuming spin, ping, pulse, bounce are common
            if (defaultTokens.animation?.spin) {
                expect(engine.generate('animate-spin')).toContain(
                    `animation: ${defaultTokens.animation.spin}`,
                );
            }
            if (defaultTokens.animation?.pulse) {
                expect(engine.generate('animate-pulse')).toContain(
                    `animation: ${defaultTokens.animation.pulse}`,
                );
            }
        });

        it('should handle special animation values', () => {
            expect(engine.generate('animate-none')).toContain('animation: none');
        });

        it('should handle arbitrary animations', () => {
            expect(engine.generate('animate-[wiggle_1s_ease-in-out_infinite]')).toContain(
                'animation: wiggle 1s ease-in-out infinite',
            );
        });
    });
});
