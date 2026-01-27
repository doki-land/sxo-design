import { describe, expect, it } from 'vitest';
import { getAccordionClasses } from '../src/components/Accordion';
import { getAlertClasses } from '../src/components/Alert';
import { getAvatarClasses } from '../src/components/Avatar';
import { getBadgeClasses } from '../src/components/Badge';
import { getBreadcrumbClasses } from '../src/components/Breadcrumb';
import { getButtonClasses } from '../src/components/Button';
import { getCardClasses } from '../src/components/Card';
import { getInputClasses } from '../src/components/Input';
import { getMentionsClasses } from '../src/components/Mentions';
import { getMenuClasses } from '../src/components/Menu';
import { getPopconfirmClasses } from '../src/components/Popconfirm';
import { getPopoverClasses } from '../src/components/Popover';
import { getRadioClasses } from '../src/components/Radio';
import { getRateClasses } from '../src/components/Rate';
import { getResultClasses } from '../src/components/Result';
import { getSearchClasses } from '../src/components/Search';
import { getSelectClasses } from '../src/components/Select';
import { getSkeletonClasses } from '../src/components/Skeleton';
import { getSliderClasses } from '../src/components/Slider';
import { getStatisticClasses } from '../src/components/Statistic';
import { getStepsClasses } from '../src/components/Steps';
import { getSwitchClasses } from '../src/components/Switch';
import { getTableClasses } from '../src/components/Table';
import { getTabsClasses } from '../src/components/Tabs';
import { getTagClasses } from '../src/components/Tag';
import { getTimelineClasses } from '../src/components/Timeline';
import { getToastClasses } from '../src/components/Toast';
import { getTooltipClasses } from '../src/components/Tooltip';
import { getTransferClasses } from '../src/components/Transfer';
import { getTreeClasses } from '../src/components/Tree';

describe('Button Classes', () => {
    it('should return default classes', () => {
        const classes = getButtonClasses();
        expect(classes).toContain('bg-primary');
        expect(classes).toContain('h-10');
        expect(classes).toContain('rounded-md');
    });

    it('should support different variants', () => {
        expect(getButtonClasses({ variant: 'secondary' })).toContain('bg-background-primary');
        expect(getButtonClasses({ variant: 'accent' })).toContain('bg-accent-vivid');
        expect(getButtonClasses({ variant: 'outline' })).toContain('border-neutral-200');
        expect(getButtonClasses({ variant: 'ghost' })).toContain('bg-transparent');
    });

    it('should support different sizes', () => {
        expect(getButtonClasses({ size: 'xs' })).toContain('h-7');
        expect(getButtonClasses({ size: 'xl' })).toContain('h-14');
    });

    it('should handle disabled state', () => {
        expect(getButtonClasses({ disabled: true })).toContain('opacity-30');
        expect(getButtonClasses({ disabled: true })).toContain('cursor-not-allowed');
    });
});

describe('Input Classes', () => {
    it('should return default classes', () => {
        const classes = getInputClasses();
        expect(classes).toContain('bg-background-primary');
        expect(classes).toContain('h-10');
    });

    it('should handle invalid state', () => {
        const classes = getInputClasses({ invalid: true });
        expect(classes).toContain('border-error');
    });
});

describe('Tag Classes', () => {
    it('should return default classes', () => {
        const classes = getTagClasses();
        expect(classes.base).toContain('bg-primary-500');
    });

    it('should support different colors', () => {
        expect(getTagClasses({ color: 'success' }).base).toContain('bg-success-500');
    });
});

describe('Alert Classes', () => {
    it('should return default classes', () => {
        const classes = getAlertClasses();
        expect(classes.container).toContain('bg-info/10');
    });

    it('should support different types and variants', () => {
        expect(getAlertClasses({ type: 'success', variant: 'solid' }).container).toContain(
            'bg-success',
        );
    });
});

describe('Badge Classes', () => {
    it('should return default classes', () => {
        const classes = getBadgeClasses();
        expect(classes).toContain('bg-primary');
    });

    it('should support different variants', () => {
        expect(getBadgeClasses({ variant: 'accent' })).toContain('bg-accent-vivid');
    });
});

describe('Accordion Classes', () => {
    it('should return default classes', () => {
        const classes = getAccordionClasses();
        expect(classes.root).toContain('border-neutral-200');
    });

    it('should handle expanded state in functions', () => {
        const classes = getAccordionClasses();
        expect(classes.item(true)).toContain('bg-neutral-50/50');
        expect(classes.icon(true)).toContain('rotate-180');
    });

    it('should support splitted variant', () => {
        const classes = getAccordionClasses({ variant: 'splitted' });
        expect(classes.root).toContain('gap-2');
        expect(classes.item(false)).toContain('rounded-lg');
    });
});

describe('Avatar Classes', () => {
    it('should return default classes', () => {
        const classes = getAvatarClasses();
        expect(classes.root).toContain('w-10 h-10');
        expect(classes.root).toContain('rounded-full');
    });

    it('should support different sizes and shapes', () => {
        const classes = getAvatarClasses({ size: 'xl', shape: 'square' });
        expect(classes.root).toContain('w-16 h-16');
        expect(classes.root).toContain('rounded-lg');
    });
});

