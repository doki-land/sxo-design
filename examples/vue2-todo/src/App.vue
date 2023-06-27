<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Box, Feedback } from 'vue2-sxo';

const { Spinner } = Feedback;

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const todos = ref<Todo[]>([]);
const inputValue = ref('');
const loading = ref(false);

const addTodo = () => {
    if (inputValue.value.trim()) {
        todos.value.push({
            id: Date.now(),
            text: inputValue.value,
            completed: false,
        });
        inputValue.value = '';
    }
};

const toggleTodo = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
};

const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((t) => t.id !== id);
};
</script>

<template>
  <Box class="min-h-screen bg-background-primary text-neutral-0 p-8 font-sans">
    <div class="max-w-md mx-auto">
      <header class="mb-12 flex items-center justify-between">
        <h1 class="text-4xl font-bold italic tracking-tighter">
          SXO<span class="bg-primary text-background-primary px-2 py-1 rounded-sm ml-1">HUB</span>
          <span class="ml-2 text-2xl not-italic font-normal text-neutral-400">VUE 2</span>
        </h1>
        <div class="bg-primary text-background-primary px-2 py-1 rounded text-xs font-bold">PREMIUM</div>
      </header>

      <main class="space-y-6">
        <div class="flex gap-2 bg-background-secondary p-4 rounded-md border border-neutral-800 shadow-lg">
          <Input 
            :value="inputValue"
            @input="v => inputValue = v"
            placeholder="What's next?"
            class="flex-1 bg-neutral-900 border-neutral-700 focus:border-primary text-white"
            @keydown.native.enter="addTodo"
          />
          <Button variant="primary" @click="addTodo">Add</Button>
        </div>

        <div class="space-y-3">
          <div v-if="todos.length === 0" class="text-center py-12 text-neutral-500 italic">
            No todos yet. Start your journey!
          </div>
          <div 
            v-for="todo in todos" 
            :key="todo.id"
            class="flex items-center justify-between bg-background-secondary p-4 rounded-md border border-neutral-800 hover:border-neutral-600 transition-all group"
          >
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                :checked="todo.completed"
                @change="toggleTodo(todo.id)"
                class="w-5 h-5 accent-primary cursor-pointer"
              />
              <span :class="[todo.completed ? 'line-through text-neutral-600' : 'text-neutral-100', 'font-medium']">
                {{ todo.text }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="deleteTodo(todo.id)"
                class="text-neutral-600 hover:text-red-500 transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer class="mt-12 pt-6 border-t border-neutral-900 text-center text-xs text-neutral-600">
        &copy; 2026 SXO HUB. Powered by Vue 2. Professional Todo Management.
      </footer>
    </div>
  </Box>
</template>

<style>
/* 简单样式补偿，实际由 SXO Engine 处理 */
.bg-background-primary { background-color: var(--sxo-colors-background-primary, #000); }
.bg-background-secondary { background-color: var(--sxo-colors-background-secondary, #1a1a1a); }
.bg-primary { background-color: var(--sxo-colors-primary, #ff9900); }
.text-primary { color: var(--sxo-colors-primary, #ff9900); }
.text-neutral-0 { color: #fff; }
.text-neutral-100 { color: #f5f5f5; }
.text-neutral-400 { color: #a3a3a3; }
.text-neutral-500 { color: #737373; }
.text-neutral-600 { color: #525252; }
.border-neutral-700 { border-color: #404040; }
.border-neutral-800 { border-color: #262626; }
.border-neutral-900 { border-color: #171717; }
</style>
