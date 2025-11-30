<script setup lang="ts">
import type { PromptInputMessage } from './types'
import { usePromptInputProvider } from './context'

const props = defineProps<{
  initialInput?: string
  maxFiles?: number
  maxFileSize?: number
  accept?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: PromptInputMessage): void
  (e: 'error', payload: { code: string, message: string }): void
}>()

usePromptInputProvider({
  initialInput: props.initialInput,
  maxFiles: props.maxFiles,
  maxFileSize: props.maxFileSize,
  accept: props.accept,
  onSubmit: msg => emit('submit', msg),
  onError: err => emit('error', err),
})
</script>

<template>
  <slot />
</template>
