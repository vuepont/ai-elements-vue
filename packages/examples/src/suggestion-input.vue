<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { PromptInputMessage } from '@repo/elements/prompt-input'
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@repo/elements/prompt-input'
import { Suggestion, Suggestions } from '@repo/elements/suggestion'
import { GlobeIcon, MicIcon, PlusIcon, SendIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const status = ref<Status>('ready')
type Status = 'submitted' | 'streaming' | 'ready' | 'error'

const suggestions = [
  { key: nanoid(), value: 'What are the latest trends in AI?' },
  { key: nanoid(), value: 'How does machine learning work?' },
  { key: nanoid(), value: 'Explain quantum computing' },
  { key: nanoid(), value: 'Best practices for React development' },
  { key: nanoid(), value: 'Tell me about TypeScript benefits' },
  { key: nanoid(), value: 'How to optimize database queries?' },
  { key: nanoid(), value: 'What is the difference between SQL and NoSQL?' },
  { key: nanoid(), value: 'Explain cloud computing basics' },
]

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

const defaultModel = ref(models[0].id)
const text = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleSubmit(message: PromptInputMessage) {
  const hasText = !!message.text
  const hasAttachments = !!(message.files?.length)

  if (!(hasText || hasAttachments))
    return

  console.log('Submitted message:', message.text || 'Sent with attachments')
  console.log('Attached files:', message.files)
}

function handleSuggestionClick(suggestion: string) {
  text.value = suggestion
}
</script>

<template>
  <div class="grid gap-4">
    <Suggestions>
      <Suggestion
        v-for="suggestion in suggestions"
        :key="suggestion.key"
        :suggestion="suggestion.value"
        @click="handleSuggestionClick(suggestion.value)"
      />
    </Suggestions>

    <!-- <PromptInputProvider @submit="handleSubmit"> -->
    <PromptInput @submit="handleSubmit">
      <PromptInputTextarea ref="textareaRef" v-model="text" placeholder="Ask me about anything..." />

      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputButton>
            <PlusIcon class="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <MicIcon class="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <GlobeIcon class="size-4" />
            <span>Search</span>
          </PromptInputButton>

          <PromptInputSelect v-model="defaultModel">
            <PromptInputSelectTrigger>
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              <PromptInputSelectItem
                v-for="model in models"
                :key="model.id"
                :value="model.id"
              >
                {{ model.name }}
              </PromptInputSelectItem>
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>

        <PromptInputSubmit :disabled="!text" :status="status">
          <SendIcon :size="32" />
        </PromptInputSubmit>
      </PromptInputFooter>
    </PromptInput>
    <!-- </PromptInputProvider> -->
  </div>
</template>
