<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { PromptInputMessage } from '@repo/elements/prompt-input/'
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from '@repo/elements/model-selector'
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
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
import { CheckIcon, GlobeIcon, Trash2Icon } from 'lucide-vue-next'
import { computed, onBeforeUnmount, ref } from 'vue'
import PromptInputAttachmentsDisplay from './prompt-input-attachments-display.vue'

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

const models = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure'],
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure'],
  },
  {
    id: 'claude-opus-4-20250514',
    name: 'Claude 4 Opus',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude 4 Sonnet',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    chef: 'Google',
    chefSlug: 'google',
    providers: ['google'],
  },
]

const SUBMITTING_TIMEOUT = 200
const STREAMING_TIMEOUT = 2000

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

const todos = ref<QueueTodo[]>(sampleTodos)
const modelId = ref<string>(models[0].id)
const modelSelectorOpen = ref(false)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')

const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)

const selectedModelData = computed(() => models.find(m => m.id === modelId.value))

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

function handleSubmit(message: PromptInputMessage) {
  // If currently streaming or submitted, stop instead of submitting
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

onBeforeUnmount(() => {
  if (timeoutRef.value)
    clearTimeout(timeoutRef.value)
})
</script>

<template>
  <div class="flex size-full flex-col justify-end">
    <Queue class="mx-auto max-h-[150px] w-[95%] overflow-y-auto rounded-b-none border-b-0 border-input">
      <QueueSection v-if="todos.length > 0">
        <QueueSectionContent>
          <div>
            <QueueItem v-for="todo in todos" :key="todo.id">
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
                    <Trash2Icon :size="12" />
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

    <PromptInput
      global-drop
      multiple
      @submit="handleSubmit"
    >
      <PromptInputHeader>
        <PromptInputAttachmentsDisplay />
      </PromptInputHeader>

      <PromptInputBody>
        <PromptInputTextarea />
      </PromptInputBody>

      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>

          <PromptInputButton>
            <GlobeIcon :size="16" />
            <span>Search</span>
          </PromptInputButton>

          <ModelSelector v-model:open="modelSelectorOpen">
            <ModelSelectorTrigger as-child>
              <PromptInputButton>
                <ModelSelectorLogo
                  v-if="selectedModelData?.chefSlug"
                  :provider="selectedModelData.chefSlug"
                />
                <ModelSelectorName v-if="selectedModelData?.name">
                  {{ selectedModelData.name }}
                </ModelSelectorName>
              </PromptInputButton>
            </ModelSelectorTrigger>

            <ModelSelectorContent>
              <ModelSelectorInput placeholder="Search models..." />
              <ModelSelectorList>
                <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

                <ModelSelectorGroup
                  v-for="chef in ['OpenAI', 'Anthropic', 'Google']"
                  :key="chef"
                  :heading="chef"
                >
                  <ModelSelectorItem
                    v-for="m in models.filter((item) => item.chef === chef)"
                    :key="m.id"
                    :value="m.id"
                    @select="() => {
                      modelId = m.id;
                      modelSelectorOpen = false;
                    }"
                  >
                    <ModelSelectorLogo :provider="m.chefSlug" />
                    <ModelSelectorName>{{ m.name }}</ModelSelectorName>

                    <ModelSelectorLogoGroup>
                      <ModelSelectorLogo
                        v-for="provider in m.providers"
                        :key="provider"
                        :provider="provider"
                      />
                    </ModelSelectorLogoGroup>

                    <CheckIcon v-if="modelId === m.id" class="ml-auto size-4" />
                    <div v-else class="ml-auto size-4" />
                  </ModelSelectorItem>
                </ModelSelectorGroup>
              </ModelSelectorList>
            </ModelSelectorContent>
          </ModelSelector>
        </PromptInputTools>

        <PromptInputSubmit :status="status" />
      </PromptInputFooter>
    </PromptInput>
  </div>
</template>
