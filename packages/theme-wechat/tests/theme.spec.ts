import { describe, expect, it } from 'vitest';
import { wechatTheme } from '../src/tokens';

describe('WeChat Theme', () => {
    it('should have correct theme structure', () => {
        expect(wechatTheme.color).toBeDefined();
        expect(wechatTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
