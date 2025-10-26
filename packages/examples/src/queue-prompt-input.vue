<!-- eslint-disable no-console -->
<script setup lang="ts">
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@repo/elements/prompt-input'

import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueSection,
  QueueSectionContent,

} from '@repo/elements/queue'
import { Globe, Mic, Plus, Send, Trash2 } from 'lucide-vue-next'
import { onBeforeUnmount, ref } from 'vue'

export interface QueueMessagePart {
  type: string
  text?: string
  url?: string
  filename?: string
  mediaType?: string
}

export interface QueueMessage {
  id: string
  parts: QueueMessagePart[]
}

export interface QueueTodo {
  id: string
  title: string
  description?: string
  status?: 'pending' | 'completed'
}

// ---- Constants ----
const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'claude-instant', name: 'Claude Instant' },
  { id: 'palm-2', name: 'PaLM 2' },
  { id: 'llama-2-70b', name: 'Llama 2 70B' },
  { id: 'llama-2-13b', name: 'Llama 2 13B' },
  { id: 'cohere-command', name: 'Command' },
  { id: 'mistral-7b', name: 'Mistral 7B' },
]

const SUBMITTING_TIMEOUT = 200
const STREAMING_TIMEOUT = 2000

// ---- Sample Data ----
const sampleTodos: QueueTodo[] = [
  {
    id: 'todo-1',
    title: 'Write project documentation',
    description: 'Complete the README and API docs',
    status: 'completed',
  },
  { id: 'todo-2', title: 'Implement authentication', status: 'pending' },
  {
    id: 'todo-3',
    title: 'Fix bug #42',
    description: 'Resolve crash on settings page',
    status: 'pending',
  },
  {
    id: 'todo-4',
    title: 'Refactor queue logic',
    description: 'Unify queue and todo state management',
    status: 'pending',
  },
  {
    id: 'todo-5',
    title: 'Add unit tests',
    description: 'Increase test coverage for hooks',
    status: 'pending',
  },
]

// ---- Reactive State ----
const todos = ref<QueueTodo[]>(sampleTodos)
const text = ref('')
const defaultModel = ref(models[0].id)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// ---- Methods ----
function handleRemoveTodo(id: string) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function stop() {
  console.log('Stopping request...')
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value)
    timeoutRef.value = null
  }
  status.value = 'ready'
}

function handleSubmit(message: any) {
  if (status.value === 'streaming' || status.value === 'submitted') {
    stop()
    return
  }

  const hasText = !!message.text
  const hasAttachments = !!message.files?.length
  if (!(hasText || hasAttachments))
    return

  status.value = 'submitted'
  console.log('Submitting message:', message)

  setTimeout(() => {
    status.value = 'streaming'
  }, SUBMITTING_TIMEOUT)

  timeoutRef.value = setTimeout(() => {
    status.value = 'ready'
    timeoutRef.value = null
  }, STREAMING_TIMEOUT)
}

// ---- Cleanup ----
onBeforeUnmount(() => {
  if (timeoutRef.value)
    clearTimeout(timeoutRef.value)
})
</script>

<template>
  <div class="flex flex-col justify-end size-full">
    <!-- Queue Section -->
    <Queue class="max-h-[150px] w-[95%] border-input mx-auto overflow-y-auto rounded-b-none border-b-0">
      <QueueSection v-if="todos.length > 0">
        <QueueSectionContent>
          <div>
            <QueueItem
              v-for="todo in todos"
              :key="todo.id"
            >
              <div class="flex items-center gap-2">
                <QueueItemIndicator :completed="todo.status === 'completed'" />
                <QueueItemContent :completed="todo.status === 'completed'">
                  {{ todo.title }}
                </QueueItemContent>
                <QueueItemActions>
                  <QueueItemAction
                    aria-label="Remove todo"
                    @click="handleRemoveTodo(todo.id)"
                  >
                    <Trash2 :size="12" />
                  </QueueItemAction>
                </QueueItemActions>
              </div>
              <QueueItemDescription
                v-if="todo.description"
                :completed="todo.status === 'completed'"
              >
                {{ todo.description }}
              </QueueItemDescription>
            </QueueItem>
          </div>
        </QueueSectionContent>
      </QueueSection>
    </Queue>

    <!-- Prompt Input -->
    <PromptInput @submit="handleSubmit">
      <PromptInputTextarea ref="textareaRef" v-model="text" placeholder="Ask me about anything..." />

      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <Plus class="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <Mic class="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <Globe class="size-4" />
            <span>Search</span>
          </PromptInputButton>

          <PromptInputModelSelect v-model="defaultModel">
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              <PromptInputModelSelectItem
                v-for="model in models"
                :key="model.id"
                :value="model.id"
              >
                {{ model.name }}
              </PromptInputModelSelectItem>
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>

        <PromptInputSubmit :disabled="!text" :status="status">
          <Send :size="32" />
        </PromptInputSubmit>
      </PromptInputToolbar>
    </PromptInput>
  </div>
</template>
