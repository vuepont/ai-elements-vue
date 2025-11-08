<script setup lang="ts">
import { Input } from '@repo/shadcn-vue/components/ui/input'
import { ref, useAttrs, watch } from 'vue'
import { useWebPreviewContext } from './context'

const props = withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Enter URL...',
  },
)

const attrs = useAttrs()
const context = useWebPreviewContext()

const inputValue = ref(context.url.value)

watch(
  () => context.url.value,
  (value) => {
    inputValue.value = value
  },
)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    context.setUrl(inputValue.value)
  }
}
</script>

<template>
  <Input
    class="h-8 flex-1 text-sm"
    :placeholder="props.placeholder"
    :value="inputValue"
    v-bind="attrs"
    @input="handleInput"
    @keydown="handleKeydown"
  />
</template>