describe('Breadcrumb Classes', () => {
    it('should return default classes', () => {
        const classes = getBreadcrumbClasses();
        expect(classes.container).toContain('flex items-center');
        expect(classes.link).toContain('text-neutral-500');
    });
});

describe('Menu Classes', () => {
    it('should return default classes', () => {
        const classes = getMenuClasses();
        expect(classes.container).toContain('relative inline-block');
        expect(classes.button).toContain('bg-primary');
    });
});

describe('Radio Classes', () => {
    it('should return default classes when not selected', () => {
        const classes = getRadioClasses(false);
        expect(classes.root).toContain('border-neutral-300');
        expect(classes.inner).toContain('scale-0');
    });

    it('should handle selected state', () => {
        const classes = getRadioClasses(true, { color: 'success' });
        expect(classes.root).toContain('border-success');
        expect(classes.inner).toContain('scale-100');
        expect(classes.inner).toContain('bg-success');
    });
});

describe('Switch Classes', () => {
    it('should return default classes when off', () => {
        const classes = getSwitchClasses(false);
        expect(classes.track).toContain('bg-neutral-200');
        expect(classes.thumb).not.toContain('translate-x-5');
    });

    it('should handle on state and different sizes', () => {
        const classes = getSwitchClasses(true, { size: 'lg', color: 'success' });
        expect(classes.track).toContain('bg-success');
        expect(classes.track).toContain('w-14 h-7');
        expect(classes.thumb).toContain('translate-x-7');
    });
});

describe('Alert Classes', () => {
    it('should return default classes', () => {
        const classes = getAlertClasses();
        expect(classes.container).toContain('bg-info/10');
        expect(classes.container).toContain('text-info');
    });

    it('should support different types and variants', () => {
        const classes = getAlertClasses({ type: 'error', variant: 'solid' });
        expect(classes.container).toContain('bg-error');
        expect(classes.container).toContain('text-white');
    });
});

describe('Badge Classes', () => {
    it('should return default classes', () => {
        const classes = getBadgeClasses();
        expect(classes).toContain('bg-primary');
        expect(classes).toContain('px-3');
    });

    it('should support different variants and sizes', () => {
        const classes = getBadgeClasses({ variant: 'neon', size: 'sm' });
        expect(classes).toContain('bg-accent-neon');
        expect(classes).toContain('px-2.5');
    });
});

describe('Card Classes', () => {
    it('should return default classes', () => {
        const classes = getCardClasses();
        expect(classes).toContain('bg-background-primary');
        expect(classes).toContain('p-6');
    });

    it('should support interactive mode and different variants', () => {
        const classes = getCardClasses({ interactive: true, variant: 'accent', padding: 'lg' });
        expect(classes).toContain('cursor-pointer');
        expect(classes).toContain('bg-gradient-to-br');
        expect(classes).toContain('p-8');
    });
});

describe('Skeleton Classes', () => {
    it('should return default classes', () => {
        const classes = getSkeletonClasses();
        expect(classes.avatar).toContain('animate-pulse');
        expect(classes.avatar).toContain('rounded-full');
    });

    it('should support non-active and non-rounded states', () => {
        const classes = getSkeletonClasses({ active: false, rounded: false });
        expect(classes.avatar).not.toContain('animate-pulse');
        expect(classes.avatar).toContain('rounded-lg');
    });
});

describe('Steps Classes', () => {
    it('should return default classes', () => {
        const classes = getStepsClasses();
        expect(classes.container).toContain('flex w-full');
        expect(classes.iconProcess).toContain('bg-primary-DEFAULT');
    });

    it('should support vertical direction', () => {
        const classes = getStepsClasses({ direction: 'vertical' });
        expect(classes.container).toContain('flex flex-col');
        expect(classes.line).toContain('w-[1px]');
    });
});

describe('Tabs Classes', () => {
    it('should return default classes', () => {
        const classes = getTabsClasses();
        expect(classes.list).toContain('border-b');
        expect(classes.tab(true)).toContain('border-primary');
    });

    it('should support pill variant and different sizes', () => {
        const classes = getTabsClasses({ variant: 'pill', size: 'sm' });
        expect(classes.list).toContain('bg-neutral-100');
        expect(classes.tab(true)).toContain('bg-white');
        expect(classes.tab(true)).toContain('text-sm');
    });
});

describe('Timeline Classes', () => {
    it('should return default classes', () => {
        const classes = getTimelineClasses();
        expect(classes.container).toContain('flex flex-col');
        expect(classes.dot).toContain('bg-primary-DEFAULT');
    });
});

describe('Toast Classes', () => {
    it('should return default classes', () => {
        const classes = getToastClasses();
        expect(classes.container).toContain('top-0 right-0');
        expect(classes.item).toContain('border-primary/20');
    });

    it('should support different positions and types', () => {
        const classes = getToastClasses({ position: 'bottom-left', type: 'success' });
        expect(classes.container).toContain('bottom-0 left-0');
        expect(classes.item).toContain('border-success/20');
    });
});

