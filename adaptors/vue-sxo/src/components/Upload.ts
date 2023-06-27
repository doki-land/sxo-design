import { defineComponent, h, computed, ref, PropType } from 'vue';
import { getUploadClasses, UploadOptions } from '@sxo/ui';

export interface SxoFile {
    name: string;
    size: number;
    type: string;
    raw?: File;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    uid: number;
}

export const Upload = defineComponent({
    name: 'SxoUpload',
    props: {
        action: { type: String, default: '' },
        multiple: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        drag: { type: Boolean, default: false },
        accept: { type: String, default: '' },
        fileList: { type: Array as PropType<SxoFile[]>, default: () => [] },
        hint: { type: String, default: '' },
    },
    emits: ['update:fileList', 'change', 'remove', 'success', 'error'],
    setup(props, { emit, slots, attrs }) {
        const inputRef = ref<HTMLInputElement | null>(null);
        const styles = computed(() =>
            getUploadClasses({ disabled: props.disabled, drag: props.drag }),
        );

        const handleClick = () => {
            if (props.disabled) return;
            inputRef.value?.click();
        };

        const handleFileChange = (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files) return;
            addFiles(Array.from(files));
        };

        const addFiles = (files: File[]) => {
            const newFiles: SxoFile[] = files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                raw: file,
                status: 'ready',
                uid: Date.now() + Math.random(),
            }));

            const updatedList = props.multiple ? [...props.fileList, ...newFiles] : newFiles;
            emit('update:fileList', updatedList);
            emit('change', updatedList);

            // Reset input
            if (inputRef.value) inputRef.value.value = '';
        };

        const handleRemove = (uid: number) => {
            const updatedList = props.fileList.filter((f) => f.uid !== uid);
            emit('update:fileList', updatedList);
            emit('remove', uid);
        };

        const renderTrigger = () => {
            if (props.drag) {
                return h(
                    'div',
                    {
                        class: styles.value.dragArea,
                        onClick: handleClick,
                        onDragover: (e: DragEvent) => {
                            e.preventDefault();
                        },
                        onDrop: (e: DragEvent) => {
                            e.preventDefault();
                            if (props.disabled) return;
                            if (e.dataTransfer?.files) {
                                addFiles(Array.from(e.dataTransfer.files));
                            }
                        },
                    },
                    [
                        h(
                            'svg',
                            {
                                class: styles.value.dragIcon,
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                            },
                            [
                                h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
                                h('polyline', { points: '17 8 12 3 7 8' }),
                                h('line', { x1: '12', y1: '3', x2: '12', y2: '15' }),
                            ],
                        ),
                        h(
                            'div',
                            { class: styles.value.dragText },
                            slots.default ? slots.default() : '点击或拖拽文件到此处上传',
                        ),
                    ],
                );
            }

            return h(
                'div',
                { class: styles.value.trigger, onClick: handleClick },
                slots.default?.(),
            );
        };

        const renderFileList = () => {
            if (props.fileList.length === 0) return null;

            return h(
                'div',
                { class: styles.value.fileList },
                props.fileList.map((file) =>
                    h('div', { class: styles.value.fileItem, key: file.uid }, [
                        h('div', { class: styles.value.fileName }, [
                            h(
                                'svg',
                                {
                                    class: 'w-4 h-4 text-neutral-400',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                },
                                [
                                    h('path', {
                                        d: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z',
                                    }),
                                    h('polyline', { points: '13 2 13 9 20 9' }),
                                ],
                            ),
                            file.name,
                        ]),
                        h(
                            'div',
                            {
                                class: styles.value.fileRemove,
                                onClick: () => handleRemove(file.uid),
                            },
                            [
                                h(
                                    'svg',
                                    {
                                        class: 'w-4 h-4',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                    },
                                    [
                                        h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                        h('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                    ],
                                ),
                            ],
                        ),
                    ]),
                ),
            );
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                h('input', {
                    ref: inputRef,
                    type: 'file',
                    class: 'hidden',
                    multiple: props.multiple,
                    accept: props.accept,
                    onChange: handleFileChange,
                }),
                renderTrigger(),
                props.hint && h('div', { class: styles.value.hint }, props.hint),
                renderFileList(),
            ]);
    },
});
