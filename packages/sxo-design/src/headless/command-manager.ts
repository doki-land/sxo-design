/**
 * 命令面板逻辑：处理全局快捷键与指令注册
 */
export interface Command {
    id: string;
    title: string;
    description?: string;
    shortcut?: string;
    action: () => void;
    category?: string;
}

export function useCommandManager() {
    let commands: Command[] = [];
    const listeners = new Set<() => void>();

    const notify = () => listeners.forEach((l) => l());

    const handleKeyDown = (e: KeyboardEvent) => {
        commands.forEach((cmd) => {
            if (
                cmd.shortcut &&
                e.key.toLowerCase() === cmd.shortcut.toLowerCase() &&
                (e.ctrlKey || e.metaKey)
            ) {
                e.preventDefault();
                cmd.action();
            }
        });
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
    }

    return {
        register: (cmd: Command) => {
            commands = [...commands, cmd];
            notify();
            return () => {
                commands = commands.filter((c) => c.id !== cmd.id);
                notify();
            };
        },
        getCommands: (query: string = '') => {
            if (!query) return commands;
            return commands.filter(
                (c) =>
                    c.title.toLowerCase().includes(query.toLowerCase()) ||
                    c.category?.toLowerCase().includes(query.toLowerCase()),
            );
        },
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => listeners.delete(l);
        },
        cleanup: () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', handleKeyDown);
            }
        },
    };
}
