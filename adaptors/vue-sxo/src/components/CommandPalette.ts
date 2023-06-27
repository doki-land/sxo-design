import { useCommandManager, useDisclosure, type Command } from '@sxo/design';
import { defineComponent, h, ref, watch, onMounted, onUnmounted, type PropType } from 'vue';
import { Dialog as SxoDialog } from './Dialog';
import { Input as SxoInput } from './Input';

export const CommandPalette = defineComponent({
    name: 'SxoCommandPalette',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        commands: {
            type: Array as PropType<Command[]>,
            default: () => [],
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const manager = useCommandManager();
        const query = ref('');
        const filteredCommands = ref<Command[]>([]);

        onMounted(() => {
            props.commands.forEach((cmd) => manager.register(cmd));
            filteredCommands.value = manager.getCommands();
        });

        onUnmounted(() => {
            manager.cleanup();
        });

        watch(query, (newQuery) => {
            filteredCommands.value = manager.getCommands(newQuery);
        });

        const handleAction = (cmd: Command) => {
            cmd.action();
            emit('close');
        };

        return () =>
            h(
                SxoDialog,
                {
                    isOpen: props.isOpen,
                    onClose: () => emit('close'),
                    size: 'md',
                    isCentered: true,
                    class: 'command-palette-dialog',
                },
                {
                    default: () =>
                        h('div', { class: 'flex flex-col gap-4' }, [
                            h(SxoInput, {
                                modelValue: query.value,
                                'onUpdate:modelValue': (val: string) => (query.value = val),
                                placeholder: 'Type a command or search...',
                                class: 'text-lg',
                                autofocus: true,
                            }),
                            h(
                                'div',
                                { class: 'max-h-80 overflow-y-auto' },
                                filteredCommands.value.length > 0
                                    ? filteredCommands.value.map((cmd) =>
                                          h(
                                              'div',
                                              {
                                                  key: cmd.id,
                                                  onClick: () => handleAction(cmd),
                                                  class: 'flex items-center justify-between p-3 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors',
                                              },
                                              [
                                                  h('div', [
                                                      h('div', { class: 'font-medium' }, cmd.title),
                                                      cmd.description &&
                                                          h(
                                                              'div',
                                                              { class: 'text-xs opacity-50' },
                                                              cmd.description,
                                                          ),
                                                  ]),
                                                  cmd.shortcut &&
                                                      h(
                                                          'kbd',
                                                          {
                                                              class: 'px-2 py-1 text-[10px] font-mono bg-neutral-200 rounded border border-neutral-300',
                                                          },
                                                          cmd.shortcut,
                                                      ),
                                              ],
                                          ),
                                      )
                                    : h(
                                          'div',
                                          { class: 'p-8 text-center opacity-40' },
                                          'No commands found',
                                      ),
                            ),
                        ]),
                },
            );
    },
});
