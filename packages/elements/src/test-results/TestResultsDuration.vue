<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useTestResultsContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { summary } = useTestResultsContext()

function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`
  }
  return `${(ms / 1000).toFixed(2)}s`
}
</script>

<template>
  <span
    v-if="summary?.duration"
    :class=" cn('text-muted-foreground text-sm', props.class)"
    v-bind="$attrs"
  >
    <slot>{{ formatDuration(summary.duration) }}</slot>
  </span>
</template>
