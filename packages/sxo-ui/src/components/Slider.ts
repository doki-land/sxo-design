export interface SliderOptions {
    disabled?: boolean;
}

export function getSliderClasses(options: SliderOptions = {}) {
    const { disabled = false } = options;

    const container = 'relative w-full h-6 flex items-center group cursor-pointer select-none';
    const track =
        'absolute w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden transition-colors';
    const range = 'absolute h-full bg-primary-DEFAULT transition-all duration-100';
    const handle =
        'absolute w-5 h-5 bg-white border-2 border-primary-DEFAULT rounded-full shadow-md z-10 transition-transform hover:scale-110 active:scale-125 focus:outline-none';

    return {
        container: [container, disabled ? 'opacity-40 cursor-not-allowed' : ''].join(' '),
        track: [track, !disabled ? 'group-hover:bg-neutral-200' : ''].join(' '),
        range,
        handle: [handle, disabled ? 'border-neutral-300' : ''].join(' '),
        marks: 'absolute top-full mt-2 w-full flex justify-between px-1',
        markItem: 'text-xs text-neutral-400',
    };
}
