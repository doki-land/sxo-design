import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

export interface WysiwygEditorOptions {
    defaultValue?: string;
    onChange?: (markdown: string) => void;
    onMount?: (editor: Editor) => void;
}

export async function createWysiwygEditor(container: HTMLElement, options: WysiwygEditorOptions = {}) {
    const { defaultValue = '', onChange, onMount } = options;

    const editor = await Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, container);
            ctx.set(defaultValueCtx, defaultValue);
            if (onChange) {
                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
                    onChange(markdown);
                });
            }
        })
        .config(nord)
        .use(commonmark)
        .use(gfm)
        .use(listener)
        .create();

    if (onMount) {
        onMount(editor);
    }

    return {
        editor,
        destroy: () => {
            // Milkdown handles destruction differently or via rootCtx
        },
    };
}

export type WysiwygEditorInstance = Awaited<ReturnType<typeof createWysiwygEditor>>;
