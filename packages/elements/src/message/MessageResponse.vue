<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'
import { computed, useSlots } from 'vue'

interface Props {
  content?: string
  /**
   * The color mode for syntax highlighting in code blocks.
   * @default 'light'
   */
  codeBlockMode?: 'light' | 'dark'
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()

const slots = useSlots()
const slotContent = computed<string | undefined>(() => {
  const nodes = slots.default?.() || []
  let text = ''
  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children
  }
  return text || undefined
})

const md = computed(() => (slotContent.value ?? props.content ?? '') as string)

const shikiTheme = computed(() => props.codeBlockMode === 'dark' ? 'github-dark' : 'github-light')
</script>

<template>
  <StreamMarkdown
    :shiki-theme="shikiTheme"
    :content="md"
    :class="
      cn(
        'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        props.class,
      )
    "
    v-bind="$attrs"
  />
</template>
