<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

interface Props {
  class?: HTMLAttributes['class']
  value: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const context = inject(VOICE_SELECTOR_CONTEXT_KEY)

function handleSelect() {
  context?.setValue(props.value)
  emit('select', props.value)
}
</script>

<template>
  <CommandItem
    :class="cn('px-4 py-2', props.class)"
    :value="value"
    v-bind="$attrs"
    @select="handleSelect"
  >
    <slot />
  </CommandItem>
</template>
