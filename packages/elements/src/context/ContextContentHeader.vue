<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Progress } from '@repo/shadcn-vue/components/ui/progress'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const PERCENT_MAX = 100

const { usedTokens, maxTokens } = useContextValue()
const slots = useSlots()

const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

const usedPercent = computed(() => {
  if (maxTokens.value === 0)
    return 0
  return usedTokens.value / maxTokens.value
})
const displayPct = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(usedPercent.value)
})
const used = computed(() => formatter.format(usedTokens.value))
const total = computed(() => formatter.format(maxTokens.value))
</script>

<template>
  <div :class="cn('w-full space-y-2 p-3', props.class)">
    <slot v-if="slots.default" />

    <template v-else>
      <div class="flex items-center justify-between gap-3 text-xs">
        <p>{{ displayPct }}</p>
        <p class="font-mono text-muted-foreground">
          {{ used }} / {{ total }}
        </p>
      </div>
      <div class="space-y-2">
        <Progress class="bg-muted" :model-value="usedPercent * PERCENT_MAX" />
      </div>
    </template>
  </div>
</template>
