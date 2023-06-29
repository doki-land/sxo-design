import { type Command, useCommandManager } from '@sxo/design';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Dialog } from './Dialog';
import { Input } from './Input';

export interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    commands?: Command[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
    isOpen,
    onClose,
    commands: initialCommands = [],
}) => {
    const manager = useCommandManager();
    const [query, setQuery] = useState('');
    const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);

    // 注册初始命令并订阅管理器更新
    useEffect(() => {
        const unregisters = initialCommands.map((cmd) => manager.register(cmd));

        const updateCommands = () => {
            setFilteredCommands(manager.getCommands(query));
        };

        const unsubscribe = manager.subscribe(updateCommands);
        updateCommands();

        return () => {
            unregisters.forEach((unreg) => {
                unreg();
            });
            unsubscribe();
        };
    }, [initialCommands, manager, query]);

    // 响应查询变化
    useEffect(() => {
        setFilteredCommands(manager.getCommands(query));
    }, [query, manager]);

    const handleAction = (cmd: Command) => {
        cmd.action();
        onClose();
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <div className="flex flex-col gap-4">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="text-lg"
                    autoFocus
                />
                <div className="max-h-80 overflow-y-auto">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd) => (
                            <div
                                key={cmd.id}
                                onClick={() => handleAction(cmd)}
                                className="flex items-center justify-between p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                            >
                                <div>
                                    <div className="font-medium">{cmd.title}</div>
                                    {cmd.description && (
                                        <div className="text-xs opacity-50">{cmd.description}</div>
                                    )}
                                </div>
                                {cmd.shortcut && (
                                    <kbd className="px-2 py-1 text-[10px] font-mono bg-neutral-200 dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                                        {cmd.shortcut}
                                    </kbd>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center opacity-40">No commands found</div>
                    )}
                </div>
            </div>
        </Dialog>
    );
};
