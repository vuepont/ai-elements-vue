<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '@repo/shadcn-vue/components/ui/input'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ref, useAttrs, watch } from 'vue'
import { useWebPreviewContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter URL...',
})

const attrs = useAttrs()
const context = useWebPreviewContext()

const inputValue = ref(context.url.value)

watch(
  () => context.url.value,
  (value) => {
    inputValue.value = value
  },
  { immediate: true },
)

function handleKeydown() {
  context.setUrl(inputValue.value)
}
</script>

<template>
  <Input
    v-model="inputValue"
    data-testid="web-preview-url-input"
    :class="cn('h-8 flex-1 text-sm', props.class)"
    :placeholder="props.placeholder"
    v-bind="attrs"
    @keydown.enter="handleKeydown"
  />
</template>
