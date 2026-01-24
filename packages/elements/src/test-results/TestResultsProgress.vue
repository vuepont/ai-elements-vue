<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useTestResultsContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { summary } = useTestResultsContext()

const passedPercent = computed(() => {
  if (!summary)
    return 0
  return (summary.passed / summary.total) * 100
})

const failedPercent = computed(() => {
  if (!summary)
    return 0
  return (summary.failed / summary.total) * 100
})
</script>

<template>
  <div
    v-if="summary"
    :class="cn('space-y-2', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <div class="flex h-2 overflow-hidden rounded-full bg-muted">
        <div
          class="bg-green-500 transition-all"
          :style="{ width: `${passedPercent}%` }"
        />
        <div
          class="bg-red-500 transition-all"
          :style="{ width: `${failedPercent}%` }"
        />
      </div>
      <div class="flex justify-between text-muted-foreground text-xs">
        <span>{{ summary.passed }}/{{ summary.total }} tests passed</span>
        <span>{{ passedPercent.toFixed(0) }}%</span>
      </div>
    </slot>
  </div>
</template>
