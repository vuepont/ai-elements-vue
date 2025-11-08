<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Progress } from '@repo/shadcn-vue/components/ui/progress'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useContextSchema } from './context'
import { formatCompactNumber, formatPercent } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const PERCENT_MAX = 100

const context = useContextSchema()

const usedPercent = computed(() => {
  const { usedTokens, maxTokens } = context.value
  if (!maxTokens) {
    return 0
  }
  return usedTokens / maxTokens
})

const displayPercent = computed(() => formatPercent(usedPercent.value))
const usedTokens = computed(() => formatCompactNumber(context.value.usedTokens))
const totalTokens = computed(() => formatCompactNumber(context.value.maxTokens))
</script>

<template>
  <div :class="cn('w-full space-y-2 p-3', props.class)" v-bind="$attrs">
    <slot>
      <div class="flex items-center justify-between gap-3 text-xs">
        <p>{{ displayPercent }}</p>
        <p class="font-mono text-muted-foreground">
          {{ usedTokens }} / {{ totalTokens }}
        </p>
      </div>
      <div class="space-y-2">
        <Progress class="bg-muted" :value="usedPercent * PERCENT_MAX" />
      </div>
    </slot>
  </div>
</template>
