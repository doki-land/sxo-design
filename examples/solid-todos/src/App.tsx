/** @jsxImportSource solid-js */
import { pornhubTheme } from '@sxo/theme-pornhub';
import { createSignal, For, Show } from 'solid-js';
import { Button, Input, Tag, ThemeProvider } from 'solid-sxo';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App = () => {
    const [todos, setTodos] = createSignal<Todo[]>([]);
    const [inputValue, setInputValue] = createSignal('');

    const addTodo = () => {
        if (inputValue().trim()) {
            setTodos([...todos(), { id: Date.now(), text: inputValue(), completed: false }]);
            setInputValue('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos().map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos().filter((todo) => todo.id !== id));
    };

    return (
        <ThemeProvider theme={{ tokens: pornhubTheme }}>
            <div class="min-h-screen bg-background-primary text-neutral-0 p-8 font-sans">
                <div class="max-w-md mx-auto">
                    <header class="mb-12 flex items-center justify-between">
                        <h1 class="text-4xl font-bold italic tracking-tighter">
                            SXO
                            <span class="bg-primary text-background-primary px-2 py-1 rounded-sm ml-1">
                                HUB
                            </span>
                            <span class="ml-2 text-2xl not-italic font-normal text-neutral-400">
                                SOLID
                            </span>
                        </h1>
                        <Tag variant="solid" color="primary">
                            Premium
                        </Tag>
                    </header>

                    <main class="space-y-6">
                        <div class="flex gap-2 bg-background-secondary p-4 rounded-md border border-neutral-800 shadow-hard">
                            <Input
                                value={inputValue()}
                                onInput={(e: any) => setInputValue(e.currentTarget.value)}
                                placeholder="What's next?"
                                class="flex-1 bg-neutral-900 border-neutral-700 focus:border-primary text-white"
                                onKeyDown={(e: any) => e.key === 'Enter' && addTodo()}
                            />
                            <Button variant="primary" onClick={addTodo}>
                                Add
                            </Button>
                        </div>

                        <div class="space-y-3">
                            <Show
                                when={todos().length > 0}
                                fallback={
                                    <div class="text-center py-12 text-neutral-500 italic">
                                        No todos yet. Start your journey!
                                    </div>
                                }
                            >
                                <For each={todos()}>
                                    {(todo) => (
                                        <div class="flex items-center justify-between bg-background-secondary p-4 rounded-md border border-neutral-800 hover:border-neutral-600 transition-all group">
                                            <div class="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => toggleTodo(todo.id)}
                                                    class="w-5 h-5 accent-primary cursor-pointer"
                                                />
                                                <span
                                                    class={`${todo.completed ? 'line-through text-neutral-600' : 'text-neutral-100'} font-medium`}
                                                >
                                                    {todo.text}
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <Show when={todo.completed}>
                                                    <Tag
                                                        variant="solid"
                                                        color="secondary"
                                                        class="scale-75"
                                                    >
                                                        Done
                                                    </Tag>
                                                </Show>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    class="p-2 text-neutral-500 hover:text-error transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </Show>
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    ) as any;
};

export default App;
