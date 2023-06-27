import * as VueAll from 'vue';
import VueDefault from 'vue';
import { describe, it, expect } from 'vitest';

describe('Vue debug', () => {
    it('should have createApp in different imports', () => {
        console.log('VueAll type:', typeof VueAll);
        console.log('VueAll keys:', Object.keys(VueAll).filter(k => k.includes('createApp')));
        console.log('VueDefault type:', typeof VueDefault);
        if (VueDefault) {
            console.log('VueDefault keys:', Object.keys(VueDefault).filter(k => k.includes('createApp')));
        }
    });
});
