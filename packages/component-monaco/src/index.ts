import * as monaco from 'monaco-editor';

export interface MonacoEditorOptions {
    value?: string;
    language?: string;
    theme?: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
    onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export function createMonacoEditor(container: HTMLElement, options: MonacoEditorOptions = {}) {
    const {
        value = '',
        language = 'markdown',
        theme = 'vs-dark',
        readOnly = false,
        onChange,
        onMount,
    } = options;

    const editor = monaco.editor.create(container, {
        value,
        language,
        theme,
        readOnly,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
    });

    if (onChange) {
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });
    }

    if (onMount) {
        onMount(editor);
    }

    return {
        editor,
        setValue: (val: string) => editor.setValue(val),
        getValue: () => editor.getValue(),
        destroy: () => editor.dispose(),
    };
}

export type MonacoEditorInstance = ReturnType<typeof createMonacoEditor>;
