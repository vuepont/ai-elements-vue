<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface SuggestionProps {
  suggestion: string
  class?: HTMLAttributes['class']
  variant?: 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const props = withDefaults(defineProps<SuggestionProps>(), {
  variant: 'outline',
  size: 'sm',
})

const emit = defineEmits<{
  (e: 'click', suggestion: string): void
}>()

function handleClick() {
  emit('click', props.suggestion)
}
</script>

<template>
  <Button
    :class="cn('cursor-pointer rounded-full px-4', props.class)"
    :size="size"
    type="button"
    :variant="variant"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot>{{ suggestion }}</slot>
  </Button>
</template>
