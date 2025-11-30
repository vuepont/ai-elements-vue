<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroup } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePromptInput } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
  accept?: string
  multiple?: boolean
  globalDrop?: boolean
  maxFiles?: number
  maxFileSize?: number
  initialInput?: string
}>()

const formRef = ref<HTMLFormElement | null>(null)

const { fileInputRef, addFiles, submitForm } = usePromptInput()

function handleDragOver(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) {
    e.preventDefault()
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) {
    e.preventDefault()
  }
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    addFiles(e.dataTransfer.files)
  }
}

onMounted(() => {
  if (props.globalDrop) {
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)
  }
})

onUnmounted(() => {
  if (props.globalDrop) {
    document.removeEventListener('dragover', handleDragOver)
    document.removeEventListener('drop', handleDrop)
  }
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) {
    addFiles(input.files)
  }
  input.value = ''
}

function onSubmit(e: Event) {
  e.preventDefault()
  submitForm()
}
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    >
    <form
      ref="formRef"
      :class="cn('w-full', props.class)"
      @submit="onSubmit"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
    >
      <InputGroup class="overflow-hidden">
        <slot />
      </InputGroup>
    </form>
  </div>
</template>
