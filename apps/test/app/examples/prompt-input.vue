<script setup lang="ts">
import type { ChatStatus } from 'ai'

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
import { ref } from 'vue'

const status = ref<ChatStatus | undefined>(undefined)

function onSubmit(e: Event) {
  e.preventDefault()
  status.value = 'submitted'
  setTimeout(() => {
    status.value = undefined
  }, 800)
}
</script>

<template>
  <PromptInput @submit="onSubmit">
    <div class="p-1">
      <PromptInputTextarea placeholder="Ask something..." />
    </div>
    <PromptInputToolbar>
      <PromptInputTools>
        <PromptInputModelSelect>
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue placeholder="Select model" />
          </PromptInputModelSelectTrigger>
          <PromptInputModelSelectContent>
            <PromptInputModelSelectItem value="gpt-4o">
              gpt-4o
            </PromptInputModelSelectItem>
            <PromptInputModelSelectItem value="claude-3.7">
              claude-3.7
            </PromptInputModelSelectItem>
          </PromptInputModelSelectContent>
        </PromptInputModelSelect>
      </PromptInputTools>

      <div class="flex items-center gap-2">
        <PromptInputButton type="button">
          Attach
        </PromptInputButton>
        <PromptInputSubmit :status="status" />
      </div>
    </PromptInputToolbar>
  </PromptInput>
</template>
