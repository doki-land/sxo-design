export interface SwitchOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
}

export function getSwitchClasses(isOn: boolean, options: SwitchOptions = {}) {
    const { size = 'md', color = 'primary' } = options;

    const sizes = {
        sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', active: 'translate-x-4' },
        md: { track: 'w-11 h-6', thumb: 'w-5 h-5', active: 'translate-x-5' },
        lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', active: 'translate-x-7' },
    };

    const trackBase =
        'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none';
    const thumbBase =
        'inline-block transform rounded-full bg-white transition duration-200 ease-in-out shadow-sm translate-x-1';

    const trackColor = isOn
        ? color === 'primary'
            ? 'bg-primary'
            : 'bg-success'
        : 'bg-neutral-200';

    const currentSize = sizes[size];

    return {
        track: `${trackBase} ${trackColor} ${currentSize.track}`,
        thumb: `${thumbBase} ${currentSize.thumb} ${isOn ? currentSize.active : ''}`,
    };
}
