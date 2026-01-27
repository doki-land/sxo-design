import type { Rule } from '../types';
import { animationRules } from './animation';
import { backgroundRules } from './backgrounds';
import { borderRules } from './borders';
import { effectRules } from './effects';
import { layoutRules } from './layout';
import { spacingRules } from './spacing';
import { transformRules } from './transforms';
import { transitionRules } from './transitions';
import { typographyRules } from './typography';

export const allRules: Rule[] = [
    // Ignore semantic markers
    [/^sxo-(.+)$/, () => ({})],
    ['group', () => ({})],

    ...layoutRules,
    ...spacingRules,
    ...backgroundRules,
    ...typographyRules,
    ...borderRules,
    ...effectRules,
    ...animationRules,
    ...transitionRules,
    ...transformRules,
];
