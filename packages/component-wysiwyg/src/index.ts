import { Editor, rootCtx, defaultValueCtx, editorViewCtx, parserCtx } from '@milkdown/core';
import {
    commonmark,
    toggleStrongCommand,
    toggleEmphasisCommand,
    wrapInBulletListCommand,
    wrapInBlockquoteCommand,
} from '@milkdown/preset-commonmark';
import { gfm, insertTableCommand } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { replaceAll } from '@milkdown/utils';
import { callCommand } from '@milkdown/utils';

export interface WysiwygEditorOptions {
    defaultValue?: string;
    onChange?: (markdown: string) => void;
    onMount?: (editor: Editor) => void;
}

export async function createWysiwygEditor(
    container: HTMLElement,
    options: WysiwygEditorOptions = {},
) {
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
        setValue: (markdown: string) => {
            editor.action(replaceAll(markdown));
        },
        runCommand: (command: string) => {
            switch (command) {
                case 'bold':
                    editor.action(callCommand(toggleStrongCommand.key));
                    break;
                case 'italic':
                    editor.action(callCommand(toggleEmphasisCommand.key));
                    break;
                case 'bullet_list':
                    editor.action(callCommand(wrapInBulletListCommand.key));
                    break;
                case 'blockquote':
                    editor.action(callCommand(wrapInBlockquoteCommand.key));
                    break;
                case 'table':
                    editor.action(callCommand(insertTableCommand.key));
                    break;
            }
        },
        destroy: () => {
            const view = editor.action((ctx) => ctx.get(editorViewCtx));
            if (view) view.destroy();
        },
    };
}

/**
 * 将 Markdown 渲染为 HTML (仅支持基础语法)
 */
export function renderMarkdown(markdown: string): string {
    // 这里如果想用 milkdown 的 parser 比较复杂，因为它需要一个实例。
    // 为了简单且高性能，我们这里先用一个基础的正则替换，
    // 或者用户可以直接在组件内使用 milkdown 的 readonly 模式作为预览。
    // 这里提供一个极简的实现，推荐在组件层使用更专业的库。
    return markdown
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
}

export type WysiwygEditorInstance = Awaited<ReturnType<typeof createWysiwygEditor>>;
