export interface UploadOptions {
    disabled?: boolean;
    drag?: boolean;
}

export function getUploadClasses(options: UploadOptions = {}) {
    const { disabled = false, drag = false } = options;

    const container = 'w-full';
    const trigger = 'inline-block';
    const dragArea =
        'w-full min-h-[160px] border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary-DEFAULT hover:bg-primary-50 transition-all group';
    const dragIcon =
        'w-12 h-12 text-neutral-300 mb-4 group-hover:text-primary-DEFAULT transition-colors';
    const dragText = 'text-sm text-neutral-500 group-hover:text-primary-DEFAULT transition-colors';

    return {
        container,
        trigger,
        dragArea: [
            dragArea,
            disabled
                ? 'opacity-50 cursor-not-allowed hover:border-neutral-200 hover:bg-neutral-50'
                : '',
        ].join(' '),
        dragIcon,
        dragText,
        fileList: 'mt-4 space-y-2',
        fileItem:
            'flex items-center justify-between p-3 bg-white border border-neutral-100 rounded-lg group hover:border-primary-100 transition-all',
        fileName: 'text-sm text-neutral-700 flex items-center gap-2',
        fileRemove:
            'text-neutral-400 hover:text-error cursor-pointer p-1 rounded hover:bg-error-50 transition-all opacity-0 group-hover:opacity-100',
        hint: 'mt-2 text-xs text-neutral-400',
    };
}
