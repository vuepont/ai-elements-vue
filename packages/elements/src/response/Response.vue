<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'
import { computed, useAttrs, useSlots } from 'vue'
import 'katex/dist/katex.min.css'

interface Props {
  content?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()
const slots = useSlots()

const classes = computed(() =>
  cn(
    'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
    attrs.class || '',
  ),
)

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
</script>

<template>
  <StreamMarkdown :class="classes" :content="md" />
</template>
