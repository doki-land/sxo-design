import { describe, it } from 'vitest';
import { createApp } from 'vue';

describe('Vue debug', () => {
    it('should have createApp in different imports', () => {
        console.log('createApp type:', typeof createApp);
    });
});
