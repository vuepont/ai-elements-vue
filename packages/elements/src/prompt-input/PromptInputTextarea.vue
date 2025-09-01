<script setup lang="ts">
import { Textarea } from '@repo/shadcn-vue/components/ui/textarea'
import { computed, useAttrs } from 'vue'

interface Props {
  class?: string
  placeholder?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()

const placeholder = props.placeholder ?? 'What would you like to know?'

const classes = computed(() => [
  'w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0',
  'field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent',
  'focus-visible:ring-0',
  props.class,
])

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if ((e as any).nativeEvent?.isComposing)
      return
    if (e.shiftKey)
      return
    e.preventDefault()
    const form = (e.target as HTMLTextAreaElement).form
    form?.requestSubmit()
  }
}
</script>

<template>
  <Textarea
    :class="classes"
    name="message"
    :placeholder="placeholder"
    v-bind="attrs"
    @keydown="handleKeyDown"
  />
</template>