describe('Tooltip Classes', () => {
    it('should return default classes', () => {
        const classes = getTooltipClasses();
        expect(classes.content).toContain('bg-neutral-800');
    });

    it('should support light variant', () => {
        const classes = getTooltipClasses({ variant: 'light' });
        expect(classes.content).toContain('bg-white');
        expect(classes.content).toContain('border');
    });
});

describe('Result Classes', () => {
    it('should return default classes', () => {
        const classes = getResultClasses();
        expect(classes.container).toContain('flex flex-col');
        expect(classes.icon).toContain('text-info');
    });

    it('should support different statuses', () => {
        const classes = getResultClasses({ status: 'success' });
        expect(classes.icon).toContain('text-success');
    });
});

describe('Rate Classes', () => {
    it('should return default classes', () => {
        const classes = getRateClasses();
        expect(classes.container).toContain('flex items-center');
        expect(classes.item).toContain('cursor-pointer');
    });

    it('should handle disabled state', () => {
        const classes = getRateClasses({ disabled: true });
        expect(classes.item).toContain('cursor-not-allowed');
    });
});

describe('Mentions Classes', () => {
    it('should return default classes', () => {
        const classes = getMentionsClasses();
        expect(classes.container).toContain('border-neutral-200');
        expect(classes.textarea).toContain('bg-transparent');
    });

    it('should support different sizes and statuses', () => {
        const classes = getMentionsClasses({ size: 'lg', status: 'error' });
        expect(classes.container).toContain('min-h-[48px]');
        expect(classes.container).toContain('border-error-500');
    });
});

describe('Popconfirm Classes', () => {
    it('should return default classes', () => {
        const classes = getPopconfirmClasses();
        expect(classes.container).toContain('shadow-xl');
        expect(classes.icon).toContain('text-warning');
    });

    it('should support different types', () => {
        const classes = getPopconfirmClasses({ type: 'error' });
        expect(classes.icon).toContain('text-error');
    });
});

describe('Popover Classes', () => {
    it('should return default classes', () => {
        const classes = getPopoverClasses();
        expect(classes.container).toContain('relative inline-block');
        expect(classes.content).toContain('bottom-full');
    });

    it('should support different placements', () => {
        const classes = getPopoverClasses({ placement: 'bottom' });
        expect(classes.content).toContain('top-full');
    });
});

describe('Search Classes', () => {
    it('should return default classes', () => {
        const classes = getSearchClasses();
        expect(classes.container).toContain('rounded-full');
        expect(classes.input).toContain('h-10');
    });

    it('should support different variants and sizes', () => {
        const classes = getSearchClasses({ variant: 'ghost', size: 'lg', rounded: false });
        expect(classes.container).toContain('rounded-md');
        expect(classes.input).toContain('h-12');
        expect(classes.input).toContain('bg-neutral-100');
    });
});

describe('Select Classes', () => {
    it('should return default classes', () => {
        const classes = getSelectClasses(false);
        expect(classes.trigger).toContain('border-neutral-200');
        expect(classes.listbox).toContain('opacity-0');
    });

    it('should handle open state and different sizes', () => {
        const classes = getSelectClasses(true, { size: 'lg' });
        expect(classes.trigger).toContain('border-primary');
        expect(classes.trigger).toContain('h-12');
        expect(classes.listbox).toContain('opacity-100');
    });
});

describe('Slider Classes', () => {
    it('should return default classes', () => {
        const classes = getSliderClasses();
        expect(classes.container).toContain('cursor-pointer');
        expect(classes.handle).toContain('border-primary-DEFAULT');
    });

    it('should handle disabled state', () => {
        const classes = getSliderClasses({ disabled: true });
        expect(classes.container).toContain('cursor-not-allowed');
        expect(classes.handle).toContain('border-neutral-300');
    });
});

describe('Statistic Classes', () => {
    it('should return default classes', () => {
        const classes = getStatisticClasses();
        expect(classes.container).toContain('flex flex-col');
        expect(classes.value).toContain('text-2xl');
    });
});

describe('Table Classes', () => {
    it('should return default classes', () => {
        const classes = getTableClasses();
        expect(classes.container).toContain('border-neutral-200');
        expect(classes.thead).toContain('bg-neutral-50/80');
    });

    it('should support different sizes and options', () => {
        const classes = getTableClasses({ size: 'sm', hover: false, striped: true, border: false });
        expect(classes.container).not.toContain('border-neutral-200');
        expect(classes.th).toContain('px-3 py-2');
        expect(classes.trStriped).toContain('even:bg-neutral-50/30');
    });
});

describe('Transfer Classes', () => {
    it('should return default classes', () => {
        const classes = getTransferClasses();
        expect(classes.container).toContain('flex items-center');
        expect(classes.list).toContain('border-neutral-200');
    });

    it('should support different sizes', () => {
        const classes = getTransferClasses({ size: 'lg' });
        expect(classes.container).toContain('text-base');
    });
});

describe('Tree Classes', () => {
    it('should return default classes', () => {
        const classes = getTreeClasses();
        expect(classes.container).toContain('w-full space-y-1');
        expect(classes.contentActive).toContain('bg-primary-50');
    });
});
