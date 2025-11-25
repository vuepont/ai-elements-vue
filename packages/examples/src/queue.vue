<script setup lang="ts">
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from '@repo/elements/queue'
import { ArrowUp, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

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

const sampleMessages: QueueMessage[] = [
  {
    id: 'msg-1',
    parts: [{ type: 'text', text: 'How do I set up the project?' }],
  },
  {
    id: 'msg-2',
    parts: [{ type: 'text', text: 'What is the roadmap for Q4?' }],
  },
  {
    id: 'msg-3',
    parts: [{ type: 'text', text: 'Update the default logo to this png.' }, {
      type: 'file',
      url: 'https://github.com/peoray.png',
      filename: 'setup-guide.png',
      mediaType: 'image/png',
    }],
  },
  {
    id: 'msg-4',
    parts: [{ type: 'text', text: 'Please generate a changelog.' }],
  },
  {
    id: 'msg-5',
    parts: [{ type: 'text', text: 'Add dark mode support.' }],
  },
  {
    id: 'msg-6',
    parts: [{ type: 'text', text: 'Optimize database queries.' }],
  },
  {
    id: 'msg-7',
    parts: [{ type: 'text', text: 'Set up CI/CD pipeline.' }],
  },
]

const sampleTodos: QueueTodo[] = [
  {
    id: 'todo-1',
    title: 'Write project documentation',
    description: 'Complete the README and API docs',
    status: 'completed',
  },
  {
    id: 'todo-2',
    title: 'Implement authentication',
    status: 'pending',
  },
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

const messages = ref<QueueMessage[]>(sampleMessages)
const todos = ref<QueueTodo[]>(sampleTodos)

function handleRemoveMessage(id: string) {
  messages.value = messages.value.filter(msg => msg.id !== id)
}

function handleRemoveTodo(id: string) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function handleSendNow(id: string) {
  // eslint-disable-next-line no-console
  console.log('Send now:', id)
  handleRemoveMessage(id)
}

const hasQueue = computed(() => messages.value.length > 0 || todos.value.length > 0)
</script>

<template>
  <Queue v-if="hasQueue">
    <!-- Queued Messages Section -->
    <QueueSection v-if="messages.length > 0">
      <QueueSectionTrigger>
        <QueueSectionLabel :count="messages.length" label="Queued" />
      </QueueSectionTrigger>

      <QueueSectionContent>
        <QueueList>
          <QueueItem
            v-for="message in messages"
            :key="message.id"
          >
            <div class="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>
                {{
                  message.parts
                    .filter((p) => p.type === 'text')
                    .map((p) => p.text)
                    .join(' ')
                    .trim() || '(queued message)'
                }}
              </QueueItemContent>

              <QueueItemActions>
                <QueueItemAction
                  aria-label="Remove from queue"
                  title="Remove from queue"
                  @click.stop="handleRemoveMessage(message.id)"
                >
                  <Trash2 :size="12" />
                </QueueItemAction>

                <QueueItemAction
                  aria-label="Send now"
                  @click.stop="handleSendNow(message.id)"
                >
                  <ArrowUp :size="14" />
                </QueueItemAction>
              </QueueItemActions>
            </div>

            <QueueItemAttachment v-if="message.parts.some((p) => p.type === 'file' && p.url)">
              <template
                v-for="file in message.parts.filter((p) => p.type === 'file' && p.url)"
                :key="file.url"
              >
                <QueueItemImage
                  v-if="file.mediaType?.startsWith('image/')"
                  :src="file.url"
                  :alt="file.filename || 'attachment'"
                />
                <QueueItemFile v-else>
                  {{ file.filename || 'file' }}
                </QueueItemFile>
              </template>
            </QueueItemAttachment>
          </QueueItem>
        </QueueList>
      </QueueSectionContent>
    </QueueSection>

    <!-- Todos Section -->
    <QueueSection v-if="todos.length > 0">
      <QueueSectionTrigger>
        <QueueSectionLabel :count="todos.length" label="Todo" />
      </QueueSectionTrigger>

      <QueueSectionContent>
        <QueueList>
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
        </QueueList>
      </QueueSectionContent>
    </QueueSection>
  </Queue>
</template>
