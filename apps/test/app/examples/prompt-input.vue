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
import { Globe, Mic, Plus } from 'lucide-vue-next'
import { ref } from 'vue'

type Status = 'submitted' | 'streaming' | 'ready' | 'error'

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

const text = ref('')
const model = ref(models[0]!.id)
const status = ref<Status>('ready')

function onSubmit(event: Event) {
  event.preventDefault()
  if (!text.value)
    return

  status.value = 'submitted'

  setTimeout(() => {
    status.value = 'streaming'
  }, 200)

  setTimeout(() => {
    status.value = 'ready'
  }, 2000)
}
</script>

<template>
  <PromptInput @submit="onSubmit">
    <PromptInputTextarea v-model="text" />

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

        <PromptInputModelSelect v-model="model">
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue />
          </PromptInputModelSelectTrigger>
          <PromptInputModelSelectContent>
            <PromptInputModelSelectItem
              v-for="m in models"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }}
            </PromptInputModelSelectItem>
          </PromptInputModelSelectContent>
        </PromptInputModelSelect>
      </PromptInputTools>

      <PromptInputSubmit :disabled="!text" :status="status" />
    </PromptInputToolbar>
  </PromptInput>
</template>
