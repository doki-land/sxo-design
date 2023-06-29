import { pornhubTheme } from '@sxo/theme-pornhub';
import type React from 'react';
import { useState } from 'react';
import { Button, Input, Tag, ThemeProvider } from 'react-sxo';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <ThemeProvider tokens={pornhubTheme}>
            <div className="min-h-screen bg-background-primary text-neutral-0 p-8 font-sans">
                <div className="max-w-md mx-auto">
                    <header className="mb-12 flex items-center justify-between">
                        <h1 className="text-4xl font-bold italic tracking-tighter">
                            SXO
                            <span className="bg-primary text-background-primary px-2 py-1 rounded-sm ml-1">
                                HUB
                            </span>
                            <span className="ml-2 text-2xl not-italic font-normal text-neutral-400">
                                TODOS
                            </span>
                        </h1>
                        <Tag variant="solid" color="primary">
                            Premium
                        </Tag>
                    </header>

                    <main className="space-y-6">
                        <div className="flex gap-2 bg-background-secondary p-4 rounded-md border border-neutral-800 shadow-hard">
                            <Input
                                value={inputValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setInputValue(e.target.value)
                                }
                                placeholder="What's next?"
                                className="flex-1 bg-neutral-900 border-neutral-700 focus:border-primary text-white"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                    e.key === 'Enter' && addTodo()
                                }
                            />
                            <Button variant="primary" onClick={addTodo}>
                                Add
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {todos.length === 0 ? (
                                <div className="text-center py-12 text-neutral-500 italic">
                                    No todos yet. Start your journey!
                                </div>
                            ) : (
                                todos.map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex items-center justify-between bg-background-secondary p-4 rounded-md border border-neutral-800 hover:border-neutral-600 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleTodo(todo.id)}
                                                className="w-5 h-5 accent-primary cursor-pointer"
                                            />
                                            <span
                                                className={`${todo.completed ? 'line-through text-neutral-600' : 'text-neutral-100'} font-medium`}
                                            >
                                                {todo.text}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {todo.completed && (
                                                <Tag
                                                    variant="solid"
                                                    color="secondary"
                                                    className="scale-75"
                                                >
                                                    Done
                                                </Tag>
                                            )}
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="text-neutral-600 hover:text-error transition-colors p-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </main>

                    <footer className="mt-12 pt-6 border-t border-neutral-900 text-center text-xs text-neutral-600">
                        &copy; 2026 SXO HUB. All rights reserved. Professional Todo Management.
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
